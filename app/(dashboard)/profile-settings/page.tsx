"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  CalendarClock, Lock, UserRound } from 'lucide-react';
import Account from './Account';
import Password from './Password';
import { Card } from '@/components/ui/card';
import Appointment from './Appointment';


const Page = () => {


    return (
            <Card className=" p-4 ">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className='flex justify-center gap-4 bg-card border-gray-300 border py-2'>
                        <TabsTrigger value="account" className='flex gap-4 text-lg'><UserRound />Account</TabsTrigger>
                        <TabsTrigger value="password" className='flex gap-4 text-lg'><Lock />Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account"><Account /></TabsContent>
                    <TabsContent value="password"><Password /></TabsContent>
                </Tabs>

            </Card>
    );
};

export default Page;
