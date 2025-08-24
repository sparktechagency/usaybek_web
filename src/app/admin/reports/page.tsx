"use client";
import ReportView from "@/components/common/admin/basic/report-view";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import FavIcon from "@/icon/admin/favIcon";
import { useGetAreportQuery } from "@/redux/api/admin/reportsApi";
import Link from "next/link";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

const options = [
  { label: "Suspend for 7 days", value: "suspend_7_days" },
  { label: "Suspend for 30 days", value: "suspend_30_days" },
  { label: "Give a warning", value: "warning" },
  { label: "Suspend permanently", value: "suspend_permanently" },
];

export default function Reports() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: reports, isLoading } = useGetAreportQuery({ ...query });
  const headers = [
    "Sl. No",
    "Report from",
    "Reported channel",
    "Reason",
    "Action",
  ];

  console.log(reports?.total_appeals);

  const handleDelete = async () => {
    const con = await confirm({
      title: "You are going to delete this channel",
      description:
        "After deleting, users can't find this channel and videos anymore",
      icon: "i2",
    });
    if (con) {
      //   console.log(selectedVideoIds);
    }
  };

  return (
    <div>
      <NavTitle
        title="Reports"
        subTitle="You can see & manage all the reports of MyTSV from here."
      />
      <div className="flex justify-between items-center">
        <SearchBox
          placeholder="Search Reports"
          onSearch={(text) => setIsSearch(text)}
        />
        <Link href="/admin/appeals">
          <Button variant="primary" size="lg" className="rounded-full">
            Appeals ({reports?.total_appeals || 0})
          </Button>
        </Link>
      </div>

      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : reports?.data?.length > 0 ? (
            reports?.data?.map((item: any) => (
              <TableRow key={item?.id}>
                {/* Sl No */}
                <TableCell>{item.id}</TableCell>

                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.user?.avatar}
                      fallback={item.user?.name}
                      alt={item?.user?.name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.user?.name}</span>
                  </div>
                </TableCell>

                <TableCell className="relative">
                  <div className="flex items-center gap-3">
                    <Avatars
                      src={item?.video?.user?.avatar}
                      fallback={item?.video?.user?.channel_name}
                      alt={item?.video?.user?.channel_name}
                      fallbackStyle="avatar"
                    />
                    <span>{item?.video?.user?.channel_name}</span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell>{item.reason}</TableCell>

                {/* Action Buttons */}
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn onClick={() => setIsPreview(!isPreview)} />
                    </li>
                    <li>
                      <Deletebtn onClick={handleDelete} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No reports are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...reports?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
      {/* preview box */}
      <Modal
        open={isPreview}
        setIsOpen={setIsPreview}
        title="Haircut pro"
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <ReportView
          options={options}
          onChange={(value: any) => {
            console.log("Selected action:", value);
            setIsTake(true);
          }}
        />
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
