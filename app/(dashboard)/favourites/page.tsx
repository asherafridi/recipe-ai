"use client"
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import { columns } from './columns';


import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useAllFavouritesFetch } from '@/hooks/favouritesHook';



const Page = () => {

  const {keywords,keywordLoader} = useAllFavouritesFetch();

  if (keywordLoader) {
    return <Skeleton className='w-full h-[400px] rounded mt-4' />;
  }
  return (
    <Card className=" p-4">
      <DataTable columns={columns} data={keywords} />
    </Card>
  )
}

export default Page