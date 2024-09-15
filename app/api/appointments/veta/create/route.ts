import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function POST(req: NextRequest) {
    const { name, phone_number, email, startTime, endTime, user_id } = await req.json(); // Parse the JSON string back into an object

    try {
        // Parse the startTime and endTime into Date objects if they are strings
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Check if the slot is already booked
        const existingAppointment = await prisma.appointments.findFirst({
            where: {
                userId: user_id,
                status: 'BOOKED',
                OR: [
                    {
                        startTime: { lte: end },
                        endTime: { gte: start },
                    },
                ],
            },
        });

        if (existingAppointment) {
            return NextResponse.json({ error: 'Time slot is already booked' }, { status: 409 });
        }

        // If no conflicts, proceed to create the new appointment
        const appointment = await prisma.appointments.create({
            data: {
                name: name,
                phone_number: phone_number,
                email: email,
                startTime: start,
                endTime: end,
                userId: user_id,
                status: 'BOOKED',
            },
        });

        return NextResponse.json({ msg: 'Appointment Created Successfully' }, { status: 200 });

    } catch (e) {
        console.error('Error creating appointment:', e);
        return NextResponse.json({ error: 'Something Went Wrong!' }, { status: 500 });
    }
}
