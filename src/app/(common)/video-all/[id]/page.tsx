import { videos } from "@/components/common/video-box";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { IdParams } from "@/types";
import React from "react";

export default async function VideoList({ params }: IdParams) {
  const { id } = await params;
  console.log(id);
  return (
    <div>
      <SubTilte title="Beauty esthetics" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}
