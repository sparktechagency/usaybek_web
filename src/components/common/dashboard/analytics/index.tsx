"use client"
import { ChartAreaStacked } from '@/components/common/chats/area'
import MonthlyBox from '@/components/reuseable/date-box'
import { Card } from '@/components/ui'
import React from 'react'

const statsItem = [
    {
      label: "Views",
      value: 22568,
      bgColor:"bg-white",
    },
    {
      label: "Likes",
      value: 2260,
      bgColor:"bg-body"
    },
    {
      label: "Dislikes",
      value: 1256,
      bgColor:"bg-body"
    },
  ];
  

export default function AnalyticsBox() {
    return (
        <div>
            <div>
                 <ul className='flex items-center justify-between mt-8'>
                     <li className='opacity-0'>0</li>
                     <li className='text-xl md:text-2xl font-semibold'>Your channel got 22,568 views in this month</li>
                     <li><MonthlyBox/></li>
                 </ul>
            </div>
          <div>
            <Card className='p-0 rounded-xl mb-5 border-1 mt-10 bg-white'>
                <div className='grid grid-cols-1 md:grid-cols-3 mb-15'>
                    {statsItem.map((item,index)=>(
                        <div key={index}  className={`py-5 border-b-1 border-r-1 first:rounded-tl-xl last:rounded-tr-xl last:border-r-0 ${item.bgColor}`}>
                            <h1 className='text-lg font-normal text-blacks text-center'>{item.label}</h1>
                            <h1 className='text-3xl font-bold text-center mt-3'>{item.value}</h1>
                        </div>
                    ))}
                </div>
                <div>
                  <ChartAreaStacked className='border-none'/>
                </div>
            </Card>

          </div>
         
        </div>
    )
}
