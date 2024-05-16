import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { name, numberId,voice,agentType,prompt } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {


            const contact = await prisma.agent.create({
                data: {
                    name: name,
                    numberId: +numberId,
                    voice:voice,
                    agentType:agentType,
                    prompt:prompt,
                    userId: +session?.user?.id
                }
            });

            return NextResponse.json({ msg: 'Agent Created Successfully' }, { status: 200 });
        
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }

}