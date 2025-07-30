"use client";
import SalesPreview from "@/components/common/admin/basic/sales-preview";
import SalesStore from "@/components/common/admin/basic/sales-store";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function SalesrepResentatives() {
  const { confirm } = useConfirmation();
  const [isStore, setIsStore] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const headers = ["Sl. No", "Name", "Phone number", "Location", "Action"];

  const data = [
    {
      id: "001",
      image: "https://example.com/avatar.jpg", // Replace with actual image URL
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "002",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "003",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "004",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "005",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "006",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "007",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
    {
      id: "008",
      image: "https://example.com/avatar.jpg",
      name: "Haircut pro",
      phone: "2125456421565",
      location: "Dhaka, Bangladesh",
    },
  ];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Are you sure to delete this representatives ?",
      description:
        "This sales representatives will no longer able to access his account.",
      icon: true,
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="Sales representatives"
        subTitle="You can manage your sales representatives from here"
      />
      <ul className="flex justify-between">
        <li>
          {" "}
          <SearchBox placeholder="Search channel" className="min-w-md" />
        </li>
        <li>
          <Button
            onClick={() => setIsStore(!isStore)}
            variant="primary"
            size="lg"
            className="rounded-full"
          >
            <Plus className="text-white size-5" />
            Add
          </Button>
        </li>
      </ul>
      <div>
        <CustomTable headers={headers}>
          {data.map((item, index) => (
            <TableRow key={index}>
              {/* Sl No */}
              <TableCell>{item.id}</TableCell>

              {/* Channel Name with Image */}
              <TableCell className="relative">
                <div className="flex items-center gap-2">
                  <Avatars
                    src=""
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="avatar"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>

              {/* Reason */}
              <TableCell>{item.phone}</TableCell>

              {/* Amount */}
              <TableCell>{item.location}</TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Previewbtn onClick={() => setIsDetails(!isDetails)} />
                  </li>
                  <li>
                    <Deletebtn onClick={() => handleDelete(item.id)} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-3">
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
      {/* details box*/}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        title="Add Representative"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <SalesStore />
      </Modal>
      {/*SalesStore Modal */}
      <Modal
        open={isDetails}
        setIsOpen={setIsDetails}
        title="Representative Details"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <SalesPreview />
      </Modal>
    </div>
  );
}
