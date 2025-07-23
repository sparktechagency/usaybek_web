"use client";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "./nav-data";
import { Separator } from "@/components/ui";
import { useLogin } from "../login-provider";
import { cn, PlaceholderImg } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Img from "@/components/reuseable/img";
import Icon from "@/icon";


type SidebarFixedProps = {
    isSide: boolean;
    setIsSide: (val: boolean) => void;
};

export default function SidebarFixed({ isSide, setIsSide }: SidebarFixedProps) {
    const pathname = usePathname();
    const { login } = useLogin();
    return (
        <div>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${isSide ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsSide(false)}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 w-64 h-full bg-white z-30 shadow-lg transform transition-transform duration-300 ${isSide ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="">
                    <div
                        className={`flex items-center  p-4 h-20 justify-start`}
                    >
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
                        {login ? (
                            <>
                                <Img
                                    className="size-9 rounded-full"
                                    src={PlaceholderImg()}
                                    title="User avatar"
                                ></Img>
                                <span className="font-medium text-gray-800 whitespace-nowrap">
                                    Md. Julfiker Islam
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
                        {navItems.map((item: any, index) =>
                            item.text === "separator" ? (
                                <Separator key={`separator-${index}`} />
                            ) : (
                                <Link
                                    key={item.text}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors justify-start",
                                        item.href === pathname && "bg-gray-100 font-semibold",
                                    )}
                                >
                                    {item.icon}
                                    <span className="whitespace-nowrap font-normal">
                                        {item.text}
                                    </span>
                                </Link>
                            )
                        )}
                        {login && (
                            <Link
                                className={`flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-red-500 justify-start`}
                                href={"/"}
                            >
                                <Icon name="ssignout" />{" "}
                                <span className="whitespace-nowrap font-normal">
                                    {"Sign out"}
                                </span>
                            </Link>
                        )}
                    </nav>
                </div>
            </aside>
        </div>
    );
}
