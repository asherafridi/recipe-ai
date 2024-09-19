import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import mailService from '@/lib/mailService';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const { name, phone_number, email, date, time, user_id } = await req.json(); // Parse the JSON string from request

        // Combine `date` and `time` to create the start time
        const startTime = new Date(`${date}T${time}Z`);
        console.log(startTime);
        
        // Calculate the end time (30 minutes after the start time)
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes in milliseconds

        // Fetch the user
        const user = await prisma.user.findFirst({
            where: { id: +user_id }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        // Check if the slot is already booked
        const existingAppointment = await prisma.appointments.findFirst({
            where: {
                userId: +user_id,
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

        // Create a Zoom meeting link
        const meetingLinkResponse = await axios.post(process.env.APP_HOSTNAME+'/api/appointments/meeting/zoom', {
            name: name + ' Meeting',
            start_time: startTime.toISOString(),
            duration: 30, // in minutes
        });

        const meetingLink = meetingLinkResponse?.data?.join_url;
        console.log(meetingLink);
        if (!meetingLink) {
            return NextResponse.json({ error: 'Failed to generate meeting link' }, { status: 500 });
        }

        // Create a new appointment if no conflicts exist
        const appointment = await prisma.appointments.create({
            data: {
                name,
                phone_number,
                email,
                startTime,
                endTime,
                userId: +user_id,
                status: 'BOOKED',
                meeting_link: meetingLink,
            },
        });

        try {
            // Send email notifications to both the user and the organizer
            await mailService.sendMeetingEmail(email, appointment);
            await mailService.sendMeetingEmail(user.email, appointment);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // Respond with success message
        return NextResponse.json({ msg: 'Appointment created successfully', appointment }, { status: 200 });

    } catch (error) {
        console.error('Error creating appointment:', error);
        return NextResponse.json({ error: 'Something went wrong!',e: error }, { status: 500 });
    }
}
