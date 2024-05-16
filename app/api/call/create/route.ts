import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { agentId, contactId,time,duration } = await req.json();
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const agent = await prisma.agent.findFirst({
            where: {
                id: +agentId
            }
        });
        const number = await prisma.agentNumber.findFirst({
            where: {
                id: agent?.numberId
            }
        });
        const contact = await prisma.contact.findFirst({
            where: {
                id: +contactId
            }
        });

        const options = {
            method: 'POST',
            headers: {
                authorization: 'sk-ix1uv15q05edyjxb2oqdporz1okqchzq5zvjvi9271f2cixopa3d71ulo0ppky3969',
                'Content-Type': 'application/json'
            },
            data: {
                phone_number: `${contact?.number}`,
                task: `${agent?.prompt}`,
                voice: `${agent?.voice}`,
                analysis_schema: {},
                first_sentence: `Hi How Are You ${contact?.name}`,
                wait_for_greeting: true,
                interruption_threshold: 50,
                record: true,
                max_duration: +duration,
                answered_by_enabled: true,
                from: `${number?.number}`,
                temperature: 0.7,
                start_time : `${convertDateTimeLocalToCustomFormat(time)}`
            }
        };

        // Make the POST request and wait for the response
        const response = await axios.post('https://api.bland.ai/v1/calls', options.data, { headers: options.headers });

        // Create the call record after receiving the response
        const call = await prisma.singleCall.create({
            data: {
                agentId: +agentId,
                callId: `${response.data.call_id}`,
                contactId: +contactId,
                cost: 0.16*(+duration),
                status: 'Initiated',
                userId: +session?.user?.id,
                time: convertDateTimeLocalToCustomFormat(time),
                maxDuration:+duration
            }
        });

        return NextResponse.json({ msg: 'Calling...' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

function convertDateTimeLocalToCustomFormat(dateTimeLocalString : string) {
    // Parse the datetime-local string into a Date object
    const dateTime = new Date(dateTimeLocalString);

    // Get the individual components of the date-time
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    // Get the timezone offset in hours and minutes
    const timezoneOffsetHours = Math.abs(dateTime.getTimezoneOffset()) / 60;
    const timezoneOffsetMinutes = Math.abs(dateTime.getTimezoneOffset() % 60);
    const timezoneSign = dateTime.getTimezoneOffset() < 0 ? '+' : '-';

    // Construct the formatted string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;

    return formattedDateTime;
}