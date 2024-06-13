import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOption } from '@/lib/auth';
import { time } from 'console';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { name, description, speech, url, method, headers, body, query, input_schema, response, timeout } = await req.json(); // Parse the JSON string back into an object
    const session = await getServerSession(authOption);


    console.log(req.json())
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    try {
        
    const user =  await prisma.user.findFirstOrThrow({
        where:{
            id : +session.user.id
        }
    })
        
        const options = {
        method: 'POST',
        headers: {
          authorization: user.subaccount_key,
          'Content-Type': 'application/json'
        },
        data: {
          name: name,
          description: description,
          speech: speech,
          url: url,
          method: method,
          headers: JSON.parse(headers),
          body: JSON.parse(body),
          query: JSON.parse(query),
          input_schema: JSON.parse(input_schema),
          response: JSON.parse(response),
          timeout: timeout
        }
      };

      const request =  await axios.post('https://api.bland.ai/v1/tools',options.data,{ headers: options.headers });

      
      return NextResponse.json({ request }, { status: 200 });

    }catch(e){

        return NextResponse.json({ e }, { status: 500 });
    }

}


const parseJSON = (str:any) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}