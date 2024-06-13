import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const { area_code } = await req.json(); // Parse the JSON string back into an object
        const session = await getServerSession(authOption);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const user = await prisma.user.findFirst({
            where: {
                id: +session.user.id
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const options = {
            headers: {
                authorization: user.subaccount_key,
                'Content-Type': 'application/json'
            }
        };

        const requestData = {
            area_code: area_code,
        };

        const response = await axios.post('https://api.bland.ai/v1/outbound/purchase', requestData, options);
        return NextResponse.json({ msg: 'New Number Purchased' }, { status: 200 });

    } catch (error) {

        if (axios.isAxiosError(error)) {
            return NextResponse.json({ error: error.response?.data.message || 'Something went wrong with the request' }, { status: error.response?.status || 500 });
        } else {
            return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
        }
    }
}
