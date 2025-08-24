"use client";
import assets from "@/assets";
import ProfileMapbox from "@/components/common/profile-map-box";
import { VideoCardSkeleton } from "@/components/reuseable";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { VideoCard } from "@/components/reuseable/video-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui";
import Icon from "@/icon";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useUserDashboardQuery } from "@/redux/api/dashboard/simpleApi";
import { useUserVideosQuery } from "@/redux/api/dashboard/videosApi";
import { useGetContactQuery } from "@/redux/api/landing/contactApi";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProfileBox() {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery({});
  const { data: dashboard } = useUserDashboardQuery({ type: "yearly" });
  const { data: contact } = useGetContactQuery({});
  const {
    data: userVideos,
    isLoading: videosLoading,
  } = useUserVideosQuery({
    page: page,
  });
  const { name, avatar, cover_image, bio, services, locations } =
    profile?.data || {};
  const { phone, email, address } = contact?.data || {};
  const { views, likes, videos } = dashboard?.data || {};

  const ViewItem = [
    {
      label: "Views",
      value: views,
      icon: assets.dashboard.views,
    },
    {
      label: "Videos",
      value: videos,
      icon: assets.dashboard.videos,
    },
    {
      label: "Likes",
      value: likes,
      icon: assets.dashboard.likes,
    },
  ];
  const [totalVideos, setTotalVideos] = useState<any>([]);

  const hasMore = totalVideos.length < userVideos?.meta.total;
  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  useEffect(() => {
    if (userVideos?.data) {
      setTotalVideos((prev: any) => [...prev, ...userVideos?.data]);
    }
  }, [userVideos]);

  return (
    <div className="container pb-5 lg:pb-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="p-2 border-1 gap-0">
          <div className="relative h-48 md:h-64">
            <Image
              src={cover_image || "/blur.png"}
              alt="Cover image"
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
            <div className="absolute bottom-0 left-15 translate-y-1/2 ">
              <Avatar className="size-24  shadow-md">
                <AvatarImage src={avatar} alt={`${name}-Profile picture`} />
                <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold text-blacks relative -left-7">
                {name}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-3">
            <h2 className="opacity-0">left</h2>
            <h2 className="opacity-0">middle</h2>
            <Card>
              <ul className="space-y-1">
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="locationGary" />
                  {address}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="phoneGray" />
                  {phone}
                </li>
                <li className="flex gap-x-2 items-center text-blacks">
                  <Icon name="mailGray" />
                  {email}
                </li>
              </ul>
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ViewItem.map((item, index) => (
              <Card key={index} className="gap-0 p-2  border-1">
                <div className="flex justify-between px-4 py-3">
                  <div>
                    <div className="text-blacks">{item?.label}</div>
                    <div className="text-2xl font-bold">
                      {item?.value || 0}{" "}
                    </div>
                  </div>
                  <Image
                    src={item?.icon}
                    alt={item?.label}
                    width={44}
                    height={44}
                  />
                </div>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <Card className="p-3 border-1 gap-0">
              <CardTitle className="text-xl font-semibold mb-2">
                About
              </CardTitle>
              <CardContent className="p-0 text-blacks text-sm leading-relaxed">
                {bio}
              </CardContent>
            </Card>
            <Card className="p-3 border-1 gap-0">
              <CardTitle className="text-xl font-semibold mb-4">
                Services
              </CardTitle>
              <CardContent className="p-0 flex flex-col max-w-xs gap-2 [&>button]:text-blacks">
                {services?.map((item: any, index: any) => (
                  <h1 key={index}>
                    {index + 1} {item}
                  </h1>
                ))}
              </CardContent>
            </Card>
          </div>
        </Card>
        <Card className="p-1">
          <ProfileMapbox locations={locations} />
        </Card>
      </div>
      {/* Videos */}
      <div>
      <h1 className="font-medium text-xl py-5">Videos</h1>
      <div className="home gap-6">
        {videosLoading ? (
          <SkeletonCount count={10}>
            <VideoCardSkeleton />
          </SkeletonCount>
        ) : (
            totalVideos?.length && totalVideos.map((video: any) => (
            <VideoCard key={video.id} item={video} />
          ))
        )}
      </div>
      {hasMore && !videosLoading && (
          <div ref={ref} className="mx-auto opacity-0 flex justify-center mt-5">
          <Loader className="animate-spin text-blacks/20" />
        </div>
        )}
      </div>
    </div>
  );
}
