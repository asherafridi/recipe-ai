import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import { record } from 'zod';
import { json } from 'stream/consumers';

export async function POST(req: NextRequest) {
    const { name,agentId,groupId } = await req.json();
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {


        const contacts = await prisma.contact.findMany({
            where: {
                groupId : +groupId
            }
        }).then(users => {
            return users.map(user => ({
                ...user,
                phone_number: user.number
            }));
        });
        const agent = await prisma.agent.findFirst({
            where: {
                id: +agentId
            }
        });


        const tools = agent?.tools ? JSON.parse(agent.tools) : null;
        const options = {
            method: 'POST',
            headers: {
                authorization: session.user.key_token,
                'Content-Type': 'application/json'
            },
            data: {
                call_data: contacts,
                label: `${name}`,
                base_prompt: agent?.prompt,                     
                voice: agent?.voice,                     
                first_sentence: agent?.firstSentence,    
                wait_for_greeting: true,
                interruption_threshold: 50,
                record: true,
                answered_by_enabled: true,
                from: agent?.numberId,                
                temperature: 0.7,
                tools: tools,                           
            }
        };

        // Make the POST request and wait for the response
        const response = await axios.post('https://api.bland.ai/v1/batches', options.data, { headers: options.headers });

        return NextResponse.json({ msg: 'Campaign Launched...' }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json({ msg:'Something Went Wrong!',error: e }, { status: 500 });
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