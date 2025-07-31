"use client";
import { Button } from "@/components/ui";
import { Search } from "lucide-react";
import Image from "next/image";
import { useLogin } from "@/components/common/login-provider";
import { PlaceholderImg } from "@/lib/utils";
import Img from "@/components/reuseable/img";
import Link from "next/link";
import assets from "@/assets";
import { usePathname } from "next/navigation";
import FavIcon from "@/icon/admin/favIcon";
import { useState } from "react";
import SidebarFixed from "@/components/common/sideber/sideber-fixed";

export default function Navber() {
  // const headerRef = useRef<HTMLDivElement>(null);
  const [isSide, setIsSide] = useState(false);
  const { login, setIsLogin } = useLogin();
  const path = usePathname();
  const patterns = [/^\/video\/.+/, /^\/profile$/];
  const isMenu = patterns.some((regex) => regex.test(path));

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
          <div className="flex items-center  rounded-full bg-[white] px-2 shadow  w-full md:max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="Service"
              className="flex-1 h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base"
              aria-label="Service search input"
            />
            <div />
            <input
              type="text"
              placeholder="Location"
              className="flex-1 h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base border-l-[1px] border-[#A0A0A0]"
              aria-label="Location search input"
            />
            <Button
              onClick={() => setIsLogin(!login)}
              variant={"primary"}
              className="w-[120px] px-0  h-11 my-1 rounded-full has-[>svg]:px-0"
            >
              <Search className="w-5 h-5" />
              Search
            </Button>
          </div>
        </li>
        <li>
          {login ? (
            <Link href={"/profile"}>
              <Button
                variant={"primary"}
                className="h-12 pl-2 pr-4 rounded-full"
              >
                <Img
                  src={PlaceholderImg(100, 100)}
                  className="size-10"
                  title="img"
                />
                Md Julfiker Islam
              </Button>
            </Link>
          ) : (
            <Button variant={"primary"} className="h-12 px-4 rounded-full">
              Sign in to your Account
            </Button>
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
