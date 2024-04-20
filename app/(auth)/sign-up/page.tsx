"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
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
import { CircleDashed } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { UserRegisterSchema } from "@/components/schema/user"
import axios from "axios"
import { useSession } from "next-auth/react"

const Page = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [submit, setSubmit] = useState(false);

  const session = useSession();
  if(session.status=='authenticated'){
    router.push('/dashboard');
  }

  const submitForm = () => {
    const data: object = {
      name: name,
      email: email,
      password: password
    }

    const msg = UserRegisterSchema(data);
    setSubmit(true);
    if (msg) {
      setErrors(msg);
      toast.error('Validation Error!');
    } else {
      axios.post('/api/auth/register', data).then((response) => {
        toast.success(response.data.msg);
        toast.success('Please Login with your account.');
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);

        setSubmit(false);
      }).catch((e) => {
        toast.error(e.response.data.error);
        console.log(e.response.data.error);

        setSubmit(false);
      })
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-secondary ">
        <CardHeader className="">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <h3></h3>
          <CardDescription className="text-center">Create AI calls campaigns under 1 minute.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="flex flex-col w-full items-center gap-2">
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Full Name" className="outline-none" value={name} onChange={(e) => (setName(e.target.value))} />
              {errors?.name ? <span className="text-destructive">{errors.name}</span> : ''}
            </div>
            <div className="h-1">
            </div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type="email" id="name" placeholder="Email" className="outline-none" value={email} onChange={(e) => (setEmail(e.target.value))} />
              {errors?.email ? <span className="text-destructive">{errors.email}</span> : ''}
            </div>
            <div className="h-1">
            </div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" min="8" className="outline-none" value={password} onChange={(e) => (setPassword(e.target.value))} />
              {errors?.password ? <span className="text-destructive">{errors.password}</span> : ''}
            </div>
            <div className="h-1">
            </div>
            <Button className="w-full gap-2 cursor-pointer" onClick={submitForm} disabled={submit}>{submit ? <CircleDashed className="w-[20px] animate-spin" /> : ''} Submit</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <span>Already have an account? <Link href="/sign-in" className="text-primary">Login</Link></span>
        </CardFooter>
      </Card>
    </div >
  )
}

export default Page