import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const  {id}  = await req.json();


    const session = await getServerSession(authOption);
    
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }
    const contact = await prisma.contact.findFirst({
        where:{
            id: +id
        }
    });
    return NextResponse.json({contact: contact}, {status: 200});
}
