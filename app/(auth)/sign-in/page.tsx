"use client"
import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
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
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { ChefHat, CircleDashed, Quote } from "lucide-react"
import { UserLoginSchema } from "@/components/schema/user"

interface FormData {
  email: string;
  password: string;
}

interface ErrorType {
  email?: string,
  password?: string
}
import Banner from '@/public/background.jpg';

const Page = () => {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();
  const session = useSession();

  if (session.status == 'authenticated') {
    router.push('/home');
  }

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    const msg = await UserLoginSchema(data);
    if (msg) {
      Object.entries(msg).forEach(([key, value]) => {
        setError(key as keyof ErrorType, { message: value as string });
      });
      toast.error('Validation Error!');
    } else {
      const signin = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (signin?.error) {
        toast.error('Invalid Username or Password');
      } else {
        toast.success('Login Successful');
        setTimeout(() => {
          router.push('/home');
        }, 500);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-full lg:w-2/6 min-h-[100vh] bg-white flex flex-col justify-between">

        <div className="logo p-4 px-12 text-xl font-bold flex items-center"><ChefHat className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">RecipeAI</span></div>
        <div className="w-full">
          <div className="header w-full px-12">
            <h1 className="text-3xl font-semibold">Welcome Back!</h1>
            <p>Sign in to your account</p>
          </div>

          <div className="form w-full  px-12 mt-12">
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col w-full items-center gap-2" method="POST">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email..."
                  className="outline-none"
                  tabIndex={1}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-destructive">{errors.email.message}</span>}
              </div>
              <div className="h-1"></div>
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="password" className="flex justify-between"><span>Password</span>
                  <Link href="/forgot-password" className="">Forgot Password?</Link></Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password..."
                  className="outline-none"
                  tabIndex={2}
                  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
                />
                {errors.password && <span className="text-destructive">{errors.password.message}</span>}
              </div>
              <div className="flex w-full flex-col items-end">
              </div>
              <div className="h-1"></div>
              <Button className="w-full" type="submit" disabled={isSubmitting} tabIndex={3}>
                {isSubmitting ? <CircleDashed className="w-[20px] animate-spin" /> : ''} &nbsp;Submit
              </Button>
            </form>
          </div>

          <div className="flex justify-center mt-12">
            <span>Don't have an account? <Link href="/sign-up" className="underline">Sign Up</Link></span>
          </div>

        </div>
        <div></div>
      </div>



      <div
        className="w-4/6 hidden lg:flex justify-center items-center"
      >
        <div className=" w-[500px]">
          <span className="text-5xl relative top-[-500px ] text-gray-400 z-0"><Quote size={"96px"} /></span>
          <h1 className="text-2xl z-10  text-gray-900 font-medium">
          Create delicious recipes effortlessly with our AI-powered tool. Snap a picture, get personalized recipes, and turn ingredients into culinary masterpieces in seconds.</h1>

        </div>
      </div>
    </div>
  );
}

export default Page;
