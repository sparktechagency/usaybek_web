"use client";
import ReportView from "@/components/common/admin/basic/report-view";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import VideoPlayer from "@/components/common/video-player";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import SelectBox from "@/components/reuseable/select-box";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import FavIcon from "@/icon/admin/favIcon";
import Link from "next/link";
import React, { useState } from "react";

const options = [
  { label: "Suspend for 7 days", value: "suspend_7_days" },
  { label: "Suspend for 30 days", value: "suspend_30_days" },
  { label: "Give a warning", value: "warning" },
  { label: "Suspend permanently", value: "suspend_permanently" },
];

export default function Reports() {
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const { confirm } = useConfirmation();
  const headers = [
    "Sl. No",
    "Report from",
    "Reported channel",
    "Reason",
    "Action",
  ];

  const reports = [
    {
      slNo: "001",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "002",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "003",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "004",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "005",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "006",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
    {
      slNo: "007",
      reportFrom: "Haircut pro",
      reportedChannel: "Mr. Beast",
      reason: "Spreading misinformation",
    },
  ];

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
        <SearchBox placeholder="Search channel" />
        <Link href="/admin/appeals">
          <Button variant="primary" size="lg" className="rounded-full">
            Appeals (10)
          </Button>
        </Link>
      </div>

      <div>
        <CustomTable headers={headers}>
          {reports.map((item, index) => (
            <TableRow key={index}>
              {/* Sl No */}
              <TableCell>{item.slNo}</TableCell>

              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src=""
                    fallback={item.reportFrom}
                    alt="profile"
                    fallbackStyle="avatar"
                  />
                  <span>{item.reportFrom}</span>
                </div>
              </TableCell>

              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src=""
                    fallback={item.reportedChannel}
                    alt="profile"
                    fallbackStyle="avatar"
                  />
                  <span>{item.reportedChannel}</span>
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
          ))}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            page={1}
            onPageChange={() => {}}
            totalPage={10}
            per_page={2}
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
