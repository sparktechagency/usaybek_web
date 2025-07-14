"use client"
import { useState } from "react"
import Link from "next/link"
import { cn, PlaceholderImg } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage, Separator } from "@/components/ui"
import {
  Menu,
  Upload,
  Settings,
  Play,
  Home,
  Book,
  Megaphone,
  HelpCircle,
  Info,
  Contact,
  ClipboardList,
  ThumbsUp,
  History,
  LogOut,
  Globe,
  CircleUserRound,
} from "lucide-react"
import { useLogin } from "../login-provider"
import Img from "@/components/reuseable/img"

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { login } = useLogin()

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  const navItems = [
    { icon: Upload, text: "Upload your video", href: "/upload" },
    { icon: Settings, text: "Settings", href: "/settings" },
    { icon: Play, text: "My videos", href: "/my-videos" },
    { text: "separator" },
    { icon: Home, text: "Home", href: "/home", active: true },
    { icon: Book, text: "Blogs", href: "/blogs" },
    { icon: Megaphone, text: "Promotions", href: "/promotions" },
    { icon: HelpCircle, text: "FAQ", href: "/faq" },
    { icon: Info, text: "About us", href: "/about" },
    { icon: Contact, text: "Contact us", href: "/contact" },
    { icon: ClipboardList, text: "Terms & Conditions", href: "/terms" },
    { text: "separator" },
    { icon: ThumbsUp, text: "Liked videos", href: "/liked" },
    { icon: History, text: "History", href: "/history" },
  ]

  const signOutItems = [
    { icon: Home, text: "Home", href: "/home" },
    { icon: Book, text: "Blogs", href: "/blogs" },
    { icon: Megaphone, text: "Promotions", href: "/promotions" },
    { icon: Globe, text: "Onsite account creation", href: "/promotions" }
  ]

  const Items = login ? navItems : signOutItems

  return (
    <div
      className={cn(
        "flex flex-col h-fit bg-white transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20",
      )}
    >
      {/* Header */}
      <div className="flex items-center p-4 h-20">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md cursor-pointer"
        >
          <Menu className="h-6 w-6 text-blacks" />
        </button>
        {isExpanded && <h1 className="ml-4 text-xl font-semibold text-gray-800">Menu</h1>}
      </div>

      {/* User Profile */}
      <div className="p-4">
        <div
          className={cn(
            "flex items-center gap-3 py-1  px-1  rounded-full transition-colors",
            isExpanded ? "justify-start border" : "justify-center",
          )}
        >
          {login ? (<>
            <Img className="size-9 rounded-full" src={PlaceholderImg()} title="User avatar" ></Img>
            {isExpanded && <span className="font-medium text-gray-800 whitespace-nowrap">Md. Julfiker Islam</span>}
          </>) : (<>
            <h1 className="size-9 rounded-full"><CircleUserRound className="size-9 text-[#535353]/80" /></h1>
            {isExpanded && <span className="font-medium text-gray-800 whitespace-nowrap">Sign in</span>}
          </>)}



        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-2 mx-2 space-y-2">
        {Items.map((item: any, index) =>
          item.text === "separator" ? (
            <Separator key={`separator-${index}`} />
          ) : (
            <Link
              key={item.text}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors",
                item.active && "bg-gray-100 font-semibold",
                isExpanded ? "justify-start" : "justify-center m-auto my-3 w-fit"
              )}
            >
              <item.icon className="h-5 w-fit text-blacks" />
              {isExpanded && <span className="whitespace-nowrap font-normal">{item.text}</span>}
            </Link>
          )
        )}
        {login && (<Link className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors text-red-500" href={"/"}>
          <LogOut className="h-5 w-fit text-blacks" />Sign out</Link>)}
      </nav>
      {/* <nav className="flex-1 py-2 mx-2 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.text}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-blacks hover:bg-gray-100 rounded-full transition-colors",
              item.active && "bg-gray-100 font-semibold",
              isExpanded ? "justify-start" : "justify-center m-auto my-3 w-fit ",
            )}
          >
            <item.icon className="h-5 w-fit text-blacks" />
            {isExpanded && <span className="whitespace-nowrap font-normal">{item.text}</span>}
          </Link>
        ))}
      </nav> */}

    </div>
  )
}
