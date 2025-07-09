import { childrenProps } from '@/types'
import React from 'react'

export default function CommonLayout({children}:childrenProps) {
  return (
    <div>{children}</div>
  )
}

