import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { fields,goal,call_id } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const questions:any[] = [];
        fields.map((element:any)=>{
            questions.push([`${element.user}`,`${element.text}`]);
        });
        const options = {
            headers: {
                authorization: session.user.key_token,
                'Content-Type': 'application/json'
            }
        };

        const requestData = {
            goal: goal,
            questions: questions
        };

        const request = await axios.post(`https://api.bland.ai/v1/calls/${call_id}/analyze`, requestData, options);
        return NextResponse.json({ msg: 'Analyzed Completed',data:request.data }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something went wrong!', details: e }, { status: 500 });
    }
}
