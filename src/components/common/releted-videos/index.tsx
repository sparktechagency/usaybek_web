import { RelatedVideoCard } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { useRelatedVideosQuery } from "@/redux/api/landing/videosApi";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";

export default function RelatedVideosRight({ id }: any) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const query: Record<string, any> = { page };
  const { data: relVideos, isLoading,isFetching } = useRelatedVideosQuery({
    id,
    arg: query,
  });

  // pagination box functionlity start
  const [videos, setIsVideos] = useState<any>([]);
  const hasMore = videos?.length < relVideos?.meta?.total;
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (relVideos?.data) {
      setIsVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = relVideos.data.filter(
          (v: any) => !existingIds.has(v.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [relVideos?.data]);
  // pagination box functionlity end

//   const isInitialFetching = () => {
//     if (relVideos?.data?.length > 0) {
//       return false;
//     }
//     return isFetching;
//   };

//   console.log(isInitialFetching)

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Related videos</h2>
      <div className="space-y-5">
        {/* <RelatedVideoCard/> */}
        {isLoading ? (
          <SkeletonCount count={10}>
            <RelatedVideoCard />
          </SkeletonCount>
        ) : (
          videos?.map((item: any) => (
            <Link
              href={`/video/${item.id}`}
              key={item.id}
              className="flex gap-3 group"
            >
              <div className="relative w-37 h-22 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt="Related video thumbnail"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm  font-medium line-clamp-2 text-blacks">
                  {item.title}
                </h3>
                <ul>
                  <li className="text-gray-600 text-base mt-1">
                    {item?.user?.channel_name}
                  </li>
                  <li className="text-grays flex space-x-2 items-center text-sm">
                    <span className="text-xs">
                      {item.views_count_formated} views
                    </span>
                    <span className="flex items-center text-sm">
                      <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                      {item.created_at_format}
                    </span>
                  </li>
                </ul>
              </div>
            </Link>
          ))
        )}

        {!isLoading && relVideos?.data?.length > 0 && (
          <div ref={ref} className="flex flex-col mt-2">
            <RelatedVideoCard />
          </div>
        )}
      </div>
    </>
  );
}
