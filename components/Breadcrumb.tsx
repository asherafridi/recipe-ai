import React from 'react'

const Breadcrumb = ({ title }: { title: string }) => {
  return (
    <div className=' text-3xl border-b-2 border-slate-300 pb-8'>{title}</div>
  )
}

export default Breadcrumb