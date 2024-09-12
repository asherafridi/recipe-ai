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
import { useForm } from "react-hook-form"


const Page = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submit, setSubmit] = useState(false);

  const session = useSession();
  if(session.status === 'authenticated'){
    router.push('/dashboard');
  }

  const submitForm = async (data:any) => {
    setSubmit(true);

    try {
      const validationResult = UserRegisterSchema(data);
      if (validationResult) {
        setSubmit(false);
        toast.error('Validation Error!');
        return;
      }

      const response = await axios.post('/api/auth/register', data);
      toast.success(response.data.msg);
      toast.success('Please Login with your account.');
      setTimeout(() => {
        router.push('/sign-in');
      }, 2000);

    } catch (e:any) {
      toast.error(e?.response.data.error);
      console.log(e?.response.data.error);
      setSubmit(false);
    }
  }

  return (
    <div className="flex">
      <div className="w-3/5 hidden lg:flex justify-center items-center">
        <h1 className="text-5xl font-medium">Veta<span className="text-blue-800">Talk</span></h1>
      </div>
      <div className="w-full lg:w-2/5 min-h-[100vh] bg-white flex flex-col justify-center items-center">
        <div className="header w-full px-12">
          <h1 className="text-3xl font-semibold">Get started</h1>
          <p>Create a new account</p>
        </div>

        <div className="form w-full  px-12 mt-12">
        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full items-center gap-2">
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input type="text" id="name" placeholder="Full Name" className="outline-none" {...register("name", { required: "Full Name is required" })} />
              {/* {errors.name && <span className="text-destructive">{errors?.name.message}</span>} */}
            </div>
            <div className="h-1"></div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" className="outline-none" {...register("email", { required: "Email is required" })} />
              {/* {errors.email && <span className="text-destructive">{errors?.email.message}</span>} */}
            </div>
            <div className="h-1"></div>
            <div className="flex flex-col w-full space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Password" className="outline-none" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
              {/* {errors.password && <span className="text-destructive">{errors?.password.message}</span>} */}
            </div>
            <div className="h-1"></div>
            <Button className="w-full gap-2 cursor-pointer" type="submit" disabled={submit}>{submit ? <CircleDashed className="w-[20px] animate-spin" /> : ''} Submit</Button>
          </form>
        </div>

        <div className="flex justify-center mt-12">
          <span>Have an account? <Link href="/sign-in" className="underline">Sign In</Link></span>
        </div>
      </div>

    </div>
  )
}

export default Page;
