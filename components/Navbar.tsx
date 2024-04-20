import Link from 'next/link'
import React from 'react'
import { LayoutGrid } from 'lucide-react';

const Navbar = () => {
  return (
    <div className='p-5'>
      <div className='bg-white p-3 w-full shadow-sm rounded border'>
      <LayoutGrid />
      </div>
    </div>
  )
}

export default Navbar