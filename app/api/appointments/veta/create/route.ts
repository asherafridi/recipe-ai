import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { name, phone_number, email, date, time, user_id } = await req.json(); // Parse the JSON string from request

        // Combine `date` and `time` to create the start time
        const startTime = new Date(`${date}T${time}Z`);
        console.log(startTime);
        
        // Calculate the end time (30 minutes after the start time)
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds

        // Check if the slot is already booked
        const existingAppointment = await prisma.appointments.findFirst({
            where: {
                userId: user_id,
                status: 'BOOKED',
                OR: [
                    {
                        startTime: { lte: endTime },
                        endTime: { gte: startTime },
                    },
                ],
            },
        });

        // If the time slot is already booked, return a conflict response
        if (existingAppointment) {
            return NextResponse.json({ error: 'Time slot is already booked' }, { status: 409 });
        }

        // Create a new appointment if no conflicts exist
        const appointment = await prisma.appointments.create({
            data: {
                name,
                phone_number,
                email,
                startTime,
                endTime,
                userId: user_id,
                status: 'BOOKED',
            },
        });

        // Respond with success message
        return NextResponse.json({ msg: 'Appointment Created Successfully' }, { status: 200 });

    } catch (e) {
        console.error('Error creating appointment:', e);
        return NextResponse.json({ error: 'Something Went Wrong!' }, { status: 500 });
    }
}
