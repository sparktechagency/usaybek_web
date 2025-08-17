"use client";
import { VideoCardSkeleton } from "@/components/reuseable";
import { Back } from "@/components/reuseable/icon-list";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { VideoCard } from "@/components/reuseable/video-card";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import { useParams } from "next/navigation";
import React from "react";

export default function PromotionAll() {
  const { id } = useParams();
  const { data, isLoading } = usePromoVideosSliderQuery({ category_id: id });
  const { data: categories } = useCategoriesQuery({ per_page: 1000 });
  const name = categories?.data?.find((item: any) => item.id == id)?.name;

  return (
    <div>
      <div className="flex justify-between">
        <Back />
        <SubTilte title={name} />
        <h1 className="opacity-0">0</h1>
      </div>
      <div className="home gap-6">
        {isLoading ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : (
          data.map((video: any) => <VideoCard key={video.id} item={video} />)
        )}
      </div>
    </div>
  );
}
