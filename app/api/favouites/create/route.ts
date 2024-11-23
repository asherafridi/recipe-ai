import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { createDropdownMenuScope } from '@radix-ui/react-dropdown-menu';

export async function POST(req: NextRequest) {
    const { name, recipe } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        const contact = await prisma.favourite.create({
            data: {
                name : name,
                recipe : recipe,
                userId : +session.user.id
            }
        });

        return NextResponse.json({ msg: 'Recipe Added Successfully' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: 'Something Went Wrong!' }, { status: 500 });
    }

}