import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });
    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error.response?.data || error.message);
    throw new Error("Failed to refresh access token");
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOption);

  // Check if user is authorized
  if (!session?.user.id) {
    return NextResponse.json({ msg: "User Not Authorized" }, { status: 401 });
  }

  const user = await prisma.user.findFirst({
    where: { id: +session?.user.id },
  });

  if (!user?.analytics_access_token && !user?.analytics_refresh_token) {
    return NextResponse.json({ msg: "Google Not Connected" }, { status: 403 });
  }

  if (!user?.property_id) {
    return NextResponse.json({ msg: "Property Id Not Found" }, { status: 403 });
  }

  let accessToken = user.analytics_access_token;

  try {
    const propertyId = user.property_id.split('/')[1];
    let reportData;

    // Get the last 30 days' dates
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 30); // Go back 30 days

    const formattedStartDate = startDate.toISOString().split("T")[0];
    const formattedEndDate = now.toISOString().split("T")[0];

    try {
      // Send request to Google Analytics for both sessions and page views (pagePath dimension)
      const response = await axios.post(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        {
          dimensions: [{ name: "pagePath" }], // Track page views per page path
          metrics: [{ name: "screenPageViews" }], // Screen page views
          dateRanges: [
            {
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      reportData = response.data;

    } catch (error) {
      if (error.response?.status === 401) {
        console.log("Access token expired, refreshing...");
        accessToken = await refreshAccessToken(user.analytics_refresh_token);

        const response = await axios.post(
          `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
          {
            dimensions: [{ name: "pagePath" }],
            metrics: [{ name: "screenPageViews" }],
            dateRanges: [
              {
                startDate: formattedStartDate,
                endDate: formattedEndDate,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        reportData = response.data;

        // Update the new access token in the database
        await prisma.user.update({
          where: { id: +session?.user.id },
          data: { analytics_access_token: accessToken },
        });
      } else {
        throw error;
      }
    }

    return NextResponse.json({ report: reportData }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching properties:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch properties", details: error.message },
      { status: 500 }
    );
  }
}
