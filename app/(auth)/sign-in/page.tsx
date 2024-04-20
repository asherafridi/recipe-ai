"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { CircleDashed } from "lucide-react"
import { UserLoginSchema } from "@/components/schema/user"
import { useRouter } from 'next/navigation'

interface ErrorType {
  email? : string,
  password? :string
}

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submit,setSubmit] = useState(false);
  const [errors, setErrors] = useState<ErrorType>({});
  const router = useRouter();

  
  const session = useSession();
  if(session.status=='authenticated'){
    router.push('/dashboard');
  }

  const submitHandler = async () => {
      const data:object = {
        email : email,
        password:password
      };

      setSubmit(true);
      const msg = await UserLoginSchema(data);
      if (msg) {
        setErrors(msg);
        toast.error('Validation Error!');
        setSubmit(false);
      } else {

      const signin = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
      });

      if (signin?.error) {
        setSubmit(false);
        toast.error('Invalid Username or Password');
      }else{
        toast.success('Login Successfull')
        setTimeout(()=>{
          router.push('/dashboard');
        },500)
      }
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-secondary ">
        <CardHeader className="">
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Create AI calls campaigns under 1 minute.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="flex flex-col w-full items-center gap-2">
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="email" id="name" name="email" placeholder="Email..." className="outline-none" value={email} onChange={(e) => (setEmail(e.target.value))} />
              {errors?.email ? (<span className="text-destructive">{errors?.email}</span>) : ('')}
            </div>
            <div className="h-1">
            </div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input type="password" id="name" name="password" placeholder="Password..." className="outline-none" value={password} onChange={(e) => (setPassword(e.target.value))} />
              {errors?.password ? <span className="text-destructive">{errors.password}</span> : ''}
            </div>
            <div className="flex w-full flex-col items-end">
              {/* <Link href="/forgot-password" className="text-primary">Forgot Password?</Link> */}
            </div>

            <div className="h-1">
            </div>
            <Button className="w-full" onClick={submitHandler} disabled={submit}>{submit ? <CircleDashed className="w-[20px] animate-spin" /> : ''} &nbsp;Submit</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span>Dont have an account? <Link href="/sign-up" className="text-primary">Register</Link></span>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page