import Image from 'next/image'
import React from 'react'
import bgImg from "@/assets/bg-img.png"

export default function Home() {
  return (
    <div className="relative min-h-96 w-full">
      <Image
        src={bgImg}
        alt="title"
        fill
        className="object-cover cursor-pointer z-0"
      />
      <div className="relative z-10">
        <h1 className="bg-red-500 text-white p-4 text-2xl">lfjldjf</h1>
      </div>
    </div>
  )
}
