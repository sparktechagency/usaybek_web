"use client";
import SeeNav from "@/components/common/see-nav";
import FilterBox from "@/components/reuseable/filter-box";
import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import { capitalize } from "@/lib/utils";
import {
  useHomeVideosQuery,
  usePromoVideosQuery,
  useRelatedVideosQuery,
} from "@/redux/api/landing/videosApi";
import { useState } from "react";

export default function Home() {
  const [isCategory, setIsCategory] = useState({ id: "all", name: "All" });
  const { data: promoVideos, isLoading: proLoading } = usePromoVideosQuery({});
  const { data: chVideos, isLoading: videoLoading } = useHomeVideosQuery({});
  const { data: relatedVideos, isLoading: relatedLoading } =
    useRelatedVideosQuery(isCategory.id, {
      skip: isCategory.id === "all",
    });

  return (
    <div>
      <FilterBox isCategory={isCategory} setIsCategory={setIsCategory} />
      <div>
        <h1 className="text-xl font-medium pt-8 pb-3">
          {isCategory.id === "all"
            ? "Promotional videos"
            : capitalize(isCategory?.name)}
        </h1>

        {isCategory.id === "all" ? (
          <>
            {/* Promotional videos */}
            <div className="home gap-6">
              {proLoading
                ? Skeleton(4)
                : promoVideos?.data?.map((video: any) => (
                    <VideoCard key={video.id} item={video} />
                  ))}
            </div>

            {/* All videos */}
            {videoLoading ? (
              <div className="home gap-6 mt-5">{Skeleton(8)}</div>
            ) : (
              chVideos?.data?.map((channel: any) =>
                channel?.videos?.length ? (
                  <div key={channel.id}>
                    <SeeNav
                      title={channel.name}
                      href={`/videos/${channel.id}`}
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
          </>
        ) : (
          <div className="home gap-6">
            {relatedLoading
              ? Skeleton(8)
              : relatedVideos?.data?.map((video: any) => (
                  <VideoCard key={video.id} item={video} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton loading
function Skeleton(count: number) {
  return (
    <SkeletonCount count={count}>
      <VideoCardSkeleton />
    </SkeletonCount>
  );
}
