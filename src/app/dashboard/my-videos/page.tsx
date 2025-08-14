"use client";
import NavItem from "@/components/common/dashboard/navber";
import {
  Checkbox,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import React, { useEffect, useState } from "react";
import Icon from "@/icon";
import { Pagination } from "@/components/reuseable/pagination";
import { DeleteBtn } from "@/components/reuseable/btn";
import Link from "next/link";
import Modal from "@/components/reuseable/modal";
import TabList from "@/components/common/upload/tab";
import PaymentBox from "@/components/common/payment-box";
import FavIcon from "@/icon/admin/favIcon";
import { useUserVideosQuery } from "@/redux/api/dashboard/videosApi";
import { ImgBox } from "@/components/common/admin/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { useDebounce } from "use-debounce";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  visibility: string;
  date: string;
  time: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
}

const initialVideos: Video[] = [
  {
    id: "1",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu. ",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "6",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description:
      "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
];

export default function MyVideos() {
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const [isPage, setIsPage] = useState<number>();
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: userVideos, isLoading } = useUserVideosQuery({ ...query });
  const { confirm } = useConfirmation();
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [isUpload, setIsUpload] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [selectedVideoIds, setSelectedVideoIds] = useState<Set<string>>(
    new Set()
  );

  console.log(value);

  // isUpload modal close
  useEffect(() => {
    setIsUpload(false);
  }, [isPayment]);

  const handleSelectVideo = (id: string, isChecked: boolean) => {
    setSelectedVideoIds((prev) => {
      const updated = new Set(prev);
      if (isChecked) {
        updated.add(id);
      } else {
        updated.delete(id);
      }
      return updated;
    });
  };

  const handleDelete = async () => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
    });
    if (con) {
      console.log(selectedVideoIds);
    }
  };

  const SingleVideoDelete = async (id: string) => {
    const con = await confirm();
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavItem
        title="My videos"
        onClick={() => setIsUpload(!isUpload)}
        upload={true}
        onSearch={(text) => setIsSearch(text)}
      />
      <div>
        <div className="flex items-center space-x-4 pb-2 pt-10">
          <span className="font-medium text-blacks">
            Total videos: {videos.length}
          </span>
          {selectedVideoIds?.size > 0 && (
            <>
              <DeleteBtn onClick={handleDelete} />
            </>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="[&>th]:text-blacks">
              <TableHead className="w-[220px] space-x-[7px]">
                <Checkbox
                  id="select-all"
                  checked={isCheck}
                  onCheckedChange={(checked) => setIsCheck(checked as boolean)}
                />
                <label htmlFor="select-all" className="cursor-pointer">
                  Videos
                </label>
              </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Dislikes</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <SkeletonCount count={6}>{SkeletonVideosAll()}</SkeletonCount>
            ) : userVideos?.data?.length > 0 ? (
              userVideos?.data?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex gap-5 items-center mr-5 w-[700px] overflow-hidden">
                      {isCheck && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${item.id}`}
                            checked={selectedVideoIds.has(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelectVideo(item.id, checked as boolean)
                            }
                          />
                        </div>
                      )}
                      <div className="flex space-x-4">
                        <div className="w-[150px] h-[95px]">
                          <ImgBox
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-[150px] h-[95px] rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold block break-all whitespace-normal text-blacks text-lg !truncate">
                            {item.title}
                          </div>
                          <div className="group w-full text-sm cursor-pointer text-grays relative">
                            <div className="group-hover:!hidden">
                              <h1 className="block flex-1  break-all whitespace-normal !line-clamp-2">
                                {item.description}
                              </h1>
                            </div>

                            <div className="hidden group-hover:block">
                              <ul className="flex items-center space-x-2 mt-3">
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={
                                      "/dashboard/video-details?tab=details"
                                    }
                                  >
                                    <FavIcon
                                      name="eye"
                                      className="size-5"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={
                                      "/dashboard/video-details?tab=analytics"
                                    }
                                  >
                                    <FavIcon
                                      name="analytics"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link href={"/dashboard/edit-video"}>
                                    <FavIcon
                                      name="edit"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={
                                      "/dashboard/video-details?tab=comments"
                                    }
                                    className="relative top-[2px]"
                                  >
                                    <FavIcon
                                      name="comnet"
                                      className="size-4"
                                      color="#535353"
                                      hoverColor="#4a4df5"
                                    />
                                  </Link>
                                </li>
                                <li
                                  className="hover:border rounded-md size-8 grid place-items-center hover:bg-white"
                                  onClick={() => SingleVideoDelete(item.id)}
                                >
                                  <FavIcon
                                    name="delete"
                                    className="size-4"
                                    color="#535353"
                                    hoverColor="#ef4444"
                                  />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="inline-flex items-center space-x-1 border rounded-full px-2 py-1 text-blacks">
                      <Icon name="internetBlack" width={17} height={17} />
                      <span>{item.visibility}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <ul className="[&>li]:text-grays space-y-1">
                      <li className="flex items-center space-x-2">
                        <Icon name="calenderGarys" width={17} height={17} />
                        <span>{item?.created_date}</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="timegrays" width={17} height={17} />
                        <span>{item?.created_time}</span>
                      </li>
                    </ul>
                  </TableCell>

                  <TableCell>
                    <div className="text-blacks">{item.views}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.likes_count}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.dislikes_count}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-blacks">{item.comments_count}</div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                   <h1 className="textc-center">Video not found</h1>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...userVideos?.meta}
          ></Pagination>
        </li>
      </ul>
      {/* modal upload */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a new video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsPayment={setIsPayment} />
      </Modal>
      {/* payment */}
      <Modal
        title="Pay to MyTSV"
        open={isPayment}
        setIsOpen={setIsPayment}
        titleStyle="text-center"
        className="sm:max-w-3xl"
      >
        <PaymentBox setIsPayment={setIsPayment} />
      </Modal>
    </div>
  );
}

function SkeletonVideosAll() {
  return (
    <TableRow>
      <TableCell>
        <div className="flex gap-5 items-center pr-5 w-[700px] overflow-hidden">
          <div className="flex space-x-4">
            <div className="w-[150px] h-[95px]">
              <Skeleton className="w-[150px] h-[95px] rounded-md" />
            </div>
            <div className="flex-1 space-y-2 mt-2">
              <Skeleton className="w-[300px] h-4 rounded-sm" />
              <Skeleton className="w-[500px] h-4 rounded-sm" />
              <Skeleton className="w-[500px] h-4 rounded-sm" />
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="w-[110px] h-8 rounded-md" />
      </TableCell>

      <TableCell>
        <div className="space-y-2">
          <Skeleton className="w-[110px] h-4 rounded-sm" />
          <Skeleton className="w-[110px] h-4 rounded-sm" />
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[60px] h-4 rounded-sm" />
      </TableCell>
    </TableRow>
  );
}
