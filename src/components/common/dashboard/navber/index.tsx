import { Menu } from "lucide-react";
import { SidebarProps } from "../sideber";


export default function Navber({ sidebarOpen, setSidebarOpen }:SidebarProps) {
  return (
    <div className="sticky top-0  flex w-full bg-[white] py-3 z-10 shadow-xs">
      <header className="w-full px-3">
      <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
              className="z-99999 block  border rounded-md border-stroke cursor-pointer  p-1.5 lg:hidden"
            >
              <Menu className="cursor-pointer" size={20} />
            </button>
      </header>
    </div>
  );
}