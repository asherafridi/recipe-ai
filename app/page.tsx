"use client"
import Image from "next/image";

import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import Page from '@/app/(auth)/sign-in/page'

export default function Home() {
  const router = useRouter();
  
  useEffect(()=>{
    router.push('/sign-in');
  },[])
  return (
    <></>
  );
}
