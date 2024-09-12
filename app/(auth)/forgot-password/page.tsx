"use client"
import * as React from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
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
import FormButton from "@/components/FormButton"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"

const Page = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [buttonLoading, setButtonLoading] = useState(false);



  const forgotPassword = (email: string) => {
    axios.post('/api/auth/forgot-password', { email: email })
      .then(response => {
        toast.success(response.data.msg);
      }).catch(e => {
        toast.error(e.response.data.msg);
      })
  }
  const onSubmit = async (data: any) => {
    setButtonLoading(true);
    forgotPassword(data.email);
    setTimeout(() => { // Simulate an API call
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="">Reset Your Password</CardTitle>
          <CardDescription className="">Type in your email and we'll send you a link to reset your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col w-full items-center gap-2 mt-8">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="john@gmail.com"
                  className="outline-none border border-gray-400"
                  {...register("email", { required: "Email is required" })}
                />
                {/* {errors.email && <span className="text-destructive">{errors.email.message}</span>} */}
              </div>

              <div className="h-1"></div>
              <FormButton state={buttonLoading} text={'Send Reset Email'} />
            </div>
          </form>
        </CardContent>
        <CardFooter>

        <div className="flex justify-center w-full">
          <span>Have an account? <Link href="/sign-in" className=" underline">Sign In</Link></span>
        </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page;
