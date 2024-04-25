import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);
    const user = await prisma.user.findFirst({
        where:{
            email:<string>session?.user?.email,
        }
    });
    return NextResponse.json({status:user?.status},{status:200});

}