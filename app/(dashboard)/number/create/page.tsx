"use client"
import Breadcrumb from '@/components/Breadcrumb'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Number from './Number';





const Page = () => {
    const [mode,setMode] = useState('contact');

    const toggleBox =()=>{
        mode == 'contact' ? setMode('event') : setMode('contact');
    }
  
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Purchase a Number" />
        <div className="bg-white mt-4 rounded p-4">
            <div className='flex justify-between items-center'>
                <h3>New Number</h3>
            </div>
            <Number />
        </div>
    </div>
  )
}

export default Page