import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        const session = await getServerSession(authOption);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: +session.user.id,
            },
        });

        if (!user?.subaccount_key) {
            return NextResponse.json({ error: 'Subaccount key not found' }, { status: 404 });
        }

        const response = await axios.post(
            `https://api.bland.ai/v1/batches/${id}/stop`,
            {},
            {
                headers: {
                    authorization: user.subaccount_key,
                    'Content-Type': 'application/json',
                },
            }
        );

        return NextResponse.json({ msg: response.data.message }, { status: 200 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ error: error.response?.data.message || 'Error deleting vector' }, { status: error.response?.status || 500 });
        } else {
            return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
        }
    }
}
