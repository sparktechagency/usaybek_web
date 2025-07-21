"use client"
import Analytics from '@/components/common/dashboard/video-tab/analytics'
import Comments from '@/components/common/dashboard/video-tab/comments'
import Details from '@/components/common/dashboard/video-tab/details'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'



export default function VideoDetails() {
    const [isTab, setIsTab] = useState("details")
    const searchParams = useSearchParams();
    const active = searchParams.get("tab")

    useEffect(() => {
        setIsTab(active as string)
    }, [active, isTab])

    console.log(isTab)

    return (
        <div className='pb-15'>
            {isTab === "details" ? (
                   <Details isTab={isTab} setIsTab={setIsTab} />
            ) : isTab === "analytics" ? (
                (
                    <Analytics isTab={isTab} setIsTab={setIsTab} />
                )
            ) : (
                <Comments isTab={isTab} setIsTab={setIsTab} />
            )}


        </div>
    )
}
