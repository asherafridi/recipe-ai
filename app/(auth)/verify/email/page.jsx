"use client"
import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const PageContent = () => {
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();


    
  useEffect(() => {
    axios.post('/api/auth/verify', { token:token })
      .then(response => {
        console.log(response);
        toast.success(response.data.msg);
        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      })
      .catch(e => {
        toast.error(e.response.data.msg || 'An error occurred.');
      });
  }, []);

  return (
    <div className='p-5 min-h-screen'>
      wait...
    </div>
  );
};


export default PageContent;
