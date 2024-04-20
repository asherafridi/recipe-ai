import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { PhoneCall } from 'lucide-react'

const DashboardTopCards = ({icon,title,data,span} : {icon:React.ReactNode,title:string,data:string,span:string}) => {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardContent className='flex p-0 gap-5 items-center'>
                    <div className="icon items-center flex justify-center bg-blue-400 w-[60px] h-[60px] rounded text-white">{icon}</div>
                    <div className="data ">
                        <span className='text-sm uppercase'>{title}</span>
                        <h3 className='text-3xl font-bold text-secondary-foreground leading-none'>{data}</h3>
                        <span className='text-sm font-light text-secondary-foreground'>{span}</span>
                        </div>
                </CardContent>
            </CardHeader>
        </Card>
    </div>
  )
}

export default DashboardTopCards