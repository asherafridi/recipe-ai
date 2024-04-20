import Breadcrumb from '@/components/Breadcrumb'
import DashboardTopCards from '@/components/DashboardTopCards'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { authOption } from '@/lib/auth'
import { PhoneCall, PhoneMissed, Users, Webhook } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
  
  const session = await getServerSession(authOption);
  console.log(session?.user.name);
  return (
    <div className='p-5 min-h-screen'>
        <Breadcrumb title="Dashboard" />
        <div className="grid grid-cols-4 mt-10 gap-5">
            <DashboardTopCards icon={<PhoneCall />} title="Total Calls" data="483" span="Dummy Data"/>
            <DashboardTopCards icon={<Webhook />} title="Total Campaigns" data="500" span="Dummy Data"/>
            <DashboardTopCards icon={<PhoneMissed />} title="Rejected Calls" data="230" span="Dummy Data"/>
            <DashboardTopCards icon={<Users />} title="Total Contacts" data="510" span="Dummy Data"/>
        </div>
        <div>
          {session?.user?.name}
        </div>
    </div>
  )
}

export default page