import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have proper import for Prisma

export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.get('user_id');

    try {
        if (!user_id) {
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: +user_id,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        const currentTime = new Date(); // Get current time in UTC

        // Loop through the next 7 days
        const availableSlotsFor7Days = [];

        for (let i = 0; i < 7; i++) {
            const date = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate() + i));

            // Define working hours in UTC (e.g., 9 AM to 5 PM UTC)
            const workStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 9, 0, 0)); // 9 AM UTC start
            const workEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 17, 0, 0)); // 5 PM UTC end

            // Fetch booked appointments for the user on the current date
            const appointments = await prisma.appointments.findMany({
                where: {
                    userId: +user_id,
                    startTime: {
                        gte: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)), // Start of the current day in UTC
                    },
                    endTime: {
                        lte: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)), // End of the current day in UTC
                    },
                    status: 'BOOKED',
                },
                orderBy: {
                    startTime: 'asc',
                },
            });

            // Calculate available 30-minute slots for the current day
            const availableSlots = getAvailableSlots(workStart, workEnd, appointments, 30, currentTime);

            // Append the slots for this day to the final result
            availableSlotsFor7Days.push({
                date: workStart.toUTCString().slice(0, 16), // Format to display date only
                slots: availableSlots,
            });
        }

        return NextResponse.json({ availableSlotsFor7Days }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}

function getAvailableSlots(
    workStart: Date,
    workEnd: Date,
    appointments: { startTime: Date; endTime: Date }[],
    slotDurationMinutes: number,
    currentTime: Date
) {
    let availableSlots = [];

    // If the current time is after the working hours, no slots are available
    if (currentTime > workEnd) {
        return [];
    }

    // Helper function to round up time to the next slot boundary in UTC
    function roundToNextSlot(time: Date, slotDuration: number) {
        let ms = time.getTime();
        let rounded = Math.ceil(ms / (slotDuration * 60000)) * (slotDuration * 60000);
        return new Date(rounded);
    }

    // Adjust currentSlotStart
    let currentSlotStart = workStart;

    // Move currentSlotStart to current time if today, but round it to the next slot boundary
    if (currentSlotStart.toDateString() === currentTime.toDateString() && currentTime > currentSlotStart) {
        currentSlotStart = roundToNextSlot(currentTime, slotDurationMinutes);
    } else {
        currentSlotStart = roundToNextSlot(currentSlotStart, slotDurationMinutes);
    }

    // Iterate through the booked appointments to find gaps
    for (let appointment of appointments) {
        if (currentSlotStart < appointment.startTime) {
            // There is a gap between the current time and the next appointment
            let slotEnd = appointment.startTime;
            while (currentSlotStart < slotEnd && currentSlotStart < workEnd) {
                let nextSlotTime = new Date(currentSlotStart.getTime() + slotDurationMinutes * 60000);
                if (nextSlotTime <= slotEnd) {
                    availableSlots.push({ startTime: currentSlotStart.toUTCString(), endTime: nextSlotTime.toUTCString() });
                }
                currentSlotStart = nextSlotTime;
            }
        }
        currentSlotStart = new Date(Math.max(currentSlotStart.getTime(), appointment.endTime.getTime())); // Move past the booked appointment
    }

    // Handle any remaining time after the last booked appointment
    while (currentSlotStart < workEnd) {
        let nextSlotTime = new Date(currentSlotStart.getTime() + slotDurationMinutes * 60000);
        if (nextSlotTime <= workEnd) {
            availableSlots.push({ startTime: currentSlotStart.toUTCString(), endTime: nextSlotTime.toUTCString() });
        }
        currentSlotStart = nextSlotTime;
    }

    return availableSlots;
}
