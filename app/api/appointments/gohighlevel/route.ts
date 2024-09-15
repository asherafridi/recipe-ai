import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { startDate, endDate } = await req.json(); 
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { id: +session.user.id }
        });
        const token = user.ghlToken;
        const calendarId = user.ghlCalenderId;
        const url = 'https://rest.gohighlevel.com/v1/appointments';

        // Convert startDate and endDate to epoch milliseconds if they are provided
        const startOfMonthEpoch = startDate ? new Date(startDate).getTime() : undefined;
        const endOfMonthEpoch = endDate ? new Date(endDate).getTime() : undefined;

        // Construct the URL with query parameters
        const fullUrl = `${url}?startDate=${startOfMonthEpoch}&endDate=${endOfMonthEpoch}&calendarId=${calendarId}&includeAll=true`;

        console.log(`Request URL: ${fullUrl}`); // Log the request URL

        const response = await axios.get(fullUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            maxBodyLength: Infinity // Allow larger responses
        });

        return NextResponse.json({ appointments: response.data.appointments }, { status: 200 });
    } catch (error: any) {
        // Handle errors gracefully
        console.error('Error details:', error.response?.data || error.message); // Log error details
        const errorMessage = error.response?.data?.message || 'Data Not Found';
        return NextResponse.json({ error: errorMessage, e: error }, { status: 500 });
    }
}
