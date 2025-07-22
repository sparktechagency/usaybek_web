"use client";
import { cn, PlaceholderImg } from "@/lib/utils";
import { Separator } from "@/components/ui";
import { useLogin } from "../login-provider";
import Img from "@/components/reuseable/img";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";
import Icon from "@/icon";
import { useSidebar } from "@/context/useSideber";

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { login } = useLogin();

  const navItems = [
    {
      icon: <Icon name="supload" />,
      text: "Upload your video",
      href: "/upload",
    },
    { icon: <Icon name="ssetting" />, text: "Settings", href: "/dashboard" },
    { icon: <Icon name="svideos" />, text: "My videos", href: "/dashboard/my-videos" },
    { text: "separator" },
    { icon: <Icon name="shome" />, text: "Home", href: "/", active: true },
    { icon: <Icon name="sblog" />, text: "Blogs", href: "/blogs" },
    {
      icon: <Icon name="spromotion" />,
      text: "Promotions",
      href: "/promotions",
    },
    { icon: <Icon name="sfqa" />, text: "FAQ", href: "/faq" },
    { icon: <Icon name="sabout" />, text: "About us", href: "/about-us" },
    { icon: <Icon name="scontact" />, text: "Contact us", href: "/contact-us" },
    {
      icon: <Icon name="strams" />,
      text: "Terms & Conditions",
      href: "/terms",
    },
    { text: "separator" },
    { icon: <Icon name="slikeup" />, text: "Liked videos", href: "/like-videos" },
    { icon: <Icon name="shistory" />, text: "History", href: "/history" },
  ];

  const signOutItems = [
    { icon: <Icon name="shome" />, text: "Home", href: "/" },
    { icon: <Icon name="sblog" />, text: "Blogs", href: "/blogs" },
    {
      icon: <Icon name="spromotion" />,
      text: "Promotions",
      href: "/promotions",
    },
    {
      icon: <Icon name="sonSide" />,
      text: "Onsite account creation",
      href: "/promotions",
    },
  ];

  const Items = login ? navItems : signOutItems;

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white rounded-tr-md  transition-all duration-300 ease-in-out",
        isExpanded ? "w-sideber-md" : "w-sideber-xs"
      )}
    >
      {/* Header */}
      <div
        className={`flex items-center  p-4 h-20 ${
          isExpanded ? "justify-start" : "justify-center"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md cursor-pointer"
        >
          <Menu className="h-6 w-6 text-blacks" />
        </button>
        {isExpanded && (
          <h1 className="ml-4 text-xl font-semibold text-gray-800">Menu</h1>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-3 py-1  px-1  rounded-full transition-colors",
            isExpanded ? "justify-start border" : "justify-center"
          )}
        >
          {login ? (
            <>
              <Img
                className="size-9 rounded-full"
                src={PlaceholderImg()}
                title="User avatar"
              ></Img>
              {isExpanded && (
                <span className="font-medium text-gray-800 whitespace-nowrap">
                  Md. Julfiker Islam
                </span>
              )}
            </>
          ) : (
            <>
              <Icon name="suser" width={36} height={36} />
              {isExpanded && (
                <span className="font-medium text-gray-800 whitespace-nowrap">
                  Sign in
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-2 mx-2 space-y-3">
        {Items.map((item: any, index) =>
          item.text === "separator" ? (
            <Separator key={`separator-${index}`} />
          ) : (
            <Link
              key={item.text}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors",
                item.href === pathname && "bg-gray-100 font-semibold",
                isExpanded
                  ? "justify-start"
                  : "justify-center m-auto my-3 w-fit"
              )}
            >
              {item.icon}
              {isExpanded && (
                <span className="whitespace-nowrap font-normal">
                  {item.text}
                </span>
              )}
            </Link>
          )
        )}
        {login && (
          <Link
            className={`flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-red-500 ${
              isExpanded ? "justify-start" : "justify-center m-auto my-3 w-fit"
            }`}
            href={"/"}
          >
            <Icon name="ssignout" />{" "}
            {isExpanded && (
              <span className="whitespace-nowrap font-normal">
                {"Sign out"}
              </span>
            )}
          </Link>
        )}
      </nav>
    </div>
  );
}
