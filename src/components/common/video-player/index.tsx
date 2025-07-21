import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Maximize, Play, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function VideoPlayer({className}:any) {
  return (
    <div className={cn("relative w-full aspect-video bg-black rounded-lg overflow-hidden",className)}>
    <Image
      src="https://surl.li/lzklum"
      alt="Video thumbnail"
      layout="fill"
      objectFit="cover"
      className="opacity-70"
    />
    {/* Playback controls placeholder */}
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <Play className="w-5 h-5" />
          <span className="sr-only">Play</span>
        </Button>
        <span>2:26 / 8:34</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <Settings className="w-5 h-5" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
        >
          <Maximize className="w-5 h-5" />
          <span className="sr-only">Fullscreen</span>
        </Button>
      </div>
    </div>
  </div>
  )
}
