"use client"
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserAccountMenu = () => {
    const router = useRouter();
    const logout = ()=>{
        signOut();
        router.push('/sign-in');
    }
  const session = useSession();

    return (
        <div className='flex items-center gap-5'>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className='border border-gray-500'>
                        <AvatarImage src={session?.data?.user?.image ? session?.data?.user?.image : undefined} />
                        <AvatarFallback>{session?.data?.user?.name?.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={()=>{router.push('/profile-settings')}}>Profile Setting</DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className='pointer'> Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default UserAccountMenu