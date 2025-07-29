"use client"
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import promo1 from "@/assets/admin/promo1.jpg";
import promo2 from "@/assets/admin/promo2.jpg";
import promo3 from "@/assets/admin/promo3.jpg";
import promo4 from "@/assets/admin/promo4.jpg";
import promo5 from "@/assets/admin/promo5.jpg";
import { ImgBox } from "@/components/common/admin/reuseable";
import FavIcon from "@/icon/admin/favIcon";
import { useEffect, useState } from "react";

const banner = [promo1, promo2, promo3, promo4, promo5];

export default function PromoBanners() {
    const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const close = (e: any) => !e.target.closest(".menu") && setActive(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <div>
      <NavTitle
        title="Promotional"
        subTitle="You can manage your promotional banner / ads of your website from here."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {banner.map((item, idx) => (
          <div key={idx} className="relative menu">
            <ImgBox src={item} className="w-full h-[230px]" alt="img" />
            <div
              onClick={() => setActive(active === idx ? null : idx)}
              className="size-10 bg-[#565656bc]/1 border border-white backdrop-blur-3xl absolute top-3 right-3 rounded-full grid place-items-center cursor-pointer"
            >
              <FavIcon name="dot3" className="size-5" />
            </div>
            {active === idx && (
              <ul className="bg-white rounded-xl absolute top-15 right-3 w-[150px] [&>li]:cursor-pointer shadow-lg">
                <li className="flex items-center text-base font-medium text-[#4285F4] border-b py-2 px-3">
                  <FavIcon name="replace" className="mr-2 size-5" /> Replace
                </li>
                <li className="flex items-center text-base font-medium text-red-500 py-2 px-3">
                  <FavIcon name="delete" className="mr-2 size-5" /> Delete
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
