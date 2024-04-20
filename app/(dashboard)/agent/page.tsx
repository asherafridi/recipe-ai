import Breadcrumb from '@/components/Breadcrumb'
import React from 'react'

const Page = () => {
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Agents" />
        <div className="grid grid-cols-4 mt-10 gap-5">
        </div>
    </div>
  )
}

export default Page