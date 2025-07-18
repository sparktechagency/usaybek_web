import React from "react";
import Sidebar from "@/components/common/sideber";
import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";
import Providers from "../providers";

export default function CommonLayout({ children }: childrenProps) {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <Navber />
        <div className="flex flex-1">
          <aside>
            <Sidebar />
          </aside>

          <main className="flex-1 p-6">{children}</main>
        </div>

        <Footer />
      </div>
    </Providers>
  );
}
