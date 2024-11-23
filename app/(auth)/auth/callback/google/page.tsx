"use client";
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get individual query parameters from searchParams
    const code = searchParams.get('code');
    const scope = searchParams.get('scope');
    const authuser = searchParams.get('authuser');
    const prompt = searchParams.get('prompt');

    // Log parameters to verify
    console.log('Code:', code);
    console.log('Scope:', scope);
    console.log('Authuser:', authuser);
    console.log('Prompt:', prompt);

    axios.post('/api/callback/google/',{
      code: code}).then(()=>{
        router.push('/analytics');
      }).catch((e)=>{
        console.log(e);
      })

    // Optional: Process these parameters (e.g., send `code` to backend for token exchange)
  }, [searchParams]);

  return (
    <div>
      <h1>Authorization Callback</h1>
      <p>Processing your request...</p>
    </div>
  );
};

export default AuthCallbackPage;
