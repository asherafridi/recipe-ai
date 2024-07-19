"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useVectorFetch } from '@/hooks/vectorHook';
import { useInboundAgentsFetch } from '@/hooks/inboundAgentHook';



const Page = () => {
  const {vector, vectorLoader } = useInboundAgentsFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Inbound Agent" />
        <div className="bg-white mt-4 rounded p-4">
          {vectorLoader ?  'Loading...' : <DataTable columns={columns} data={vector}  />}
        
        </div>
    </div>
  )
}

export default Page