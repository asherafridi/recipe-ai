import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return NextResponse.json({ msg: 'Authentication Error' }, { status: 401 });
    }


    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: +session.user.id,
            },
        });

        const options = {
            method: 'GET',
            headers: {
                authorization: user.subaccount_key,
            }
        };

        const response = await axios.get('https://api.bland.ai/v1/batches', options);

        console.log( response.data.batches);
        return NextResponse.json({ campaign: response.data?.batches }, { status: 200 });
    } catch (error:any) {
        console.error('Error fetching calls:', error);
        const errorMessage = error.response?.data?.message || 'Data Not Found';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
