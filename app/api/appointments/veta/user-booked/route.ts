import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have proper import for Prisma
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const { startDate, endDate } = await req.json(); 
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }


    try {

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'Start or end date not provided' }, { status: 400 });
        }

        // Parse the dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Fetch booked appointments for the user within the given date range
        const appointments = await prisma.appointments.findMany({
            where: {
                userId: +session.user.id,
                startTime: {
                    gte: start, // Start of the date range
                },
                endTime: {
                    lte: end,  // End of the date range
                },
                status: 'BOOKED',
            },
            orderBy: {
                startTime: 'asc',
            },
        });


        return NextResponse.json({ appointments }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}
