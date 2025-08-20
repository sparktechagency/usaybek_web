"use client";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/icon";
import {
  useBulkDeleteHistoryMutation,
  useRemoveHistoryMutation,
  useToggleHistoryMutation,
  useWatchHistoryQuery,
} from "@/redux/api/landing/historyApi";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Skeleton } from "@/components/ui";
import { ImgBox } from "@/components/common/admin/reuseable";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import { useGetProfileQuery } from "@/redux/api/authApi";

export default function History() {
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, string | number> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const {
    data: history,
    isLoading,
    refetch,
  } = useWatchHistoryQuery({ ...query });
  const [removeHistory, { isLoading: isRemoveLoading }] =
    useRemoveHistoryMutation();
  const [toggleHistory, { isLoading: isToogleLoading }] =
    useToggleHistoryMutation();
  const [bulkDeleteHistory] = useBulkDeleteHistoryMutation();
  const { data: profile } = useGetProfileQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);
  //   HandleRemoveHistory
  const HandleRemoveHistory = async (id: string) => {
    const res = await removeHistory(id).unwrap();
    if (res.status) {
      refetch();
    }
  };

  //   handleAllDelete
  const handleAllDelete = async () => {
    const res = await bulkDeleteHistory({}).unwrap();
    if (res?.status) {
      refetch();
    }
  };

  //  history off /on
  async function HistoryToggle() {
    await toggleHistory({}).unwrap();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 text-blacks">Watch History</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
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
          ) : history?.data.length > 0 ? (
            history?.data?.map((item: any) => (
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
                  disabled={isRemoveLoading}
                  variant="ghost"
                  size="icon"
                  className="ml-auto disabled:opacity-100"
                  onClick={() => HandleRemoveHistory(item?.id)}
                >
                  <X className="size-5 text-blacks" />
                  <span className="sr-only">Remove video</span>
                </Button>
              </div>
            ))
          ) : (
            <NoItemData title="No videos found in your watch history" />
          )}

          <ul className="flex flex-wrap justify-end my-7">
            <li className="font-medium">
              <Pagination
                onPageChange={(v: any) => setIsPage(v)}
                {...history?.meta}
              ></Pagination>
            </li>
          </ul>
        </div>

        {/* Right Column: Search and Actions */}
        <ul className="space-y-6">
          <li>
            <div className="relative bg-white rounded-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search history"
                onChange={(e) => setIsSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border-none"
              />
            </div>
          </li>
          <li>
            <Button
              onClick={() => handleAllDelete()}
              variant="primary"
              className="w-fit rounded-full"
            >
              <Icon name="deleteWhite" />
              Clear all watch history
            </Button>
          </li>
          <li>
            <Button
              disabled={isToogleLoading}
              variant="outline"
              className="w-fit rounded-full disabled:opacity-100"
              onClick={() => HistoryToggle()}
            >
              {profile?.data?.pause_watch_history ? (
                <span className="flex items-center">
                  <Icon name="playBlack" className="mr-2" />
                  Play Watch history
                </span>
              ) : (
                <span className="flex items-center">
                  <Icon width={13} name="pauseBlack" className="mr-2" />
                  Pause Watch history
                </span>
              )}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
