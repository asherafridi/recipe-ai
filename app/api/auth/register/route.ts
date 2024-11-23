import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import { Interface } from 'readline';
import { error } from 'console';
import { hashPass } from '@/lib/hash';
import MailService, { smtpConfig } from '@/lib/mailService';

interface RegisterData{
    name :String
}

export async function POST(req : NextRequest) {
    const {name,email,password} = await req.json(); // Parse the JSON string back into an object
    
    try{
        const user = await prisma.user.findFirst({
            where : {
                email : email,
            }
        });

        if(user){
            return NextResponse.json({error:'Email already existed.'},{status:500});
        }else{
            const hashPassword = await hashPass(password);
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        });

        const mail = new MailService(smtpConfig);

        mail.sendWelcomeEmail(email,name);
        }

        return NextResponse.json({msg:'User Created Successfully'},{status:200});
    } catch (e) {
        console.log(e);
        return NextResponse.json({error:'Something went wrong!'},{status:500});
    }

}