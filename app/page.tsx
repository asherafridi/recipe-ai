"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Page from '@/app/(auth)/sign-in/page'
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  
  return (
    <div className="flex justify-center items-center min-h-screen">
    <Link href="/sign-in"><Button>Sign In</Button></Link>
    </div>
  );
}
