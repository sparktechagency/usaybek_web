"use client";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { ImgBox } from "@/components/common/admin/reuseable";
import FavIcon from "@/icon/admin/favIcon";
import { useEffect, useState } from "react";
import {
  useDeleteBannerMutation,
  useGetBannerQuery,
  useStoreBannerMutation,
  useUpdateBannerMutation,
} from "@/redux/api/admin/promotionalApi";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Button, Skeleton } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Pagination } from "@/components/reuseable/pagination";
import { Plus } from "lucide-react";

export default function PromoBanners() {
  const { confirm } = useConfirmation();
  const [isPage, setIsPage] = useState<number>(1);
  const { data: banners, isLoading } = useGetBannerQuery({ page: isPage });
  const [deleteBanner] = useDeleteBannerMutation();
  const [active, setActive] = useState<number | null>(null);
  const [storeBanner, { isLoading: storeLoading }] = useStoreBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();

  useEffect(() => {
    const close = (e: any) => !e.target.closest(".menu") && setActive(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleDeleteBanner = async (id: string) => {
    const con = await confirm({
      title: "You are going to delete this banner",
      description:
        "After deleting, users can't find this banner and promotional anymore",
    });
    if (con) {
      const res = await deleteBanner(id).unwrap();
      if (res.status) {
        setActive(null);
      }
    }
  };
  return (
    <div>
      <NavTitle
        title="Promotional"
        subTitle="You can manage your promotional banner / ads of your website from here"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <SkeletonCount count={9}>
            <Skeleton className="w-full h-[230px]" />
          </SkeletonCount>
        ) : (
          banners?.data?.map((item: any) => (
            <div key={item?.id} className="relative menu">
              <ImgBox
                src={item?.image}
                className="w-full h-[230px]"
                alt={`banner-${item?.id}`}
              />
              <div
                onClick={() => setActive(active === item?.id ? null : item?.id)}
                className="size-10 bg-[#565656bc]/1 border border-white backdrop-blur-3xl absolute top-3 right-3 rounded-full grid place-items-center cursor-pointer"
              >
                <FavIcon name="dot3" className="size-5" />
              </div>
              {active === item?.id && (
                <ul className="bg-white rounded-xl absolute top-15 right-3 w-[150px] [&>li]:cursor-pointer shadow-lg">
                  <li>
                    <ImgUpload
                      onFileSelect={async (file: File) => {
                        const formData = new FormData();
                        formData.append("_method", "PUT");
                        formData.append("image", file);
                        const res = await updateBanner({
                          id: item?.id,
                          data: formData,
                        }).unwrap();
                        if (res?.status) {
                          setActive(null);
                        }
                      }}
                    >
                      <span className="flex items-center text-base font-medium text-[#4285F4] border-b py-2 px-3">
                        <FavIcon name="replace" className="mr-2 size-5" />{" "}
                        Replace
                      </span>
                    </ImgUpload>
                  </li>
                  <li
                    onClick={() => handleDeleteBanner(item?.id)}
                    className="flex items-center text-base font-medium text-red-500 py-2 px-3"
                  >
                    <FavIcon name="delete" className="mr-2 size-5" /> Delete
                  </li>
                </ul>
              )}
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-between">
        <ImgUpload
          onFileSelect={async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            await storeBanner(formData).unwrap();
          }}
        >
          <Button
            disabled={storeLoading}
            variant="primary"
            size="lg"
            className="rounded-full mt-7 disabled:opacity-90"
          >
            <Plus className="text-white size-5" />
            Add more
          </Button>
        </ImgUpload>
        <Pagination
          onPageChange={(v: any) => setIsPage(v)}
          {...banners?.meta}
          activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
          itemStyle="rounded-full"
        ></Pagination>
      </div>
    </div>
  );
}
