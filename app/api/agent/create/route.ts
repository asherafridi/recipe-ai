import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { createDropdownMenuScope } from '@radix-ui/react-dropdown-menu';

export async function POST(req: NextRequest) {
    const { name, numberId, voice, agentType, prompt, first_sentence, language, max_duration, model, transfer_number, wait_for_greeting, information,tools } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const vectorIds = [information, tools].filter(item => item !== null && item !== undefined);


        const contact = await prisma.agent.create({
            data: {
                name: name,
                numberId: numberId,
                voice: voice,
                agentType: "Outbound",
                prompt: prompt,
                userId: +session?.user?.id,
                firstSentence: first_sentence,
                language: language,
                maxDuration: max_duration,
                model: model,
                transferNumber: transfer_number,
                waitForGreeting: `${wait_for_greeting}`,
                tools: JSON.stringify(vectorIds)
            }
        });

        return NextResponse.json({ msg: 'Agent Created Successfully' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something Went Wrong!' }, { status: 500 });
    }

}