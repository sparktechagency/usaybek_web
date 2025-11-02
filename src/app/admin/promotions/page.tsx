"use client";
import CommentChanel from "@/components/common/admin/basic/chanel-com";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import { NoItemData } from "@/components/common/admin/reuseable/table-no-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { AdminVideoCard } from "@/components/reuseable/video-card";
import { usePromoVideosSliderQuery } from "@/redux/api/landing/promotionApi";
import React, { useEffect,useState } from "react";
import PlayerBox from "@/components/common/video-player";
import { VideoCardSkeleton } from "@/components/reuseable";
import { useInView } from "react-intersection-observer";
import Modal from "@/components/reuseable/modal";
import { useDebounce } from "use-debounce";
import { Loader } from "lucide-react";

export default function PromotionsAll() {
  const [isShow, setIsShow] = useState(false);
  const [isVideo, setIsVideo] = useState<any>();
  const [isMore, setIsMore] = useState(false);
  const [isSearch, setIsSearch] = useState("");
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(isSearch, 500);
  const query = { page: page,search:debouncedSearch};
  const { data: videos, isLoading } = usePromoVideosSliderQuery({ ...query });
  const [totalVideos, setTotalVideos] = useState<any>([]);
  const hasMore = totalVideos?.length < videos?.meta.total;

  // Debounced search term


  useEffect(() => {
    setPage(1);
    setTotalVideos([]);
  }, [debouncedSearch]);
  
  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, isLoading]);
  
  // Update totalVideos on fetching new videos
  useEffect(() => {
    if (videos?.data) {
      setTotalVideos((prev: any) => {
        const existingIds = new Set(prev.map((v: any) => v.id));
        const newOnes = videos?.data.filter((v: any) => !existingIds.has(v.id));
        return [...prev, ...newOnes];
      });
    }
  }, [videos]);

  return (
    <div>
      <NavTitle
        title="Promotions Videos"
        subTitle="View and manage all Promotions in MyTSV"
      />
      <div>
        <SearchBox
        placeholder="Search Videos"
        onSearch={(text) => setIsSearch(text)}
      />
      </div>
      <div className="mt-10">
        <div className="home gap-6">
          {isLoading ? (
            <SkeletonCount count={8}>
              <VideoCardSkeleton />
            </SkeletonCount>
          ) : totalVideos?.length > 0 ? (
            totalVideos?.map((video: any) => (
              <div
                key={video.id}
                onClick={() => {
                  setIsVideo(video);
                  setIsShow(!isShow);
                  setIsMore(false);
                }}
              >
                <AdminVideoCard item={video} />
              </div>
            ))
          ) : (
            <NoItemData
              className="col-span-4"
              title="No videos available at this moment"
            />
          )}
        </div>
        {!isSearch && hasMore && !isLoading && (
          <div ref={ref} className="mx-auto flex opacity-0 justify-center mt-5">
            <Loader className="animate-spin text-blacks/20" />
          </div>
        )}
      </div>
      {/* Modal */}
      <Modal
        open={isShow}
        setIsOpen={setIsShow}
        title={isVideo?.user?.channel_name}
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <PlayerBox
              type={isVideo?.type}
              video={isVideo?.video}
              link={isVideo?.link}
              thumbnail={isVideo?.thumbnail}
              className="md:h-[300px]"
            />
            <div className="mt-3">
              <h1 className="text-lg lg:text-xl font-semibold text-blacks">
                {isVideo?.title}
              </h1>
              <div className="border p-2 rounded-md my-5">
                <p className="text-sm text-blacks font-semibold">
                  {isVideo?.created_at_format}
                </p>
                <div
                  className={`mt-1 relative text-sm ${
                    isMore ? "h-full" : "h-[50px] !overflow-hidden"
                  } text-grays leading-relaxed`}
                >
                  <div className="ql-container ql-snow">
                    <div
                      className="ql-editor !overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: isVideo?.description }}
                    ></div>
                  </div>
                  {isMore && (
                    <h1
                      className="cursor-pointer"
                      onClick={() => setIsMore(false)}
                    >
                      Show Less
                    </h1>
                  )}
                  {!isMore && (
                    <h1
                      onClick={() => setIsMore(true)}
                      className="absolute left-0 bottom-0 cursor-pointer"
                    >
                      See More....
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* CommentChanel */}
            <div className="border rounded-md p-3">
              {!!isVideo?.id && <CommentChanel id={isVideo?.id} />}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
