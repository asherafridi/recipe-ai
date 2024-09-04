import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import axios from 'axios';
import { Prisma } from '@prisma/client';
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOption);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: +session.user.id,
        },
      })
    

    if (user.status) {
      return NextResponse.json({ msg: 'User is Already Verified' }, { status: 200 });
    }

    if (user.verificationToken) {
      const userLink = verifyToken(user.verificationToken);

      if (timeDifference(userLink.time) < 30) {
        return NextResponse.json({ msg: 'Token already sent to the email.' }, { status: 500 });
      }
    }

    const token = createToken(session.user.id);

    await prisma.user.update({
      where: {
        id: +session.user.id,
      },
      data: {
        verificationToken: token,
      },
    });

    await sendVerificationEmail(token, user.email);
    return NextResponse.json({ msg: 'Verification email has been sent.' }, { status: 200 });

  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
            return NextResponse.json({ msg: 'User Not Found!',e : error.code }, { status: 500 });
        }
    }
    if(error instanceof Prisma.PrismaClientUnknownRequestError){
        
        return NextResponse.json({ msg: error.cause }, { status: 500 });
    }
    return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
  }
}

const verifyToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
  return jwt.verify(token, jwtSecret);
};

const timeDifference = (date: string) => {
  const currentDate = new Date();
  const pastDate = new Date(date);

  const differenceInMs = currentDate.getTime() - pastDate.getTime();
  const differenceInMinutes = differenceInMs / (1000 * 60);

  return differenceInMinutes;
};

const createToken = (id: string) => {
  const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
  const data = {
    time: new Date().toISOString(),
    userId: id,
  };

  return jwt.sign(data, jwtSecret, { expiresIn: '30m' });
};

const sendVerificationEmail = async (token: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: 'Lexa Talk',
      address: process.env.MAIL_USER,
    },
    to: email,
    subject: 'Verification Link From Lexa Talk',
    html: htmlTemplate(token),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
};

const htmlTemplate = (token: string) => {
  const host = process.env.APP_HOSTNAME;
  return `<!doctype html>
    <!-- Your HTML content here -->
    <a href="${host}/verify/email?token=${token}">Verify your Email</a>
    <!-- Rest of your HTML content -->
  `;
};
