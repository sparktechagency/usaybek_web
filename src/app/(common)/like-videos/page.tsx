"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/icon";
import {
  useGetLinkeVideosQuery,
  useRemoveLikeMutation,
} from "@/redux/api/landing/videosApi";
import { ImgBox } from "@/components/common/admin/reuseable";
import { Pagination } from "@/components/reuseable/pagination";
import { useState } from "react";
import { Skeleton } from "@/components/ui";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import historyImg from "@/assets/historyImg.jpg";

export default function LinkVideos() {
  const [isPage, setIsPage] = useState<number>(1);
  const query: Record<string, any> = { page: isPage };
  const { data: likeVideos, isLoading } = useGetLinkeVideosQuery({ ...query });
  const [removeLike, { isLoading: removeLoading }] = useRemoveLikeMutation();

  const handlelike = async (id: any) => {
    await removeLike(id).unwrap();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-blacks">Watch History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
        {/* Right Column: Search and Actions */}
        <ul className="space-y-6 like-gradient p-2 rounded-t-2xl [&>li>h1]:text-white">
          <li>
            {" "}
            <ImgBox
              src={historyImg || "/blur.png"}
              className="rounded-md h-[150px] border-7 w-full"
              alt="video"
            />
          </li>
          <li>
            <h1 className="text-2xl font-medium mb-1">Liked videos</h1>
            <h1>{likeVideos?.data?.length} videos</h1>
          </li>
          <li>
            <Button
              variant={"primary"}
              className="text-blacks bg-white px-10 rounded-full"
            >
              <Icon name="playBlack" />
              Play all
            </Button>
          </li>
        </ul>
        {/* Left Column: Watch History List */}
        <div className="space-y-4">
          {isLoading ? (
            <SkeletonCount count={10}>
              <div className="flex items-start gap-4 p-4 border-b">
                <Skeleton className="h-[125px] w-[200px]" />
                <div className="flex-1 grid gap-1 space-y-1">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-[30%]" />
                  <Skeleton className="h-2 w-[70%]" />
                  <Skeleton className="h-2 w-[70%]" />
                  <Skeleton className="h-2 w-[70%]" />
                  <Skeleton className="h-2 w-[70%]" />
                  <Skeleton className="h-2 w-[70%]" />
                </div>
                <Skeleton className="size-7 rounded-full" />
              </div>
            </SkeletonCount>
          ) : (
            likeVideos?.data?.map((item: any) => (
              <div
                key={item?.id}
                className="flex items-start gap-4 p-4 border-b"
              >
                <ImgBox
                  className="rounded-sm h-[125px] w-[200px]"
                  src={item?.video?.thumbnail}
                  alt={item?.video?.title}
                />
                <div className="flex-1 grid gap-1">
                  <h2 className="font-semibold text-lg">
                    {item?.video?.title}
                  </h2>
                  <p className="text-blacks font-medium">
                    {item?.user?.channel_name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span className="mr-2">
                      {item?.video?.views_count} views
                    </span>
                    <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full"></span>
                    <span>{item?.video?.upload_time}</span>
                  </div>
                  <p className="text-sm text-grays line-clamp-2">
                    {item?.video?.description}
                  </p>
                </div>
                <Button
                  disabled={removeLoading}
                  variant="ghost"
                  size="icon"
                  className="ml-auto disabled:opacity-100"
                  onClick={() => handlelike(item?.id)}
                >
                  <X className="size-5 text-blacks" />
                  <span className="sr-only">Remove video</span>
                </Button>
              </div>
            ))
          )}

          <ul className="flex flex-wrap justify-end my-7">
            <li className="font-medium">
              <Pagination
                onPageChange={(v: any) => setIsPage(v)}
                {...likeVideos?.meta}
              ></Pagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
