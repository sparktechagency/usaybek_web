"use client";
import React, { useState, useEffect } from "react";
import Footer from "@/components/shared/footer";
import Navber from "@/components/shared/navber";
import { childrenProps } from "@/types";
import Sidebar from "@/components/common/sideber/sideber";
import { usePathname } from "next/navigation";
import HomeCarousel from "@/components/common/home-carousel";
import { useSidebar } from "@/context/useSideber";

export default function CommonLayout({ children }: childrenProps) {
  const { isExpanded} = useSidebar();
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  // Check the scroll position and update state
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ml = isExpanded ? "ml-[256px]" : "ml-[80px]";

  return (
    <div className="flex flex-col min-h-screen">
      {pathname !== "/" && <Navber />}
      {pathname === "/" && <HomeCarousel />}
      <div className="flex flex-1">
        <aside
          className={`${
            isSticky ? "fixed top-0 left-0 z-50" : "static"
          } transition-all duration-300`}
        >
          <Sidebar />
        </aside>
        <main className={`flex-1 p-6 ${isSticky && ml}`}>{children}</main>
      </div>
      <div className={isSticky ? ml : ""}>
        <Footer />
      </div>
     
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import Footer from "@/components/shared/footer";
// import Navber from "@/components/shared/navber";
// import { childrenProps } from "@/types";
// import Sidebar from "@/components/common/sideber/sideber";
// import { usePathname } from "next/navigation";
// import HomeCarousel from "@/components/common/home-carousel";


// export default function CommonLayout({ children }: childrenProps) {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col min-h-screen">
//       {pathname !== "/" && <Navber />}
//       {pathname === "/" && <HomeCarousel />}
//       <div className="flex">
//         <div
//           className={`sticky top-0 left-0 z-10 bg-white shadow-lg transition-all duration-300`}>
//           <Sidebar />
//         </div>
//         <main className={`flex-1 p-6 `}>{children}</main>
//       </div>
//       <Footer />
//     </div>
//   );
// }
