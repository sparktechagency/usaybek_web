"use client"
import Image from 'next/image';
import assets from '@/assets';
import Link from 'next/link';
import Icon from '@/icon';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const pathname = usePathname()
    const navItems = [
        { icon: <Icon name="sdashboard" />, text: "Dashboard", href: "/dashboard" },
        { icon: <Icon name="svideos" />, text: "My videos", href: "/my-videos" },
        { icon: <Icon name="sanalytics" />, text: "Analytics", href: "/analytics" },
        { icon: <Icon name="ssetting" />, text: "Settings", href: "/settings" },
        { icon: <Icon name="sreport" />, text: "Reports", href: "/reports" }
    ]

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
                className={`absolute left-0 top-0 z-20 flex h-screen bg-white transition-transform pr-3  transform duration-300 ease-linear flex-col overflow-y-hidden  text-blacks w-[240px] lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col ">
                    <div>
                        <div className="flex items-center justify-center my-4 text-white">
                            <Link href={"/"}>
                                <div className="relative w-40 h-13 overflow-hidden mr-3">
                                    <Image
                                        src={assets.logo}
                                        alt={"author.name"}
                                        fill
                                        className="object-fill"
                                    />
                                </div>
                            </Link>
                        </div>
                        <nav className="flex-1 py-2 mx-2 space-y-3">
                            {navItems.map((item: any, index) =>
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors",
                                        item.href === pathname && "bg-gray-100 font-semibold",
                                    )}
                                >
                                    {item.icon}
                                    <span className="whitespace-nowrap font-normal">{item.text}</span>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </aside>
        </div>
    );
}