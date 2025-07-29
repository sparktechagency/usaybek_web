"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";

import { Button } from "@/components/ui";
import { PlaceholderImg } from "@/lib/utils";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const blogPosts = [
  {
    id: 1,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=120&width=120",
    title: "Blog title goes here.",
    description:
      "Lorem ipsum dolor sit amet consectetur. In tellus convallis sed massa lectus. Magna consequat cum sem facilisis lacus sed sollicitudin faucibus tristique. Id ut amet enim dolor vulputate a eget.",
  },
];

export default function ManageBlogs() {
  return (
    <div>
      <NavTitle
        title="Manage blogs"
        subTitle="You can manage your blogs of your website from here."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg  overflow-hidden  duration-200 cursor-pointer p-2"
          >
            <div className="flex">
              <div className="">
                <ImgBox
                  src={PlaceholderImg()}
                  alt="44"
                  className="w-40 h-[150px]"
                />
              </div>
              <div className="flex-1 p-4 relative">
                <Link href="/admin/manage-blogs/434" className="absolute top-3 right-3">
                  <ArrowUpRight className="size-4" />
                </Link>
                <div className="pr-6">
                  <h3 className="font-semibold text-blacks text-base mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-blacks leading-relaxed line-clamp-4">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href="/admin/manage-blogs/add">
        <Button variant="primary" size="lg" className="rounded-full mt-7">
          <Plus className="text-white size-5" />
          Add Blog
        </Button>
      </Link>
    </div>
  );
}
