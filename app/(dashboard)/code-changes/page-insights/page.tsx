"use client"


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useFetchInsightsHook } from "@/hooks/dashboard"
import { Bar, Pie } from "react-chartjs-2"

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Skeleton } from "@/components/ui/skeleton"


export default function Dashboard() {
  
  // if (loading) {
  //   return <Skeleton className='w-full h-[400px] rounded'/>;
  // }



  return (
    <div className="flex min-h-screen w-full flex-col">

   
    </div>
  )
}
