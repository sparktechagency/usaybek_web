"use client";
import NavItem from "@/components/common/dashboard/navber";
import {
  Button,
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
import React, { useState } from "react";
import { Pagination } from "@/components/reuseable/pagination";
import { DeleteBtn } from "@/components/reuseable/btn";
import Modal from "@/components/reuseable/modal";
import TabList from "@/components/common/upload/tab";
import {
  useBulkDeleteMutation,
  useLazyTogglePromotedQuery,
  useSingleDeleteMutation,
  useUserVideosQuery,
} from "@/redux/api/dashboard/videosApi";
import { ImgBox } from "@/components/common/admin/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { useDebounce } from "use-debounce";
import FavIcon from "@/icon/admin/favIcon";
import { getDateAfterMonths, modifyPayloadBulk } from "@/lib";
import Icon from "@/icon";
import Link from "next/link";
import { paymentDuration, videoFilterItem } from "@/dummy-data";
import { ButtonGroup } from "@/components/ui/button-group";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { InputMoneyDuration } from "@/components/reuseable/from-money-time";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { useGetPriceQuery } from "@/redux/api/admin/pricingApi";

export default function MyVideos() {
  const { confirm } = useConfirmation();
  const [isSearch, setIsSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [value] = useDebounce(isSearch, 1000);
  const [isUpload, setIsUpload] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isPage, setIsPage] = useState<number>();
  const [isPromated, setIsPromated] = useState(false);
  const [paymentCount, setPaymentCount] = useState(1);
  const [isPay, setIsPay] = useState(false);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
    ...(activeFilter && { type: activeFilter }),
  };
  const {
    data: userVideos,
    isLoading,
    refetch,
  } = useUserVideosQuery({ ...query });
  const [selectedVideoIds, setSelectedVideoIds] = useState<string[]>([]);
  const [bulkDelete] = useBulkDeleteMutation();
  const [singleDelete] = useSingleDeleteMutation();
  const [togglePromoted] = useLazyTogglePromotedQuery();
  const { data } = useGetPriceQuery({});

  console.log(data?.uploading_video);
  console.log(data?.uploading_youTube_link);

  //  == handleSelect ==
  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedVideoIds((prevIds) => [...prevIds, id]);
    } else {
      setSelectedVideoIds((prevIds) =>
        prevIds.filter((videoId) => videoId !== id),
      );
    }
  };

  // /handleDeleteAll
  const handleDeleteAll = async () => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
      titleStyle: "px-10",
    });
    if (con) {
      const data = modifyPayloadBulk("ids[]", selectedVideoIds);
      const res = await bulkDelete(data).unwrap();
      if (res?.status) {
        setSelectedVideoIds([]);
      }
    }
    setSelectedVideoIds([]);
  };

  // /SingleVideoDelete
  const SingleVideoDelete = async (id: string) => {
    const con = await confirm({
      title: "Are you sure to delete this video ?",
      description: "Users can't find your video anymore",
      titleStyle: "px-10",
    });
    if (con) {
      await singleDelete(id).unwrap();
    }
  };

  const handleTogglePromoted = async (id: string) => {
    try {
      const res = await togglePromoted(id).unwrap();
      if (res?.status) {
        refetch();
        const message = res?.data?.is_promoted
          ? "Promotion Added"
          : "Promotion Removed";
        toast.success(message, {
          description: res?.message,
          position: "bottom-right",
        });
      }
    } catch (err: any) {
      if (err?.data?.action === "payment") {
        setIsPromated(true);
      }
    }
  };

  //  payment form
  const from = useForm({
    defaultValues: {
      video_id: "",
      promoted_until: getDateAfterMonths(1),
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <NavItem
        title="My videos"
        onClick={() => setIsUpload(!isUpload)}
        upload={true}
        onSearch={(text) => setIsSearch(text)}
        placeholder="Search Videos"
      />
      <div>
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center  space-x-4 pb-2 pt-10">
            <span className="font-medium text-blacks">
              {isCheck
                ? `Selected Videos : ${selectedVideoIds?.length || 0}`
                : `Total Videos: ${userVideos?.meta?.total || 0}`}
            </span>
            {selectedVideoIds?.length > 0 && (
              <>
                <DeleteBtn onClick={handleDeleteAll} />
              </>
            )}
          </div>
          <ButtonGroup>
            {videoFilterItem?.map((btn) => (
              <Button
                key={btn.value}
                size="sm"
                variant="outline"
                className={
                  activeFilter === btn.value
                    ? "bg-transparent text-reds hover:text-reds "
                    : "shadow-none"
                }
                onClick={() => setActiveFilter(btn.value)}
              >
                {btn.label}
              </Button>
            ))}
          </ButtonGroup>
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
                    <div className="flex gap-5 items-center mr-5 w-[500px] md:w-[650px] overflow-hidden">
                      {isCheck && (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`select-${item.id}`}
                            checked={selectedVideoIds.includes(item.id)}
                            onCheckedChange={(checked) =>
                              handleSelect(item.id, checked as boolean)
                            }
                          />
                        </div>
                      )}
                      <div className="flex group space-x-4">
                        <div className="w-[150px] h-[95px] relative">
                          <ImgBox
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-[150px] h-[95px] rounded-md"
                          />

                          {!!item.is_promoted && (
                            <div className="absolute top-1 right-1  bg-reds/80 size-8 grid place-items-center rounded-full">
                              <FavIcon name="rocket" className="size-4 mr-1" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold block break-all whitespace-normal text-blacks text-lg !line-clamp-2 lg:truncate">
                            {item.title}
                          </div>

                          <div className="lg:group w-full text-sm cursor-pointer text-grays relative">
                            <div className="hidden lg:block lg:group-hover:!hidden">
                              <div
                                className="*:!font-normal !h-[60px] overflow-hidden"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></div>
                            </div>

                            <div className="lg:hidden  lg:group-hover:block">
                              <ul className="flex items-center space-x-2 mt-3">
                                <li className="hover:border rounded-md size-8 grid place-items-center hover:bg-white">
                                  <Link
                                    href={`/dashboard/video-details/${item.slug}?tab=details`}
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
                                    href={`/dashboard/video-details/${item.id}?tab=analytics`}
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
                                  <Link
                                    href={`/dashboard/edit-video/${item.slug}`}
                                  >
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
                                    href={`/dashboard/video-details/${item.id}?tab=comments`}
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
                                <li className="hover:border rounded-md h-8 w-9  grid place-items-center hover:bg-white">
                                  <Switch
                                    className="cursor-pointer data-[state=checked]:bg-[#535353]"
                                    checked={!!item.is_promoted}
                                    onClick={() =>
                                      handleTogglePromoted(item.id)
                                    }
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
                    <div className="inline-flex w-max items-center space-x-1 border rounded-full px-2 py-1 text-blacks">
                      <Icon name="internetBlack" width={17} height={17} />
                      <span>{item.visibility}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="w-[120px] md:w-fit">
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
                    </div>
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
              <TableNoItem
                title="No videos found in your My Videos"
                className="xl:py-40"
                colSpan={7}
              />
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && (
        <ul className="flex flex-wrap justify-end my-7">
          <li className="font-medium">
            <Pagination
              onPageChange={(v: any) => setIsPage(v)}
              {...userVideos?.meta}
            ></Pagination>
          </li>
        </ul>
      )}
      {/* modal upload */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a New Video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsUpload={setIsUpload} />
      </Modal>
      {/*   is promoted Modal */}
      <Modal
        open={isPromated}
        setIsOpen={setIsPromated}
        title={isPay ? "Pay to MyTSV" : "Promotion failed"}
      >
        <FavIcon
          name="rocket"
          color="#EF4444"
          className="size-20 mx-auto my-2"
        />
        <ul>
          <li className="text-xl font-semibold text-center">Promote Video</li>
          <li className="text-center px-20">
            {" "}
            Please make the payment for promoting your video
          </li>
        </ul>
        <div className="my-5">
          <Form from={from} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_150px] gap-5">
              <InputMoneyDuration
                items={paymentDuration}
                name="promoted_until"
                placeholder="Select Duration"
                matching={true}
                className="py-5 w-full"
                itemStyle="py-2"
                onChangeCount={(count) => {
                  setPaymentCount(count);
                }}
              />
              <div className="border w-full text-lg font-bold text-center py-1  flex items-center justify-center rounded-full">
                $100
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
              <Button className="bg-[#F0F0F0] hover:bg-[#F0F0F0] text-black w-full rounded-full h-11">
                Cancel
              </Button>
              <Button
                variant="primary"
                className="rounded-full px-2 h-11 w-full"
              >
                Pay now
              </Button>
            </div>
          </Form>
          {/* <div>
            <div>
              <InputMoneyDuration
                items={paymentDuration}
                name="promoted_until"
                placeholder="Select Duration"
                matching={true}
                className="py-4"
                itemStyle="py-2"
                onChangeCount={(count) => {
                  setPaymentCount(count);
                }}
              />
            </div>
            <div></div>
          </div> */}
        </div>
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
