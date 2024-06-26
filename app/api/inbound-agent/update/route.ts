import { authOption } from "@/lib/auth";
import prisma from "@/lib/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const  {id,name,description,text}  = await req.json();
    const session = await getServerSession(authOption);

    if(!session?.user){
        return NextResponse.json({msg:'Authentication Error'},{status:500});
    }
    try{
        const user =  await prisma.user.findFirst({
            where:{
                id : +session.user.id
            }
        });

        const options = {
            headers: {
                authorization: user?.subaccount_key,
                'Content-Type': 'application/json'
            }
        };
        const requestData = {
            name: name,
            description: description,
            text: `${text}`
        };
    
  axios.post(`https://kb.bland.ai/vectors/${id}`, requestData, options)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
    });
        return NextResponse.json({msg : 'Vector Updated Successfully'},{status:200});
    }catch(e){
        
        return NextResponse.json({error:'Something Went Wrong',e:e},{status:500});
    }

}