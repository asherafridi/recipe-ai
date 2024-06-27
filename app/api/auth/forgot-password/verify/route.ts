import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import { hashPass } from "@/lib/hash";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

export async function POST(req: NextRequest) {
    const { token,password,confirm_password } = await req.json();
    try {
        let data = await verifyToken(token);
        let diffrenceMin = timeDiffrence(data.time);

        if (diffrenceMin > 150) {
            return NextResponse.json({ msg: 'Password link has expired.' }, { status: 500 });
        }

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: +data.userId,
            },
        });
        

        if(password !== confirm_password){
            return NextResponse.json({ msg: 'Confirm Pasword is not matched with password' }, { status: 500 });
        }
        
        const hashPassword = await hashPass(password);

        if(user.password === hashPassword){
            return NextResponse.json({ msg: 'Password is same as old password.' }, { status: 500 });
        }

        const userToken = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password : hashPassword
            }
        });
        

        return NextResponse.json({ msg: 'Password Changed Successfully' }, { status: 200 });

    } catch (e) {
        return NextResponse.json({ msg: 'Something Went Wrong!' }, { status: 500 });
    }
}

const verifyToken = (token: any) => {
    let jwtSecret = 'AlgoNlp';
    return jwt.verify(token, jwtSecret);
}

const timeDiffrence = (date: any) => {

    let currentDate: any = new Date();
    let pastDate: any = new Date(date); // Assuming data.time is a valid date string or timestamp

    // Calculate the difference in milliseconds
    let differenceInMs = currentDate - pastDate;

    // Convert the difference to minutes
    let differenceInMinutes = differenceInMs / (1000 * 60);

    return differenceInMinutes;
}