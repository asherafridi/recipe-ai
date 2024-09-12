"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'
import { useAllAgentFetch } from '@/hooks/agentHook';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

const Page = () => {
  const { data, loading } = useAllAgentFetch();

  if (loading) {
    return <Skeleton className='w-full h-[400px] rounded mt-4' />;
  }

  return (


      <div className=" rounded flex gap-4 flex-wrap">

        {/* New card with same structure as agent box */}
        <Link
          href="/agent/create"
          className="bg-primary rounded w-full md:w-1/2 lg:w-1/4 p-3 flex items-center justify-center text-center hover:bg-primary-hover transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-6 h-6 text-white" />  {/* Lucide Plus icon */}
            <h1 className="text-xl font-semibold text-white">Create New Agent</h1>
          </div>
        </Link>


        {data?.map((element, index) => (
          <div key={index} className='bg-card border border-gray-300 rounded-sm w-full md:w-1/2 lg:w-1/4 p-3 hover:bg-muted'>
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
                      useAgentDelete(element.id);
                    }
                  }}>Delete Agent</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='flex mt-10 gap-4'>
              <span>#{element.id}</span>
            </div>
            <div className='flex mt-2 gap-4'>
              <Badge variant="default" className='text-white'>{'Outbound'}</Badge>
              <span>{element.language}</span>
            </div>
          </div>
        ))}

      </div>
  );
};

export default Page;
