"use client";
import React from "react";
import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";
import Sidebar from "@/components/common/sideber/sideber";
import { usePathname } from "next/navigation";
import HomeCarousel from "@/components/common/home-carousel";
import { useSidebar } from "@/context/useSideber";

export default function CommonLayout({ children }: childrenProps) {
  const pathname = usePathname();
  const { isExpanded } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen">
      {pathname !== "/" && <Navber />}
      {pathname === "/" && <HomeCarousel />}

      <div className="flex flex-1">
        {/* Sidebar must be inside a tall parent */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? "w-sideber-md" : "w-sideber-xs"
          } shrink-0`}
        >
          <div className="!sticky !top-0 !left-0">
            <Sidebar />
          </div>
        </div>

        {/* Main content scrolls */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
