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

      {/* <main className="flex flex-1 flex-col gap-4  md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Calls
              </CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.totalCalls}</div>
              <p className="text-xs text-muted-foreground">
                Total calls made
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inbound Calls
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.inboundCalls}</div>
              <p className="text-xs text-muted-foreground">
                Calls received
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Calls</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.completedCalls}</div>
              <p className="text-xs text-muted-foreground">
                Successfully completed calls
              </p>
            </CardContent>
          </Card>

          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.insights.totalCost?.toFixed(3)} $</div>
              <p className="text-xs text-muted-foreground">
                Total cost of calls
              </p>
            </CardContent>
          </Card>
        </div>


</main> */}
    </div>
  )
}
