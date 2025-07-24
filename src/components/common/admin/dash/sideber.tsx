"use client";
import Image from "next/image";
import React from "react";
import NavItem from "./navitem";
import assets from "@/assets";
import { adminLinks } from "./navdata";


interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const links =  adminLinks

    return (
        <div className="flex">
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 opacity-50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`absolute left-0 top-0 z-20 bg-reds flex h-screen  transition-transform transform duration-300 ease-linear flex-col overflow-y-hidden  text-white w-[240px] lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col">
                    <div>
                        <div className="flex items-center justify-center bg-white m-2 rounded-md py-1">
                            <Image
                                className=""
                                src={assets.logo}
                                alt="logo"

                            />
                        </div>
                        <nav>
                            <NavItem item={links} />
                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    );
}
