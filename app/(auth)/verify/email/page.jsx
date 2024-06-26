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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
