import * as React from "react"

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

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[450px] bg-secondary ">
        <CardHeader className="">
          <CardTitle className="text-center">Forgot Password</CardTitle>
          <CardDescription className="text-center">Create AI calls campaigns under 1 minute.</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="flex flex-col w-full items-center gap-2">
              <div className="flex flex-col w-full space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input type="email" id="name" placeholder="Email..." className="outline-none" />
              </div>

              <div className="h-1">
              </div>
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </CardContent>  
      </Card>
    </div>
  )
}

export default page