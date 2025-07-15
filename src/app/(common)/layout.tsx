import Sidebar from '@/components/common/sideber'
import Footer from '@/components/shared/footer'
import Navber from '@/components/shared/navber'
import { childrenProps } from '@/types'
import React from 'react'


export default function CommonLayout({ children }: childrenProps) {
  return (
    <div>
      {/* <HeroSec /> */}
      <Navber />
      <div className='flex'>
        <div><Sidebar /></div>
        <main className='p-6'>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

