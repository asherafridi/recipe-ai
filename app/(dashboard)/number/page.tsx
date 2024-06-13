"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useNumberFetch } from '@/hooks/numberHook';


const Page = () => {
  const {number,numberLoader} = useNumberFetch();

  
  return (
    <div className='p-5 min-h-screen'>
      <Breadcrumb title='Agent Number' />
        <div className="bg-white mt-4 rounded p-4">
          {numberLoader ?  'Loading...' : <DataTable columns={columns} data={number}  />}
        
        </div>
    </div>
  )
}

export default Page