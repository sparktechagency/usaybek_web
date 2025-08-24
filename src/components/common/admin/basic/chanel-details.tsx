"use client";
import { useState } from "react";
import Modal from "@/components/reuseable/modal";
import VideoPlayer from "../../video-player";
import CommentBox from "../../comment-box";
import SelectBox from "@/components/reuseable/select-box";
import FavIcon from "@/icon/admin/favIcon";
import { Button, Textarea } from "@/components/ui";
import { VideoCard2 } from "@/components/reuseable/video-card";
import { NoItemData } from "../reuseable/table-no-item";

const options = [
  { label: "Suspend for 7 days", value: "suspend_7_days" },
  { label: "Suspend for 30 days", value: "suspend_30_days" },
  { label: "Give a warning", value: "warning" },
  { label: "Suspend permanently", value: "suspend_permanently" },
];

export default function ChannelBox({ totalVideos }: any) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);

  return (
    <div>
      <div className="home gap-6">
        {totalVideos?.length > 0 ? (
          totalVideos.map((video: any) => (
            <div
              key={video.id}
              className="cursor-pointer"
              onClick={() => setIsShow(!isShow)}
            >
              <VideoCard2 item={video} />
            </div>
          ))
        ) : (
          <NoItemData
            title="this channel has no video"
            className="col-span-4 w-full"
          />
        )}
      </div>
      {/* modal box */}
      <Modal
        open={isShow}
        setIsOpen={setIsShow}
        title="Haircut"
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <VideoPlayer />
            <div className="pt-5">
              <SelectBox
                items={options}
                onChange={(value) => {
                  if (value?.length > 0) {
                    setIsTake(true);
                  }
                }}
                placeholder="Take action"
              />
            </div>
            <div className="pt-5">
              <SelectBox
                items={options}
                onChange={(value) => {
                  if (value?.length > 0) {
                    setIsTake(true);
                  }
                }}
                placeholder="Reason"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-semibold text-blacks">
              Joe&apos;s Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago,
              IL 60647, United States
            </h1>
            <div className="border p-3 rounded-md my-5 shadow-xs">
              <p className="text-sm text-blacks font-semibold">10 hours ago</p>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Malesuada at pharetra
                convallis sociis a consectetur. In semper tortor felis gravida
                magna eu. Sit sollicitudin dolor ac diam risus nisl gravida
              </p>
            </div>
            <div className="border rounded-md p-3">
              <h1 className="text-blacks text-lg font-medium">Comments</h1>
              <CommentBox />
            </div>
          </div>
        </div>
      </Modal>
      {/* isTake */}
      <Modal
        open={isTake}
        setIsOpen={setIsTake}
        className="sm:max-w-3xl"
        title="Haircut pro"
        titleStyle="text-center"
      >
        <h1 className="text-lg text-center font-semibold text-blacks">
          Joe&apos;s Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL
          60647, United States
        </h1>
        <h1 className="flex items-center justify-center my-2 text-reds">
          <FavIcon name="question" className="mr-2" />
          Spreading misinformation
        </h1>
        <h1 className="flex items-center justify-center my-5 text-white alart py-3">
          <FavIcon name="alert" className="mr-2" />
          Suspending for 7 days
        </h1>
        <Textarea
          className="w-full rounded-3xl  pl-3 pr-3 py-3  text-blacks resize-none   text-sm min-h-45"
          placeholder="What is the issue ?"
        />
        <Button variant="primary" className="rounded-full mt-2 float-right">
          Take action
        </Button>
      </Modal>
    </div>
  );
}
