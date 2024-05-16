"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useContactsFetch } from '@/hooks/contactHook';



const Page = () => {
  const {data,loading} = useContactsFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Contacts" />
        <div className="bg-white mt-4 rounded p-4">
          {loading ?  'Loading...' : <DataTable columns={columns} data={data}  />}
        
        </div>
    </div>
  )
}

export default Page
export {useContactsFetch}