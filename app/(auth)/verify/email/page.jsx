"use client"
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import axios from 'axios';
import toast from 'react-hot-toast';

const Page = () => {
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  axios.post('/api/auth/verify', {token:token})
  .then(response=>{
    toast.success(response.data.msg);
    setTimeout(()=>{
        router.push('/sign-in');
    },2000)
  }).catch(e=>{
    toast.error(e.response.data.msg);
  })


  return (
    <div className='p-5 min-h-screen'>
      wait...
    </div>
  );
};

export default Page;
