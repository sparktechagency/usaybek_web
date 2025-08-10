"use client";
import ReportView from "@/components/common/admin/basic/report-view";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Avatars from "@/components/reuseable/avater";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import { BackBtn } from "@/components/reuseable/icon-list";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import FavIcon from "@/icon/admin/favIcon";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
const options = [
  { label: "Suspend for 7 days", value: "suspend_7_days" },
  { label: "Suspend for 30 days", value: "suspend_30_days" },
  { label: "Give a warning", value: "warning" },
  { label: "Suspend permanently", value: "suspend_permanently" },
];

export default function Appeals() {
  const { confirm } = useConfirmation();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [isTake, setIsTake] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);

  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      title: "",
      description: " ",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };
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
      icon: "i2",
    });
    if (con) {
      console.log("ui delte");
      //   console.log(selectedVideoIds);
    }
  };
  const handleDecline = async () => {
    const con = await confirm({
      title: "This appeal from Haircut pro has been Appeal declined",
      description:
        "User's can find this video on their feed or their search results.",
      cancelText: "Close",
      confirmText: "Undo",
      className: "px-10",
      btnStyle: "py-4 px-10",
      icon: "i2",
    });
    if (con) {
      console.log("handleDecline ");
    }
  };
  const handleAccept = async () => {
    const con = await confirm({
      title: "This appeal from Haircut pro has been Appeal accepted",
      description:
        "Now users can find this video on their feed or their search results.",
      cancelText: "Close",
      confirmText: "Undo",
      className: "px-10",
      btnStyle: "py-4 px-10",
      titleStyle: "text-greens",
      icon: "i3",
    });
    if (con) {
      console.log("handleAccept ");
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
          <BackBtn iconStyle="bg-body" className="gap-x-0" />
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
                    <Previewbtn onClick={() => setIsView(!isView)} />
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
            current_page={1}
            onPageChange={() => {}}
            total={10}
            per_page={2}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
      {/* view box */}
      <Modal
        open={isView}
        setIsOpen={setIsView}
        title="Haircut pro"
        titleStyle="text-center"
        className="sm:max-w-5xl"
      >
        <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
          <div className="space-y-10">
            <FromInputs
              label="Title"
              name="title"
              placeholder="Enter your title"
              stylelabel="bg-white"
            />
            <FromTextAreas
              label="Description"
              name="description"
              placeholder="Enter your Description"
              className="min-h-44 rounded-3xl"
              stylelabel="bg-white"
            />
          </div>

          <div className="col-span-2 flex justify-between">
            <div className="flex space-x-2 items-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleAccept()}
                className="rounded-full bg-greens"
              >
                Accept
              </Button>
              <Button
                onClick={() => handleDecline()}
                variant="primary"
                size="lg"
                className="rounded-full"
              >
                Decline
              </Button>
            </div>
            <Button
              onClick={() => setIsPreview(!isPreview)}
              variant="outline"
              size="lg"
              className="rounded-full bg-transparent hover:bg-transparent"
            >
              See report <ArrowRight />
            </Button>
          </div>
        </Form>
      </Modal>
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
