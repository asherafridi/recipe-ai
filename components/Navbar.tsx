import Link from 'next/link'
import React from 'react'
import { LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='p-5'>
      <div className='bg-white p-3 w-full shadow-sm rounded border flex'>
        <div className='flex gap-4  lg:hidden'>
          <LayoutGrid className='' />
          <Link href="/dashboard" className='text-lg'>LexaTalk</Link>
        </div>
        <div>
          
        </div>
        
      </div>
    </div>
  )
}

export default Navbar