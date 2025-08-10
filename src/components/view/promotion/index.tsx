"use client";
import SeeNav from "@/components/common/see-nav";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { useHomeVideosQuery } from "@/redux/api/landing/videosApi";
import React from "react";

export default function PromotionPage() {
  const { data: chVideos, isLoading: videoLoading } = useHomeVideosQuery({});

  return (
    <div>
      <SubTilte title="Promotions" />
      {videoLoading ? (
        <div className="home gap-6 mt-5">
          <SkeletonCount count={16}>
            <VideoCardSkeleton />
          </SkeletonCount>
        </div>
      ) : (
        chVideos?.data?.map((channel: any) => {
          const promotedVideos = channel?.videos?.filter((v: any) => v.is_promoted);

          return promotedVideos?.length ? (
            <div key={channel.id}>
              <SeeNav title={channel.name} href={`/videos/${channel.id}`} />
              <div className="home gap-6">
                {promotedVideos.map((video: any) => (
                  <VideoCard key={video.id} item={video} />
                ))}
              </div>
            </div>
          ) : null;
        })
      )}
    </div>
  );
}
