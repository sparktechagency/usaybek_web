import HeroSec from '@/components/common/home/hero-sec'
import Sidebar from '@/components/common/sideber'
import { childrenProps } from '@/types'
import React from 'react'


export default function CommonLayout({ children }: childrenProps) {
  return (
    <div>
      <HeroSec />
      <div className='flex'>
        <div><Sidebar /></div>
        <main className='p-4'>{children}</main>
      </div>
    </div>
  )
}

