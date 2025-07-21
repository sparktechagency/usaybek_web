import { capitalize, cn } from '@/lib/utils'
import { TabBoxProps } from '@/types'
import Link from 'next/link'
import React from 'react'

interface TabProps extends TabBoxProps {
    className?:string
}

export default function TabBox({ isTab, setIsTab,className }:TabProps) {
    const tabItem=[
        {name:"details",path:"/dashboard/video-details?tab=details"},
        {name:"analytics",path:"/dashboard/video-details?tab=analytics"},
        {name:"comments",path:"/dashboard/video-details?tab=comments"}
    ]
  return (
    <div className={cn("border-b border-gray-200",className)}> 
      {tabItem.map((item,index) => (
        <Link  key={index} href={item.path}>
         <button
          onClick={() => setIsTab(item.name)}
          className={`cursor-pointer px-6 py-2  font-medium text-blacks border-b-3 border-transparent ${isTab === item.name ? "!border-reds" : ""
            } focus:outline-none`}
        >
          {capitalize(item.name)}
        </button>
        </Link>
      ))}
    </div>
  )
}
