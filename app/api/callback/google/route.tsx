import { authOption } from '@/lib/auth';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOption);


  if (!session?.user?.id) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
  try {
    const { code } = await request.json();
    console.log('Authorization Code:', code);

    // Send the code to Google’s OAuth API to exchange it for an access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!response.ok) {
      console.error('Error exchanging code:', await response.text());
      return NextResponse.json({ error: 'Failed to exchange code' }, { status: 400 });
    }

    const data = await response.json();
    console.log(data);

    const contact = await prisma.user.update({
      where: {
        id: +session?.user?.id
      },
      data: {
        analytics_access_token: data.access_token,
        analytics_refresh_token: data.refresh_token
      }
    });


    return NextResponse.json({ success: true, tokenData: data }, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
