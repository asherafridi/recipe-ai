  import { authOption } from "@/lib/auth";
  import prisma from "@/lib/db";
  import axios from "axios";
  import { getServerSession } from "next-auth";
  import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

  export async function GET(req: NextRequest, res: NextResponse) {
    const session = await getServerSession(authOption);

    // Check if user is authorized
    if (!session?.user.id) {
      return NextResponse.json({ msg: "User Not Authorized" }, { status: 401 });
    }

    // Retrieve user data from the database
    const user = await prisma.user.findFirst({
      where: { id: +session?.user.id },
    });

    // Check if Google Analytics access tokens are available
    if (!user?.analytics_access_token && !user?.analytics_refresh_token) {
      return NextResponse.json({ msg: "Google Not Connected" }, { status: 403 });
    }
    

    try {
      // Step 1: Retrieve the list of accounts
      const accountsResponse = await axios.get(
        'https://analyticsadmin.googleapis.com/v1alpha/accounts',
        {
          headers: {
            Authorization: `Bearer ${user.analytics_access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const accounts = accountsResponse.data.accounts;
      if (!accounts || accounts.length === 0) {
        return NextResponse.json({ msg: "No accounts found" }, { status: 404 });
      }

      // Step 2: Retrieve properties for each account
      const allProperties = await Promise.all(
        accounts.map(async (account: { name: string }) => {
          const accountId = account.name.split('/').pop(); // Extract account ID
      
          const propertiesResponse = await axios.get(
            `https://analyticsadmin.googleapis.com/v1alpha/properties`,
            {
              headers: {
                Authorization: `Bearer ${user.analytics_access_token}`,
                "Content-Type": "application/json",
              },
              params: {
                filter: `parent:accounts/${accountId}`,
              },
            }
          );
      
          // Return the properties for this account, or an empty array if none found
          return propertiesResponse.data.properties || [];
        })
      );
      
      // Flatten the array of properties arrays into a single array
      const flatPropertiesArray = allProperties.flat();

      // Combine the account ID and properties list
      return NextResponse.json({ accounts: flatPropertiesArray }, { status: 200 });

    } catch (error:any) {
      console.error("Error fetching properties:", error.response.status);
      if(error.response.status== 401){
        refreshAccessToken(user.analytics_refresh_token,user.id);
      }
      return NextResponse.json({ error: "Failed to fetch properties", details: error }, { status: 500 });
    }
  }

  async function refreshAccessToken(refreshToken: string,user_id : number) {
    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
        client_id: '33602628711-44vrph2uo8ricl9g4ihkg33bnevve8sh.apps.googleusercontent.com',
        client_secret: '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',
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }).toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      await prisma.user.update({
        where: {
          id: user_id,  // Ensure this is the user ID of the current session
        },
        data: {
          analytics_access_token: response.data.access_token,  // Updating the access token
        },
      });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return null;
    }
  }
