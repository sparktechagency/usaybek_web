"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, signOutItems } from "./nav-data";
import { Separator } from "@/components/ui";
import { cn, getCookie} from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Img from "@/components/reuseable/img";
import Icon from "@/icon";
import { authKey } from "@/lib";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useHandleLogout } from "@/lib/logout";
import Modal from "@/components/reuseable/modal";
import TabList from "../upload/tab";
import PaymentBox from "../payment-box";

type SidebarFixedProps = {
  isSide: boolean;
  setIsSide: (val: boolean) => void;
};

export default function SidebarFixed({ isSide, setIsSide }: SidebarFixedProps) {
  const router=useRouter()
  const [isUpload, setIsUpload] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const logout = useHandleLogout();
  const [navItem, setIsNavItem] = useState<any>(signOutItems);
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

  // ✅ Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSide ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSide]);

  return (
    <div>
      {/* Overlay */}
      <div
        role="presentation"
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
          isSide ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSide(false)}
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        className={`fixed top-0 left-0 w-64 h-full bg-white z-30 shadow-lg transform transition-transform duration-300 ${
          isSide ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="">
          <div className={`flex items-center  p-4 h-20 justify-start`}>
            <button
              onClick={() => setIsSide(!isSide)}
              className="p-2 rounded-md cursor-pointer"
            >
              <Icon name="menu" width={25} height={25} />
            </button>
            <h1 className="ml-4 text-2xl font-semibold text-blacks">Menu</h1>
          </div>
          {/* sign in /sign out */}
          <div className="flex items-center gap-3 py-1 border mx-3  my-3  px-1  rounded-full transition-colors justify-start">
            {token && !isLoading ? (
              <>
                <Img
                  className="size-9 rounded-full"
                  src={avatar}
                  title="User avatar"
                ></Img>
                <span className="font-medium text-gray-800 whitespace-nowrap">
                  {name}
                </span>
              </>
            ) : (
              <>
                <Icon name="suser" width={36} height={36} />
                <span className="font-medium text-gray-800 whitespace-nowrap">
                  Sign in
                </span>
              </>
            )}
          </div>

          <nav className="flex-1 py-2 mx-2 space-y-3">
            {navItem.map((item: any, index:any) =>
              item.text === "separator" ? (
                <Separator key={`separator-${index}`} />
              ) : (
                <Link
                  key={item.text}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors justify-start",
                    item.href === pathname && "bg-gray-100 font-semibold"
                  )}
                  onClick={(e) => {
                    if (item.href === "/upload") {
                      e.preventDefault();
                      setIsUpload(true);
                    }
                  }}
                >
                  {item.icon}
                  <span className="whitespace-nowrap font-normal">
                    {item.text}
                  </span>
                </Link>
              )
            )}
            {token && !isLoading && (
              <div
                className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-red-500 justify-start`}
                onClick={()=>{
                  setIsSide(false)
                  router.push("/")
                  logout()
                }}
              >
                <Icon name="ssignout" />{" "}
                <span className="whitespace-nowrap font-normal">Sign out</span>
              </div>
            )}
          </nav>
        </div>
      </aside>

      {/* Upload Modal ======== */}
      <Modal
        open={isUpload}
        setIsOpen={setIsUpload}
        title="Upload a new video"
        titleStyle="text-center"
        className="sm:max-w-4xl"
      >
        <TabList setIsPayment={setIsPayment} />
      </Modal>

      {/* Payment Modal ======*/}
      <Modal
        title="Pay to MyTSV"
        open={isPayment}
        setIsOpen={setIsPayment}
        titleStyle="text-center"
        className="sm:max-w-3xl"
      >
        <PaymentBox setIsPayment={setIsPayment} />
      </Modal>
    </div>
  );
}
