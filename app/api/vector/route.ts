import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest,res : NextResponse) {

    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    try{

    
        const options = {method: 'GET', headers: {authorization: session.user.key_token}};
    
    
        const response = await axios.get('https://kb.bland.ai/vectors',options);
        return NextResponse.json({vectors:response.data?.vectors},{status:200});
    }catch(e){
        
        return NextResponse.json({error:'Data Not Found'},{status:500});
    }

}