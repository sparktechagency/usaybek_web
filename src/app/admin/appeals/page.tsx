"use client";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import Avatars from "@/components/reuseable/avater";
import { BackBtn } from "@/components/reuseable/icon-list";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import Link from "next/link";
import React from "react";

export default function Appeals() {
  const { confirm } = useConfirmation();
  const headers = ["Sl. No", "Appeal from", "Subject", "Action"];

  const reports = [
    {
      slNo: "001",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "002",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "003",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "004",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "005",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "006",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
    {
      slNo: "007",
      appealFrom: "Haircut pro",
      subject: "Spreading misinformation",
    },
  ];

  const handleDelete = async () => {
    const con = await confirm({
      title: "You are going to delete this Appeals channel",
      description:
        "After deleting, users can't find this Appeals channel and videos anymore",
      icon: true,
    });
    if (con) {
      //   console.log(selectedVideoIds);
    }
  };

  return (
    <div>
      <NavTitle
        title="Appeals"
        subTitle="You can see & manage all the appeals of MyTSV from here."
      />
      <div className="flex justify-between items-center">
         <Link href="/admin/reports">
         <BackBtn iconStyle="bg-body" className="gap-x-0"/>
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
                    fallback={item.appealFrom}
                    alt="profile"
                    fallbackStyle="avatar"
                  />
                  <span>{item.appealFrom}</span>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell>{item.subject}</TableCell>

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
