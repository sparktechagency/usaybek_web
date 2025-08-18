"use client";
import CommentBox from "@/components/common/comment-box";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui";
import VideoPlayer from "@/components/common/video-player";
import FavIcon from "@/icon/admin/favIcon";
import {
  useRelatedVideosQuery,
  useStoreLikeDisLikeMutation,
  useStoreReportMutation,
  useVideosDetailsQuery,
} from "@/redux/api/landing/videosApi";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DetailsSkeleton,
  RelatedVideoCard,
} from "@/components/reuseable/skeleton-item";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { delay, modifyPayload } from "@/lib";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const options = [
  { value: "Sexual content", label: "Sexual content" },
  {
    value: "Violent or repulsive content",
    label: "Violent or repulsive content",
  },
  { value: "Hateful or abusive content", label: "Hateful or abusive content" },
  { value: "Harassment or bullying", label: "Harassment or bullying" },
  { value: "Harmful or dangerous acts", label: "Harmful or dangerous acts" },
  { value: "Misinformation", label: "Misinformation" },
  { value: "Child abuse", label: "Child abuse" },
  { value: "Promotes terrorism", label: "Promotes terrorism" },
  { value: "Spam or misleading", label: "Spam or misleading" },
  { value: "Legal issue", label: "Legal issue" },
  { value: "Captions issue", label: "Captions issue" },
];

export default function VideoDetails({ slug }: any) {
  const path = usePathname();
  const [storeLikeDisLike] = useStoreLikeDisLikeMutation();
  const { data, isLoading } = useVideosDetailsQuery(slug);
  const [storeReport, { isLoading: ReportLoading }] = useStoreReportMutation();
  const { data: relVideos, isLoading: relLoading } = useRelatedVideosQuery({
    id: data?.category_id,
  });
  const [isReprot, setIsReport] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [reportText, setReportText] = useState({
    reason: "Sexual content",
    issue: "",
  });

  const {
    id,
    video,
    thumbnail,
    title,
    user,
    description,
    publish_time_formated,
    views_count_formated,
    likes_count_formated,
    dislikes_count_formated,
    comment_replies_count_formated,
    is_liked,
    is_disliked,
    type,
    link,
  } = data || {};

  const SubmitReport = async () => {
    const value = {
      video_id: slug,
      ...reportText,
    };
    try {
      const data = modifyPayload(value);
      const res = await storeReport(data).unwrap();
      if (res.status) {
        toast.success("Report Submitted", {
          description: "Your report has been created successfully.",
        });
      }
    } finally {
      setIsText(false);
      setReportText({
        reason: "",
        issue: "",
      });
    }
  };

  const handleLikeDislike = async (video_id: string, action: string) => {
    const value = {
      video_id,
      action,
    };
    const data = modifyPayload(value);
    await storeLikeDisLike(data).unwrap();
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row flex-1 gap-6">
          {/* Left column */}

          <div className="flex-1 min-w-0">
            {isLoading ? (
              <DetailsSkeleton />
            ) : (
              <>
                <VideoPlayer
                  type={type}
                  video={video}
                  link={link}
                  thumbnail={thumbnail}
                />
                {/* Video Title and Actions */}
                <div>
                  <h1 className="text-lg lg:text-xl font-semibold text-blacks mt-3">
                    {title}
                  </h1>
                  <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
                    <div className="flex items-center gap-3">
                      <Avatars
                        src={user?.avatar}
                        fallback={user?.name}
                        alt={user?.name}
                      />
                      <div className="flex-1">
                        <Link href="#" className="font-semibold text-gray-900">
                          {user?.channel_name}
                        </Link>
                      </div>
                    </div>
                    {/* Right actions */}
                    <div className="flex mt-2 md:mt-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm has-[>div]:cursor-pointer">
                      <div className="flex border px-3 space-x-1 h-8 items-center rounded-full">
                        <FavIcon
                          name="eye"
                          color="#888888"
                          className="size-6"
                        />
                        <span className="text-blacks font-semibold">
                          {views_count_formated}
                        </span>
                      </div>
                      <div
                        onClick={() => handleLikeDislike(id, "like")}
                        className="flex border px-3 h-8 space-x-1 items-center rounded-full"
                      >
                        <FavIcon
                          name="likeUp"
                          color={is_liked ? "#b64e4e" : "#888888"}
                          className="size-5 relative mb-[1px]"
                        />
                        <span className="text-blacks font-semibold">
                          {likes_count_formated}
                        </span>
                      </div>
                      <div
                        onClick={() => handleLikeDislike(id, "dislike")}
                        className="flex border  px-3 h-8 items-center space-x-1 rounded-full"
                      >
                        <FavIcon
                          name="likeDown"
                          color={is_disliked ? "#b64e4e" : "#888888"}
                          className="size-5 relative mr-1 top-[2px]"
                        />
                        <span className="text-blacks font-semibold">
                          {dislikes_count_formated}
                        </span>
                      </div>
                      <div className="flex border px-3 h-8 items-center space-x-1 rounded-full">
                        <FavIcon
                          name="comnet"
                          color="#888888"
                          className="size-5 relative top-[2px]"
                        />
                        <span className="text-blacks font-semibold">
                          {comment_replies_count_formated}
                        </span>
                      </div>
                      <div
                        onClick={() => setIsShare(!isShare)}
                        className="flex border px-3 h-8 items-center space-x-1 rounded-full"
                      >
                        <FavIcon name="share" />
                        <span className="text-blacks font-semibold">Share</span>
                      </div>
                      <div
                        onClick={() => setIsReport(!isReprot)}
                        className="flex border px-3 h-8 items-center space-x-1 rounded-full"
                      >
                        <FavIcon name="report1" className="size-5" />
                        <span className="text-blacks font-semibold">
                          Report
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Channel Info */}
                <div className="border p-4 rounded-md my-5">
                  <p className="text-sm text-blacks font-semibold">
                    {publish_time_formated}
                  </p>
                  <p className="mt-1 text-sm text-grays leading-relaxed">
                    {description}
                  </p>
                </div>
              </>
            )}
            {/* Comments */}
            <div>
              <CommentBox
                id={id}
                commentCount={comment_replies_count_formated}
              />
            </div>
          </div>

          {/* Right column - Related videos */}
          <div className="w-full lg:w-96 flex-shrink-0 mt-6 lg:mt-0">
            <h2 className="text-xl font-semibold mb-4">Related videos</h2>
            <div className="space-y-5">
              {/* <RelatedVideoCard/> */}
              {relLoading ? (
                <SkeletonCount count={10}>
                  <RelatedVideoCard />
                </SkeletonCount>
              ) : (
                relVideos?.data.map((item: any) => (
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
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <Modal open={isReprot} title="Report this video" setIsOpen={setIsReport}>
        <div>
          <RadioGroup
            defaultValue={reportText.reason}
            onValueChange={(value) =>
              setReportText((prev) => ({
                ...prev,
                reason: value,
              }))
            }
            className="grid space-y-0"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="data-[state=checked]:border-red-500 cursor-pointer data-[state=checked]:bg-red-500 data-[state=checked]:text-red-500"
                />
                <Label htmlFor={option.value} className="text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="mt-2 flex justify-end gap-4">
            <Button
              variant="link"
              onClick={() => setIsReport(false)}
              className="text-black hover:text-blacks hover:no-underline"
            >
              Cancel
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setIsReport(false);
                setIsText(true);
              }}
              className="text-reds hover:text-reds hover:no-underline"
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Report Text Modal */}
      <Modal open={isText} title={reportText?.reason} setIsOpen={setIsText}>
        <div>
          <Textarea
            className="resize-none w-full h-36"
            placeholder="Describe your issue..."
            onChange={(e) =>
              setReportText((prev) => ({
                ...prev,
                issue: e.target.value,
              }))
            }
          />
          <div className="mt-2 flex justify-end gap-4">
            <Button
              variant="link"
              onClick={() => setIsText(false)}
              className="text-black hover:text-blacks hover:no-underline"
            >
              Cancel
            </Button>
            <Button
              variant="link"
              disabled={ReportLoading}
              onClick={() => SubmitReport()}
              className="text-reds hover:text-reds hover:no-underline"
            >
              Report
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal open={isShare} title="Share" setIsOpen={setIsShare}>
        <div>
          <ul>
            <li className="text-xl text-blacks font-semibold text-center">
              Link for this video
            </li>
            <li className="text-center text-grays px-3">
              Copy this link and share to your friends through anything you want
            </li>
          </ul>
          <div className="w-full rounded-full h-12 border select-none flex justify-center items-center text-center text-lg text-grays my-4">
            {`${process.env.NEXT_PUBLIC_APP_URL}${path}`}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={async () => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_APP_URL}${path}`
                );
                toast.success("Link copied to clipboard!", { duration: 2000 });
                await delay(2400);
                setIsShare(false);
              }}
              className="rounded-full px-6 py-2 h-auto text-center text-base bg-transparent hover:bg-transparent shadow-none border border-input"
            >
              <FavIcon name="copy1" className="size-6" />
              <span className="text-blacks"> Copy link</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
