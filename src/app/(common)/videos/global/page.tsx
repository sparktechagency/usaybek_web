"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";

import { VideoCard } from "@/components/reuseable/video-card";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import SubTilte from "@/components/reuseable/sub-title";
import { Back } from "@/components/reuseable/icon-list";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { useGolbalSearchQuery } from "@/redux/api/commonApi";

// ✅ Child component
function GlobalSearchChild() {
  const searchParams = useSearchParams();
  const paramsObject = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);
  const [videosState, setVideosState] = useState<any[]>([]);

  // ✅ Build query based on params + page
  const query = useMemo(
    () => ({ page, ...paramsObject }),
    [page, paramsObject]
  );

  const { data: videos, isLoading, isFetching } = useGolbalSearchQuery(query);

  // ✅ Reset when search params change
  useEffect(() => {
    setVideosState([]);
    setPage(1);
  }, [paramsObject]);

  // ✅ Append new results
  useEffect(() => {
    if (videos?.data?.length) {
      setVideosState((prev) => {
        const existingIds = new Set(prev.map((v) => v.id));
        const uniqueNew = videos.data.filter((v: any) => !existingIds.has(v.id));
        return [...prev, ...uniqueNew];
      });
    }
  }, [videos]);

  const hasMore = videosState.length < (videos?.meta?.total || 0);

  // ✅ Infinite scroll trigger
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Back />
        <SubTilte title="All Videos" />
        <div className="opacity-0">0</div>
      </div>

      <div className="home gap-6">
        {isLoading && videosState.length === 0 ? (
          <SkeletonCount count={8}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : videosState.length > 0 ? (
          videosState.map((video) => <VideoCard key={video.id} item={video} />)
        ) : (
          <NoItemData className="col-span-4" title="No videos available at this moment" />
        )}
      </div>

      {hasMore && !isLoading && (
        <div ref={ref} className="mx-auto flex opacity-0 justify-center mt-5">
          <Loader className="animate-spin text-blacks/20" />
        </div>
      )}
    </div>
  );
}

// ✅ Parent with Suspense
export default function GlobalSearch() {
  return (
    <Suspense>
      <GlobalSearchChild />
    </Suspense>
  );
}
