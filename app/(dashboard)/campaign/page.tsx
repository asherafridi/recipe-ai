"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useAllCallFetch } from '@/hooks/singleCallHook';
import { useAllCampaignFetch } from '@/hooks/campaignHook';
import { Card } from '@/components/ui/card';

const Page = () => {
  const { campaignData, campaignLoading } = useAllCampaignFetch();

  if (campaignLoading) {
    return <Skeleton className='w-full h-[400px] rounded' />;
  }
  return (
    
    <Card className="p-4">
      <DataTable columns={columns} data={campaignData} />
    </Card>

  );
};

export default Page;
