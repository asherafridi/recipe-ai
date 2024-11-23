"use client"
import Breadcrumb from '@/components/Breadcrumb';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react'
import {  FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const Page = async ({params} : {params:{id:string}}) => {
    
    // const {vector,vectorLoader} = useFetchFavouriteDetail(params.id);

    
    // if(vectorLoader){
    //     return <Skeleton className='w-full h-[400px] rounded mt-4'/>;
    // }
    return (
<></>
            // <Card className=" p-4">
            //     <h2><b>Vector Id :</b> {vector?.vector_id}</h2>
            //     <h2><b>Name :</b> {vector?.name}</h2>
            //     <h2><b>Description :</b> {vector?.description}</h2>
            //     <h2><b>Text :</b> {vector?.text}</h2>

                    
            // </Card>
    )
}

export default Page