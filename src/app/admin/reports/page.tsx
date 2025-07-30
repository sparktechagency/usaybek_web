"use client";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import Avatars from "@/components/reuseable/avater";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import Link from "next/link";
import React from "react";

export default function Reports() {
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
      icon: true,
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
                    <Link href={"/admin/channels/1"}>
                      <Previewbtn />
                    </Link>
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
    </div>
  );
}
