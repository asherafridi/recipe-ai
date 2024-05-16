"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table';
import axios from 'axios';
import { columns} from './columns';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAllCallFetch } from '@/hooks/singleCallHook';
import { useAllCampaignFetch } from '@/hooks/campaignHook';



const Page = () => {
  const {campaignData,campaignLoading} = useAllCampaignFetch();

  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Campaigns" />
        <div className="bg-white mt-4 rounded p-4">
          {campaignLoading ?  'Loading...' : <DataTable columns={columns} data={campaignData}  />}
        
        </div>
    </div>
  )
}

export default Page