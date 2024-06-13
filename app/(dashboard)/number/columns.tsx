"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { BarChart, EllipsisVertical, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Number = {
    phone_number: string
    created_at: string
    last_initiated: string
}


export const columns: ColumnDef<Number>[] = [
    {
        accessorKey: "phone_number",
        header: "Phone Number",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) => {
            const isoDateString = row.original.created_at;

            const date = new Date(isoDateString);


            // Format the date to a readable string
            const readableDate = date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
            return (readableDate);

        }
    },
    {
        accessorKey: "last_initiated",
        header: "Last Initiated",
        cell: ({ row }) => {
            const isoDateString = row.original.last_initiated;

            const date = new Date(isoDateString);


            // Format the date to a readable string
            const readableDate = date.toLocaleDateString('en-US') + ' ' + date.toLocaleTimeString('en-US');
            return (readableDate);

        }
    }

]
