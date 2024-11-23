"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns } from './columns';
import toast from 'react-hot-toast';


import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useAllKeywordsFetch } from '@/hooks/keywordsHook';



const Page = () => {

  const {keywords,keywordLoader} = useAllKeywordsFetch();

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