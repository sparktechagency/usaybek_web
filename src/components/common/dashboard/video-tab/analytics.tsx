import React from 'react'
// import AnalyticsBox from '../analytics'
import { TabBoxProps } from '@/types'
import TabBox from './tab-box'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Analytics({isTab,setIsTab}:TabBoxProps) {
  return (
    <div>
         <ul className='flex justify-between my-4'>
            <li >
              <Link className='font-medium text-lg flex items-center' href={"/dashboard/my-videos"}>
              <ArrowLeft size={18} className='mr-3 font-bold'/>Video analytics
              </Link>
            </li>
        </ul>
        <TabBox  isTab={isTab} setIsTab={setIsTab} className='my-10'/>
        {/* <AnalyticsBox/> */}
    </div>
  )
}

