import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have proper import for Prisma

export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.get('user_id');
    const startDate = req.nextUrl.searchParams.get('startDate');
    const endDate = req.nextUrl.searchParams.get('endDate');

    try {
        if (!user_id) {
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'Start or end date not provided' }, { status: 400 });
        }

        // Parse the dates
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Fetch booked appointments for the user within the given date range
        const appointments = await prisma.appointments.findMany({
            where: {
                userId: +user_id,
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

        // Define working hours (if needed)
        const workStart = new Date(`${startDate}T09:00:00`); // 9 AM start
        const workEnd = new Date(`${endDate}T17:00:00`);     // 5 PM end

        return NextResponse.json({ appointments }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}
