import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have proper import for Prisma

export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.get('user_id');

    try {
        if (!user_id) {
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        // Get the current UTC time
        const currentTime = new Date();

        // Fetch appointments for the next 7 days in parallel
        const fetchAppointmentsPromises = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate() + i));
            const startOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));
            const endOfDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59));

            fetchAppointmentsPromises.push(
                prisma.appointments.findMany({
                    where: {
                        userId: +user_id,
                        startTime: { gte: startOfDay },
                        endTime: { lte: endOfDay },
                        status: 'BOOKED',
                    },
                    orderBy: { startTime: 'asc' },
                })
            );
        }

        // Await all the promises in parallel
        const appointmentsFor7Days = await Promise.all(fetchAppointmentsPromises);

        const availableSlotsFor7Days = appointmentsFor7Days.map((appointments, dayOffset) => {
            const date = new Date(Date.UTC(currentTime.getUTCFullYear(), currentTime.getUTCMonth(), currentTime.getUTCDate() + dayOffset));

            // Define working hours in UTC
            const workStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 9, 0, 0));
            const workEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 17, 0, 0));

            // Calculate available 30-minute slots
            const availableSlots = getAvailableSlots(workStart, workEnd, appointments, 30, currentTime);

            return {
                date: workStart.toUTCString().slice(0, 16), // Format to display date only
                slots: availableSlots,
            };
        });

        return NextResponse.json({ availableSlotsFor7Days }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching available slots:', error);
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}

// Optimized slot calculation function
function getAvailableSlots(
    workStart: Date,
    workEnd: Date,
    appointments: { startTime: Date; endTime: Date }[],
    slotDurationMinutes: number,
    currentTime: Date
) {
    const availableSlots = [];

    // Round the current time to the next available slot if it's within working hours
    let currentSlotStart = new Date(Math.max(currentTime.getTime(), workStart.getTime()));
    currentSlotStart = roundToNextSlot(currentSlotStart, slotDurationMinutes);

    // Iterate through appointments to find available gaps
    for (const appointment of appointments) {
        // Add available slots before the appointment starts
        while (currentSlotStart < appointment.startTime && currentSlotStart < workEnd) {
            const nextSlotTime = new Date(currentSlotStart.getTime() + slotDurationMinutes * 60000);
            if (nextSlotTime <= appointment.startTime && nextSlotTime <= workEnd) {
                availableSlots.push({
                    startTime: currentSlotStart.toUTCString(),
                    endTime: nextSlotTime.toUTCString(),
                });
            }
            currentSlotStart = nextSlotTime;
        }

        // Move currentSlotStart past the end of the current appointment
        currentSlotStart = new Date(Math.max(currentSlotStart.getTime(), appointment.endTime.getTime()));
    }

    // Add remaining available slots after the last appointment
    while (currentSlotStart < workEnd) {
        const nextSlotTime = new Date(currentSlotStart.getTime() + slotDurationMinutes * 60000);
        if (nextSlotTime <= workEnd) {
            availableSlots.push({
                startTime: currentSlotStart.toUTCString(),
                endTime: nextSlotTime.toUTCString(),
            });
        }
        currentSlotStart = nextSlotTime;
    }

    return availableSlots;
}

// Rounds up time to the nearest slot boundary in UTC
function roundToNextSlot(time: Date, slotDuration: number) {
    const ms = time.getTime();
    const rounded = Math.ceil(ms / (slotDuration * 60000)) * (slotDuration * 60000);
    return new Date(rounded);
}
