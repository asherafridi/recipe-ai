import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { hashPass, isSamePass } from '@/lib/hash';

export async function POST(req: NextRequest) {
    try {
        const { current_password, new_password, confirm_password } = await req.json();
        const session = await getServerSession(authOption);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        if (new_password !== confirm_password) {
            return NextResponse.json({ error: 'New passwords do not match' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: +session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const isPasswordCorrect = await isSamePass(current_password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
        }

        const hashedPassword = await hashPass(new_password);

        await prisma.user.update({
            where: { id: +session.user.id },
            data: { password: hashedPassword },
        });

        return NextResponse.json({ msg: 'Password updated successfully' }, { status: 200 });

    } catch (e:any) {
        console.error('Error updating password:', e);
        return NextResponse.json({ error: 'Something went wrong', details: e}, { status: 500 });
    }
}
