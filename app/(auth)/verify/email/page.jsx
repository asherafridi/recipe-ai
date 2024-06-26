"use client"
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const Page = () => {
  const params = useSearchParams();
  const token = params.get('token');
  const router = useRouter();

  useEffect(() => {
    if (token) {
      axios.post('/api/auth/verify', { token })
        .then(response => {
          toast.success(response.data.msg);
          setTimeout(() => {
            router.push('/sign-in');
          }, 2000);
        })
        .catch(e => {
          toast.error(e.response.data.msg || 'An error occurred.');
        });
    }
  }, [token, router]);

  return (
    <div className='p-5 min-h-screen'>
      wait...
    </div>
  );
};

export default Page;
