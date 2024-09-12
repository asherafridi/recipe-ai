import Link from 'next/link'
import React from 'react'
import { LayoutGrid } from 'lucide-react';
import UserAccountMenu from './UserAccountMenu';
import { useSession } from 'next-auth/react';
import Breadcrumb from './Breadcrumb';

const Navbar = ({ sidebar, setSidebar }: { sidebar: any, setSidebar: any }) => {
  return (
    <div className='p-3 px-6 w-full border-b border-gray-300 flex justify-between items-center'>
      <div className=''>
        <div className='flex gap-4  lg:hidden'>
          <LayoutGrid className='' onClick={
            () => setSidebar(!sidebar)} />
          <Link href="/dashboard" className='text-lg'>LexaTalk</Link>
        </div>
        <Breadcrumb />
      </div>
      <div>
        <UserAccountMenu />
      </div>

    </div>
  )
}

export default Navbar