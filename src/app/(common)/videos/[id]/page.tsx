"use client";
import { Back } from "@/components/reuseable/icon-list";
import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { useRelatedVideosQuery } from "@/redux/api/landing/videosApi";
import React, { use } from "react";

// Define the shape of params
interface VideoListParams {
  id: string;
}

export default function VideoList({
  params,
}: {
  params: Promise<VideoListParams>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useRelatedVideosQuery(id);


  return (
    <div>
      <div className="flex justify-between">
        <Back />
        <SubTilte title={data?.data[0]?.category?.name} />
        <h1 className="opacity-0">0</h1>
      </div>
      <div className="home gap-6">
        {isLoading ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : (
          data?.data?.map((video: any) => (
            <VideoCard key={video.id} item={video} />
          ))
        )}
      </div>
    </div>
  );
}
