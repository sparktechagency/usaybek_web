"use client";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import { usePromoVideosQuery } from "@/redux/api/landing/videosApi";

export default function HomePromotion() {
  const { data: promoVideos, isLoading: proLoading } = usePromoVideosQuery({});
  return (
    <>
      <div className="home gap-6">
        {proLoading ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : (
          promoVideos?.data?.map((video: any) => (
            <VideoCard key={video.id} item={video} />
          ))
        )}
      </div>
    </>
  );
}
