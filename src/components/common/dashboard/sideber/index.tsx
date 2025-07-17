"use client"
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import Icon from '@/icon';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';



export default function Sidebar() {
    const pathname = usePathname()
    const [isExpanded, setIsExpanded] = useState(true)
    const navItems = [
        { icon: <Icon name="sdashboard" />, text: "Dashboard", href: "/dashboard" },
        { icon: <Icon name="svideos" />, text: "My videos", href: "/dashboard/my-videos" },
        { icon: <Icon name="sanalytics" />, text: "Analytics", href: "/dashboard/analytics" },
        { icon: <Icon name="ssetting" />, text: "Settings", href: "/dashboard/settings" },
        { icon: <Icon name="sreport" />, text: "Reports", href: "/dashboard/reports" }
    ]

    return (
        <div className="flex">

            <aside
                className={cn(
                    "flex flex-col h-full bg-white rounded-tr-md  transition-all duration-300 ease-in-out",
                    isExpanded ? "w-64" : "w-20",
                )}
            >
                <div className="flex flex-col ">
                    <div>
                        <div className="flex items-center justify-center my-4 text-white">
                            <Icon onClick={() => setIsExpanded(!isExpanded)} name="menu" width={25} height={25} className='cursor-pointer' />
                            {isExpanded && <Link href={"/"} className='ml-4'>
                                <div className="relative w-40 h-13 overflow-hidden">
                                    <Image
                                        src={assets.logo}
                                        alt={"author.name"}
                                        fill
                                        className="object-fill"
                                    />
                                </div>
                            </Link>}
                        </div>
                        <nav className="flex-1 py-2 mx-2 space-y-3">
                            {navItems.map((item: any, index) =>
                                <Link
                                    key={item.text}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-lg transition-colors",
                                        item.href === pathname && "bg-gray-100 font-semibold",
                                        isExpanded ? "justify-start" : "justify-center m-auto my-3 w-fit"
                                    )}
                                >
                                    {item.icon}
                                    {isExpanded && <span className="whitespace-nowrap font-normal">{item.text}</span>}
                                </Link>
                            )}

                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    );
}