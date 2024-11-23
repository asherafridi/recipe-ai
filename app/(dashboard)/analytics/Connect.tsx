"use client"
import { Button } from "@/components/ui/button"
import  Link  from "next/link"


export default function ConnectGoogle() {
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Link href="https://accounts.google.com/o/oauth2/v2/auth?client_id=33602628711-44vrph2uo8ricl9g4ihkg33bnevve8sh.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/callback/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid%20https://www.googleapis.com/auth/analytics.readonly%20https://www.googleapis.com/auth/analytics&access_type=offline"><Button variant={"default"}>Connect With Google</Button></Link>
      
    </div>
  )
}
