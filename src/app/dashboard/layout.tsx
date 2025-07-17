"use client"
import Navber from '@/components/common/dashboard/navber'
import Sidebar from '@/components/common/dashboard/sideber'
import { childrenProps } from '@/types';
import React, { useState } from 'react'

export default function ServiceLayout({ children }:childrenProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Content Area Start ===== --> */}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Navber sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="p-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )}