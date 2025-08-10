"use client";
import { ChartAreaStacked } from "@/components/common/chats/area";
import NavItem from "@/components/common/dashboard/navber";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import Icon from "@/icon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MonthlyBox from "@/components/reuseable/date-box";
import { serviceItem, ViewItem } from "@/dummy-data";


export default function Dashboard() {
  const [status, setStatus] = useState("Views");
 
  return (
    <div>
      <NavItem title="Dashboard Overview" />
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Card className="p-2 border-1 gap-0">
            <div className="relative h-48 md:h-64">
              <Image
                src={"https://surl.li/lzklum"}
                alt="Cover image"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <Avatar className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 size-24  shadow-md">
                <AvatarImage
                  src={
                    "https://doctors-next14.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile2.0440e650.jpg&w=1920&q=75"
                  }
                  alt="Profile picture"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <CardContent className="pt-14 pb-4 px-6 text-center mx-auto">
              <h2 className="text-2xl font-semibold text-blacks">
                Haircut Pro Islam
              </h2>
              <p className="text-base flex items-center justify-center text-center gap-1 mt-1">
                <Icon name="locationGary" />
                New York, USA
              </p>
            </CardContent>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-[22px] text-blacks font-semibold">
                Analytics
              </CardTitle>
              <Link
                href="/dashboard/analytics"
                className="items-center hidden md:flex  gap-1 font-normal text-blacks border-1 py-2 px-5 rounded-full"
              >
                See full analytics <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ViewItem.map((item, index) => (
                <Card key={index} className="gap-0 p-2  border-1">
                  <div className="flex justify-between px-4 py-3">
                    <div>
                      <div className="text-blacks">{item.label}</div>
                      <div className="text-2xl font-bold">{item.value} </div>
                    </div>
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={44}
                      height={44}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            {/* About Section */}
            <Card className="p-3 border-1 gap-0 md:pb-30">
              <CardTitle className="text-xl font-semibold mb-2">
                About
              </CardTitle>
              <CardContent className="p-0 text-blacks text-sm leading-relaxed lg:pr-20">
                Lorem ipsum dolor sit amet consectetur. Nibh sagittis ligula sem
                pulvinar elementum rhoncus lacus. Dignissim pretium vitae neque
                vulputate velit libero suscipit amet. Felis proin in tortor
                amet. Sit imperdiet ac aliquam leo est egestas. Sit id vitae
                tempus nulla ut consectetur mi lobortis nec. Convallis velit
                lectus aliquam elementum dignissim. Est risus adipiscing ornare
                et lorem
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card className="p-3 border-1 gap-0 md:pb-26">
              <CardTitle className="text-xl font-semibold mb-2">
                Services
              </CardTitle>
              <CardContent className="p-0 flex flex-wrap max-w-xs gap-3 [&>button]:text-blacks">
                {serviceItem.map((item, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="rounded-full  px-4 py-2 text-sm bg-transparent"
                  >
                    {index + 1} {item}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-center text-base lg:text-2xl font-semibold my-6 lg:my-10">
          Overall statistics of your channel
        </h1>
        <div className="flex justify-between border-b border-gray-200">
          <div>
            {["Views", "Likes", "Dislikes"].map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`cursor-pointer px-6 py-2 text-sm font-medium text-[#333] border-b-2 border-transparent ${
                  status === item ? "!border-reds" : ""
                } focus:outline-none`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
          <MonthlyBox />
        </div>
        <ChartAreaStacked />
      </div>
    </div>
  );
}
