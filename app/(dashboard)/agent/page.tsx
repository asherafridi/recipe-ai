"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { useAllAgentFetch } from '@/hooks/agentHook';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';



const Page = () => {
  const { data, loading } = useAllAgentFetch();

  
  if (loading) {
    return <div className='p-5 bg-white'>Loading...</div>;
}

  return (
    <div className='p-5 min-h-screen'>
      <div className='border-b-2 border-slate-300 flex justify-between'>

      <div className=' text-3xl  pb-8'>Agents</div>
      <Link href='/agent/create' ><Button>Create New Agent</Button></Link>
      </div>
      <div className=" mt-4 rounded p-4 flex gap-2">
        {data?.map((element, index) => (
          <div key={index} className='bg-white rounded w-full md:w-1/2 lg:w-1/4 p-3'>
            <div className='flex justify-between'>
              <div className='flex items-center gap-4'>
                <Avatar>
                  <AvatarFallback>{element.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2>{element.name}</h2>
              </div>

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
                  <DropdownMenuItem><Link href={`/agent/edit/${element.id}`}>Edit Agent</Link></DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => {
              if (confirm('Are you sure?')) {
                useAgentDelete(payment.id);
              }
            }}>Delete Agent</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex mt-10 gap-4'>
            <span>{element.numberId}</span>
            </div>
            <div className='flex mt-2 gap-4'>
            <Badge variant="default">{element.agentType}</Badge>
            <span>{element.language}</span>
            </div>
            <Link href='/call/create' className=' border-2 border-blue-400 rounded-md w-100 p-2 mt-4 block text-center hover:bg-blue-600 hover:border-blue-600 hover:text-white'>Make a Call</Link>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page