import Breadcrumb from '@/components/Breadcrumb'
import { resolve } from 'path'
import React, { useState } from 'react'

const page = async () => {
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Agent Numbers" />
        <div className="grid grid-cols-4 mt-10 gap-5">
        </div>
    </div>
  )
}

export default page