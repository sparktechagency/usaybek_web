"use client"
import AnalyticsBox from '@/components/common/dashboard/analytics'
import NavItem from '@/components/common/dashboard/navber'
import React from 'react'


export default function Analytics() {
  return (
    <div>
      <NavItem title="Analytics" />
      <AnalyticsBox />
    </div>
  )
}
