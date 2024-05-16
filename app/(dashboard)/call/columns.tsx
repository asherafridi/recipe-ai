"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, EllipsisVertical, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAgentDelete } from "@/hooks/agentHook"
import {  useStopCall } from "@/hooks/singleCallHook"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Call = {
  id: string
  agent: string
  callId: string
  contact: string
  cost: string
  status: string
  time :string
}



export const columns: ColumnDef<Call>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "agent.name",
    header: "Agent",
  },
  {
    accessorKey: "contact.name",
    header: "Contact",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      const dateTime = new Date(payment.time);

      // Get the current date-time
      const currentDateTime = new Date();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link href={`/call/detail/${payment.callId}`}>Call Detail</Link></DropdownMenuItem>
            {dateTime.getTime() > currentDateTime.getTime() ? (<>
              <DropdownMenuItem onClick={() => {
              if (confirm('Are you sure?')) {
                useStopCall(payment.callId);
              }
            }}>Stop Call</DropdownMenuItem>
            </>):'' }
            
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }

]
