"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui";
import {
  Eye,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  MessageCircle,
  Play,
  Settings,
  Maximize,
  Copy,
} from "lucide-react";
import { PlaceholderImg } from "@/lib/utils";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui";
import Icon from "@/icon/icon";

const options = [
  { value: "sexual-content", label: "Sexual content" },
  { value: "violent-repulsive-content", label: "Violent or repulsive content" },
  { value: "hateful-abusive-content", label: "Hateful or abusive content" },
  { value: "harassment-bullying", label: "Harassment or bullying" },
  { value: "harmful-dangerous-acts", label: "Harmful or dangerous acts" },
  { value: "misinformation", label: "Misinformation" },
  { value: "child-abuse", label: "Child abuse" },
  { value: "promotes-terrorism", label: "Promotes terrorism" },
  { value: "spam-misleading", label: "Spam or misleading" },
  { value: "legal-issue", label: "Legal issue" },
  { value: "captions-issue", label: "Captions issue" },
];

export default function VideoDetails({ slug }: any) {
  const [isReprot, setIsReport] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  console.log(selectedValue);

  console.log(slug);

  return (
    <div className="container">
      <div className="flex flex-col">
        <h1>lfjljflf</h1>
        <Icon name="eye" />
        {/* Header */}

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6">
          {/* Left column: Video player, details, comments */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <Image
                src="https://surl.li/lzklum"
                alt="Video thumbnail"
                layout="fill"
                objectFit="cover"
                className="opacity-70"
              />
              {/* Playback controls placeholder */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Play className="w-5 h-5" />
                    <span className="sr-only">Play</span>
                  </Button>
                  <span>2:26 / 8:34</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="sr-only">Settings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="w-5 h-5" />
                    <span className="sr-only">Fullscreen</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Title and Actions */}
            <div>
              {/* <Logo /> */}
              {/* <h1>fjdfjlk</h1> */}
              <h1 className="text-lg lg:text-xl font-semibold text-blacks mt-3">
                Joe&apos;s Expert Auto LLC. - Address: 2740 N Elston Ave,
                Chicago, IL 60647, United States
              </h1>
              <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
                <div className="flex items-center gap-3">
                  <Avatars src="" fallback="C" alt="Channel Avatar" />
                  <div className="flex-1">
                    <Link href="#" className="font-semibold text-gray-900">
                      Channel name
                    </Link>
                  </div>
                </div>
                {/* right */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2  text-sm has-[>div]:cursor-pointer">
                  <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                    <Eye className="size-6 text-grays" />
                    <span className="text-blacks font-semibold">10K</span>
                  </div>
                  <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                    <ThumbsUp className="size-5 text-grays" />
                    <span className="text-blacks font-semibold">10</span>
                  </div>
                  <div className="flex items-start gap-1 border px-4 py-1 rounded-full">
                    <ThumbsDown className="size-5 text-grays" />
                    <span className="text-blacks font-semibold">10</span>
                  </div>
                  <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                    <MessageCircle className="size-5 text-grays" />
                    <span className="text-blacks font-semibold">10</span>
                  </div>
                  <div
                    onClick={() => setIsShare(!isShare)}
                    className="flex items-center gap-1 border px-4 py-1 rounded-full"
                  >
                    <Share2 className="size-4 text-grays" />
                    <span className="text-blacks font-semibold">Share</span>
                  </div>
                  <div
                    onClick={() => setIsReport(!isReprot)}
                    className="flex items-center gap-1 border px-4 py-1 rounded-full"
                  >
                    <Flag className="size-5 text-grays" />
                    <span className="text-blacks font-semibold">Report</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Channel Info and Description */}
            <div className="border p-4 rounded-md my-5 shadow-xs">
              <p className="text-sm text-blacks font-semibold">10 hours ago</p>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Malesuada at pharetra
                convallis sociis a consectetur. In semper tortor felis gravida
                magna eu. Sit sollicitudin dolor ac diam risus nisl gravida.
                Turpis nisl eget mauris eu volutpat eget urna. Vel ante praesent
                sapien quam. Non sapien fringilla rutrum porttitor in eu sit
                consectetur. Sapien scelerisque si faucibus tincidunt potenti
                amet sed enim a. Laciniis sagittis tellus lobortis sed odio
                ullamcorper eu sit. Tristique id quisque pulvinar adipiscing
                bibendum in penatibus egestas. Gravida urna aliquet feugiat
                habitant amet eget nisl. Etiam aenean viverra dui nisl id.
                Scelerisque ultricies urna morbi in leo sapien volutpat gravida.
                Convallis viverra mattis iaculis viverra pellentesque sed amet
                id. Elit vestibulum iaculis id. Sed tincidunt platea pharetra
                vestibulum. Vel ipsum nulla neque est. Dignissim massa odio enim
                vitae tortor laoreet consectetur amet. Sociis quam nisl sed
                tristique libero.
              </p>
            </div>

            {/* Comments Section */}
            <div className="border-gray-200 pb-5">
              <h2 className="text-lg font-semibold">1000 Comments</h2>
              <div className="flex items-center gap-3 mt-4">
                <Avatars src="" fallback="M" alt="Channel Avatar" />
                <Input
                  placeholder="Comment as Ms. Abid"
                  className="flex-1 rounded-full bg-white"
                />
              </div>

              {/* Sample Comments */}
              <div className="mt-6 space-y-6">
                {/* Comment 1 */}
                <div className="flex gap-3">
                  <Avatars src={""} fallback="J" alt="John Doe" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">John Doe</span>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                    <p className="mt-1 text-gray-800">
                      Very informative video. I will obviously take your
                      service.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>2.6K</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        See Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
                {/* Comment 2 */}
                <div className="flex gap-3">
                  <Avatars src="" fallback="J" alt="Channel Avatar" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold">John Doe</span>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                    <p className="mt-1 text-gray-800">
                      Very informative video. I will obviously take your
                      service.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>2.6K</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        See Reply
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Related videos */}
          <div className="w-full lg:w-96 flex-shrink-0 mt-6 lg:mt-0">
            <h2 className="text-xl font-semibold mb-4">Related videos</h2>
            <div className="space-y-5">
              {[...Array(10)].map((_, i) => (
                <Link href="#" key={i} className="flex gap-3 group">
                  <div className="relative w-37 h-22 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={PlaceholderImg(200, 200)}
                      alt="Related video thumbnail"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2 text-blacks">
                      Joes Expert Auto LLC. - Address: 2740 N Elston Ave,
                      Chicago, IL
                    </h3>
                    <ul>
                      <li className="text-gray-600 text-base mt-1">
                        Channel name
                      </li>
                      <li className="text-grays flex space-x-2 items-center text-sm">
                        <span className="text-xs">22K views</span>
                        <span className="flex items-center text-sm">
                          <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                          10 hours ago
                        </span>
                      </li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Modal Report box*/}
      <Modal open={isReprot} title="Report this video" setIsOpen={setIsReport}>
        <div>
          <RadioGroup
            defaultValue={selectedValue}
            onValueChange={setSelectedValue}
            className="grid space-y-0"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="data-[state=checked]:border-red-500   cursor-pointer data-[state=checked]:bg-red-500 data-[state=checked]:text-red-500"
                />
                <Label htmlFor={option.value} className="text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {/* Button section at the bottom, aligned to the right. */}
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
      {/* Modal Report text box*/}
      <Modal open={isText} title={selectedValue} setIsOpen={setIsText}>
        <div>
          <Textarea
            className="resize-none w-full h-36 "
            placeholder="Describe your issue..."
          ></Textarea>
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
              onClick={() => {
                console.log("all ok");
              }}
              className="text-reds hover:text-reds hover:no-underline"
            >
              Report
            </Button>
          </div>
        </div>
      </Modal>
      {/* Share Modal box for the side*/}
      <Modal open={isShare} title={"Share"} setIsOpen={setIsShare}>
        <div>
          <ul>
            <li className="text-xl text-blacks font-semibold text-center">
              Link for this video
            </li>
            <li className="text-center text-grays px-3">
              Copy this link and share to your friends through anything you want
            </li>
          </ul>
          <Input
            type="text"
            placeholder="https://www.youtube.com/watch?v=dtWsgIGsh..."
            readOnly
            className="w-full rounded-full h-12 text-center text-lg text-grays placeholder:text-base my-4"
          />
          <div className="flex justify-center">
            <Button className="rounded-full px-6 py-2 h-auto text-center text-base bg-transparent hover:bg-transparent shadow-none border border-input">
              <Copy className="mr-2 h-4 w-4 text-grays" />
              <span className="text-blacks"> Copy link</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
