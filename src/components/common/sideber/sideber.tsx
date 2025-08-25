"use client";
import { cn, getCookie } from "@/lib/utils";
import { Separator } from "@/components/ui";
import Img from "@/components/reuseable/img";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Icon from "@/icon";
import { useSidebar } from "@/context/useSideber";
import { navItems, signOutItems } from "./nav-data";
import { useEffect, useState } from "react";
import Modal from "@/components/reuseable/modal";
import TabList from "../upload/tab";
import PaymentBox from "../payment-box";
import { authKey } from "@/lib";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useHandleLogout } from "@/lib/logout";

export default function Sidebar() {
  const logout = useHandleLogout();
  const [navItem, setIsNavItem] = useState<any>(signOutItems);
  const [isUpload, setIsUpload] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const { isExpanded, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const token = getCookie(authKey);
  const { data: profileData, isLoading } = useGetProfileQuery(
    {},
    { refetchOnFocus: true, skip: !token }
  );
  const { name, avatar } = profileData?.data || {};

  useEffect(() => {
    if (token && !isLoading) {
      setIsNavItem(navItems);
    } else {
      setIsNavItem(signOutItems);
    }
  }, [token, isLoading]);

  useEffect(() => {
    setIsUpload(false);
  }, [isPayment]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full bg-white rounded-tr-md transition-all duration-300 ease-in-out",
          isExpanded ? "w-sideber-md" : "w-sideber-xs"
        )}
      >
        <SidebarHeader isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <UserProfile
          token={token}
          isLoading={isLoading}
          name={name}
          avatar={avatar}
          isExpanded={isExpanded}
        />
        <NavigationLinks
          navItem={navItem}
          pathname={pathname}
          isExpanded={isExpanded}
          setIsUpload={setIsUpload}
          logout={logout}
        />
      </div>

      {/* Upload Modal */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a new video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsPayment={setIsPayment} />
      </Modal>

      {/* Payment Modal */}
      <Modal
        title="Pay to MyTSV"
        open={isPayment}
        setIsOpen={setIsPayment}
        titleStyle="text-center"
        className="sm:max-w-3xl"
      >
        <PaymentBox setIsPayment={setIsPayment} />
      </Modal>
    </>
  );
}

const SidebarHeader = ({ isExpanded, toggleSidebar }: any) => (
  <div
    className={`flex items-center p-4 h-20 ${
      isExpanded ? "justify-start" : "justify-center"
    }`}
  >
    <button onClick={toggleSidebar} className="p-2 rounded-md cursor-pointer">
      <Icon name="menu" width={22} height={22} />
    </button>
    {isExpanded && (
      <h1 className="ml-3 text-xl font-semibold text-blacks">Menu</h1>
    )}
  </div>
);

const UserProfile = ({ token, isLoading, name, avatar, isExpanded }: any) => (
  <div className="p-4">
    <div
      className={cn(
        "flex items-center gap-3 py-1  px-1  rounded-full transition-colors",
        isExpanded ? "justify-start border" : "justify-center"
      )}
    >
      {token && !isLoading ? (
        <>
          <Img className="size-10 rounded-full" src={avatar} title={name}></Img>
          {isExpanded && (
            <span className="font-medium text-gray-800 whitespace-nowrap">
              {name}
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
);

const NavigationLinks = ({
  navItem,
  pathname,
  isExpanded,
  setIsUpload,
  logout,
}: any) => (
  <nav className="flex-1 py-2 mx-2 space-y-3">
    {navItem?.map((item: any, index: any) =>
      item.text === "separator" ? (
        <Separator key={`separator-${index}`} />
      ) : (
        <Link
          key={item.text}
          href={item.href}
          className={cn(
            `flex items-center gap-3 text-blacks hover:bg-gray-100 rounded-full transition-colors`,
            item.href === pathname && "bg-gray-100 font-semibold",
            isExpanded
              ? "justify-start px-3 py-2"
              : "justify-center m-auto my-3 size-10"
          )}
          onClick={(e) => {
            if (item.href === "/upload") {
              e.preventDefault();
              setIsUpload(true);
            }
          }}
        >
          {item.icon}
          {isExpanded && (
            <span className="whitespace-nowrap font-normal">{item.text}</span>
          )}
        </Link>
      )
    )}
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-full hover:bg-gray-100 transition-colors text-red-500 ${
        isExpanded
          ? "justify-start px-3 py-2"
          : "justify-center m-auto my-3 size-10"
      }`}
      onClick={logout}
    >
      <Icon name="ssignout" />
      {isExpanded && (
        <span className="whitespace-nowrap font-normal">Sign out</span>
      )}
    </div>
  </nav>
);
