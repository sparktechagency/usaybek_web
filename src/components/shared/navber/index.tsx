"use client";
import { Button } from "@/components/ui";
import Image from "next/image";
import Img from "@/components/reuseable/img";
import Link from "next/link";
import assets from "@/assets";
import { usePathname } from "next/navigation";
import FavIcon from "@/icon/admin/favIcon";
import { useState } from "react";
import SidebarFixed from "@/components/common/sideber/sideber-fixed";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { authKey, getCookie } from "@/lib";
import NavberSearchBox from "@/components/common/navber-search-box";

export default function Navber() {
  // const headerRef = useRef<HTMLDivElement>(null);
  const [isSide, setIsSide] = useState(false);
  const path = usePathname();
  const patterns = [/^\/video\/.+/, /^\/profile$/];
  const isMenu = patterns.some((regex) => regex.test(path));
  const token = getCookie(authKey);
  const { data: profileData, isLoading } = useGetProfileQuery(
    {},
    {
      refetchOnFocus: true,
      skip: !token,
    }
  );

  // console.log(login)

  // useEffect(() => {
  //     const el = headerRef.current;
  //     const onScroll = () => el?.classList.toggle('navber-box-shadow', window.scrollY > 0);
  //     window.addEventListener('scroll', onScroll);
  //     return () => window.removeEventListener('scroll', onScroll);
  // }, []);
  // ref={headerRef}

  return (
    <div className="container">
      <ul className="relative  flex items-center  justify-between py-8">
        <li className="flex space-x-5 items-center">
          {isMenu && (
            <span onClick={() => setIsSide(!isSide)}>
              <FavIcon name="menu" className="size-6 cursor-pointer" />
            </span>
          )}
          <Link href={"/"}>
            <Image
              src={assets.logo}
              alt="MYTSV Logo"
              width={160}
              height={160}
              className="object-contain"
            />
          </Link>
        </li>
        <li className="hidden md:block">
          <NavberSearchBox />
        </li>
        <li>
          {token && !isLoading ? (
            <Link href={"/profile"}>
              <Button
                variant={"primary"}
                className="h-12 pl-2 pr-4 rounded-full"
              >
                <Img
                  src={profileData?.data?.avatar}
                  className="size-10"
                  title="img"
                />
                {profileData?.data?.name}
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button variant={"primary"} className="h-12 px-4 rounded-full">
                Sign in to your Account
              </Button>
            </Link>
          )}
        </li>
      </ul>
      <style jsx global>{`
        .navber-box-shadow {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 99999;
          background-color: #f6f6f6;
          animation: navber_animation 1s;
        }

        @keyframes navber_animation {
          from {
            top: -40px;
          }
          to {
            top: 0px;
          }
        }
      `}</style>

      {/* navber fixed */}
      <SidebarFixed isSide={isSide} setIsSide={setIsSide} />
    </div>
  );
}
