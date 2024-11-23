import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {

        const contact = await prisma.agent.delete({
            where:{
                id:id
            }
        });

        return NextResponse.json({ msg: 'Agent Removed Successfully' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }

}