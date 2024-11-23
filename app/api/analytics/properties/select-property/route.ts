import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';

export async function POST(req: NextRequest) {
    const { property } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {



            const contact = await prisma.user.update({
                data: {
                    property_id : property
                },
                where:{
                    id: +session.user.id
                }
            });

            return NextResponse.json({ msg: 'Property Selected Successfull!' }, { status: 200 });


    } catch (e) {
        return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
    }

}