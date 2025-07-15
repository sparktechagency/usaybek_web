import SubTilte from '@/components/reuseable/sub-title'
import { VideoCard } from '@/components/reuseable/video-card'
import { Metadata } from 'next';
import React from 'react'

export const metadata:Metadata = {
  title: "Promotions",
  description: "Discover the best articles and promotions curated for you. Stay updated with top picks and expert recommendations",
};

export default function Promotions() {
  const videos = Array.from({ length: 20 }, (_, index) => ({
    id: `${index}`,
    thumbnail: "/placeholder.svg?height=225&width=400",
    title: "Video title goes here",
    channelName: "Channel name",
    views: "22k",
    timeAgo: "10 hours ago",
    isPromoted: true,
    channelAvatar: "/placeholder.svg?height=24&width=24",
  }));

  return (
    <div>
      <SubTilte title='Promotions'/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  )
}
