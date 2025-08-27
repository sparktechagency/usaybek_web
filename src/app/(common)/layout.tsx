"use client";
import React from "react";
import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";
import Sidebar from "@/components/common/sideber/sideber";
import { usePathname } from "next/navigation";
import HomeCarousel from "@/components/common/home-carousel";

export default function CommonLayout({ children }: childrenProps) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen">
      {pathname !== "/" && <Navber />}
      {pathname == "/" && <HomeCarousel />}
      <div className="flex flex-1">
        <aside>
          <Sidebar />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
