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
import { Loader } from "lucide-react";
import { useEffect,useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView();
  const [isCount, setIsCount] = useState<number>(10);
  const [isCategory, setIsCategory] = useState({ id: "all", name: "All" });
  const { data: promoVideos, isLoading: proLoading } = usePromoVideosQuery({});
  const { data: chVideos, isLoading: videoLoading } = useHomeVideosQuery({});
  const query: Record<string, any> = { per_page: isCount } 
  const { data: relatedVideos, isLoading: relatedLoading,refetch} =
    useRelatedVideosQuery(
      { id: isCategory.id, params: query },
      {
        skip: isCategory.id === "all",
      }
    );

  useEffect(() => {
    if (inView) {
      setIsCount((pre) => pre + 10);
      refetch()
    }
  }, [inView,refetch]);



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
            {relatedLoading ? (
              Skeleton(8)
            ) : !!relatedVideos?.data.length ? (
              relatedVideos?.data?.map((video: any) => (
                <VideoCard key={video.id} item={video} />
              ))
            ) : (
              <h1 className="text-gray-500 col-span-4 text-center py-20">
                Not Video Found
              </h1>
            )}
          </div>
        )}
      </div>
      <div ref={ref} className="mx-auto flex justify-center mt-5">
         <Loader className="animate-spin text-blacks/20"/>
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

// "use client";
// import { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { VideoCard } from "@/components/reuseable/video-card";
// import { VideoCardSkeleton } from "@/components/reuseable/skeleton-item";
// import SkeletonCount from "@/components/reuseable/skeleton-item/count";
// import { useHomeVideosQuery, useRelatedVideosQuery } from "@/redux/api/landing/videosApi";
// import FilterBox from "@/components/reuseable/filter-box";
// import { capitalize } from "@/lib/utils";

// export default function Home() {
//   const [isCategory, setIsCategory] = useState({ id: "all", name: "All" });
//   const [page, setPage] = useState(1);
//   const [items, setItems] = useState<any[]>([]);
//   const perPage = 10;
//   const { ref, inView } = useInView();

//   const queryArgs = { per_page: perPage, page };
//   const { data: homeData, isLoading: homeLoading } = useHomeVideosQuery(queryArgs, { skip: isCategory.id !== "all" });
//   const { data: relatedData, isLoading: relatedLoading } = useRelatedVideosQuery(
//     { id: isCategory.id, params: queryArgs },
//     { skip: isCategory.id === "all" }
//   );

//   useEffect(() => {
//     const newData = isCategory.id === "all" ? homeData?.data : relatedData?.data;
//     if (newData?.length) setItems(prev => [...prev, ...newData]);
//   }, [homeData, relatedData]);

//   useEffect(() => { if (inView) setPage(p => p + 1); }, [inView]);

//   return (
//     <div>
//       <FilterBox isCategory={isCategory} setIsCategory={setIsCategory} />
//       <h1 className="text-xl font-medium pt-8 pb-3">
//         {isCategory.id === "all" ? "All Videos" : capitalize(isCategory.name)}
//       </h1>

//       <div className="home gap-6">
//         {(homeLoading || relatedLoading) && page === 1
//           ? Skeleton(8)
//           : items.map(v => <VideoCard key={v.id} item={v} />)}
//       </div>

//       <div ref={ref} className="text-center py-5 text-gray-500">Loading more...</div>
//     </div>
//   );
// }

// const Skeleton = (n: number) => (
//   <SkeletonCount count={n}>
//     <VideoCardSkeleton />
//   </SkeletonCount>
// );
