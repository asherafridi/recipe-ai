import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    const { id } = req.params;

    const session = await getServerSession(authOption);
    const contact = await prisma.contact.findFirst({
        where:{
            userId: +session?.user?.id,
            id: +id 
        }
    });
    return res.json({contact: contact}, {status: 200});
}
