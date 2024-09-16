import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure you have proper import for Prisma
import { use } from "react";

export async function GET(req: NextRequest) {
    const user_id = req.nextUrl.searchParams.get('user_id');
    const date = req.nextUrl.searchParams.get('date');

    try {
        if (!user_id) {
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        if (!date) {
            return NextResponse.json({ error: 'Date not provided' }, { status: 400 });
        }
        const user = await prisma.user.findFirst({
            where:{
                id:+user_id
            }
        });
        if(!user){
            return NextResponse.json({ error: 'User not Found' }, { status: 400 });
        }

        const timezone = user.timezone;

        // Define working hours (e.g., 9 AM to 5 PM)
        const workStart = new Date(`${date}T09:00:00Z`);
        const workEnd = new Date(`${date}T17:00:00Z`);

        const currentTime = new Date(); // Get current time

        // Fetch booked appointments for the user on the given date
        const appointments = await prisma.appointments.findMany({
            where: {
                userId: +user_id,
                startTime: {
                    gte: new Date(`${date}T00:00:00`), // Start of the day
                },
                endTime: {
                    lte: new Date(`${date}T23:59:59`), // End of the day
                },
                status:'BOOKED'
            },
            orderBy: {
                startTime: 'asc',
            },
        });


        // Calculate available 30-minute slots, excluding past slots
        const availableSlots = getAvailableSlots(workStart, workEnd, appointments, 30, currentTime);

        return NextResponse.json({ slots: availableSlots }, { status: 200 });
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

  // Helper function to round up time to the next slot boundary
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
          availableSlots.push({ startTime: currentSlotStart, endTime: nextSlotTime });
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
      availableSlots.push({ startTime: currentSlotStart, endTime: nextSlotTime });
    }
    currentSlotStart = nextSlotTime;
  }

  return availableSlots;
}

