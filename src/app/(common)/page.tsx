"use client"
import VideoBox from "@/components/common/video-box";
import FilterBox from "@/components/reuseable/filter-box";
import { useState } from "react";


export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div>
      <FilterBox
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div>
        <h1 className="text-xl font-medium py-3">{selectedCategory == "All" ? "Promotional videos" : selectedCategory}</h1>
        <VideoBox />
      </div>
    </div>
  )
}
