"use client";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import HomePromotion from "@/components/common/home-promotion";
import SeeNav from "@/components/common/see-nav";
import FilterBox from "@/components/reuseable/filter-box";
import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import { capitalize } from "@/lib/utils";
import {
  useHomeVideosQuery,
  useRelatedVideosQuery,
} from "@/redux/api/landing/videosApi";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [similarVideos, setSimilarVideos] = useState<any[]>([]);
  const [isCategory, setIsCategory] = useState({ id: "all", name: "All" });

  useEffect(() => {
    setPage(1);
    setSimilarVideos([]);
  }, [isCategory]);

  const { data: chVideos, isLoading: videoLoading } = useHomeVideosQuery({});
  const query = { page, per_page: 6 };

  const { data: relatedVideos, isLoading: relatedLoading } =
    useRelatedVideosQuery(
      { id: isCategory.id, params: query },
      { skip: isCategory.id === "all" }
    );

  // ✅ Append new videos only when new data comes
  const totalCount = !!relatedVideos?.data?.length;
  useEffect(() => {
    if (totalCount) {
      setSimilarVideos((prev) => [...prev, ...relatedVideos.data]);
    }
  }, [relatedVideos, totalCount]);

  // const currentTotal = relatedVideos?.meta?.total ?? 0;
  // const hasMore = similarVideos.length < currentTotal;

  // ✅ Only trigger when loader in view + has more
  useEffect(() => {
    if (inView && isCategory.id !== "all" && !relatedLoading) {
      setPage((p) => p + 1);
    }
  }, [inView, isCategory.id, relatedLoading]);

  console.log(relatedVideos?.data.length);
  console.log(relatedVideos?.data?.length);

  return (
    <div>
      <FilterBox isCategory={isCategory} setIsCategory={setIsCategory} />
      <div>
        <h1 className="text-xl font-medium pt-8 pb-3">
          {isCategory.id === "all"
            ? "Promotional videos"
            : capitalize(isCategory.name)}
        </h1>

        {isCategory.id === "all" ? (
          <>
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
          <div>
            <div className="home gap-6">
              {relatedLoading ? (
                Skeleton(6)
              ) : !!similarVideos ? (
                similarVideos?.map((video: any, idx: number) => (
                  <VideoCard key={idx} item={video} />
                ))
              ) : (
                <NoItemData title="No Video Found" className="col-span-4" />
              )}
            </div>
            {/* ✅ Loader only when more pages left */}
            <div className="ttttt">
              {totalCount && (
                <div ref={ref} className="mx-auto flex justify-center mt-5">
                  <Loader className="animate-spin text-blacks/20" />
                </div>
              )}
            </div>
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
