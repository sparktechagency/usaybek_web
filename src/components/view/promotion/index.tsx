"use client";
import SeeNav from "@/components/common/see-nav";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { useGetPromotionQuery } from "@/redux/api/landing/promotionApi";
import React from "react";
import slugify from "slugify";

export default function PromoVideoListAll() {
  const { data: proItem, isLoading: videoLoading } = useGetPromotionQuery({
    video_limit: 4,
  });

  console.log(proItem)

 
  return (
    <div>
      <SubTilte title="Promotions" className="pb-0" />
      {videoLoading ? (
        <div className="home gap-6 mt-2">
          <SkeletonCount count={16}>
            <VideoCardSkeleton />
          </SkeletonCount>
        </div>
      ) : (
        proItem?.map((channel: any) =>
          channel?.videos?.length ? (
            <div key={channel.id}>
              <SeeNav
                title={channel.name}
                className="first:mt-4"
                href={`/promotions/${channel.id}-${slugify(channel.name, {
                  strict: true,
                  lower: true,
                })}`}
              />
              <div className="home gap-6">
                {channel.videos.map((video: any) => (
                  <VideoCard key={video.id} item={video} />
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
