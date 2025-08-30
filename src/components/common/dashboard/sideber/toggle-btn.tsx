import React from "react";
import Icon from "@/icon";
import { useSidebarUser } from "@/app/dashboard/layout";
import { cn } from "@/lib";

export default function ToggleButton({ className }: { className?: string }) {
  const { sidebarOpen, setSidebarOpen } = useSidebarUser();
  return (
    <div className={cn(`block md:hidden`, className)}>
      <Icon
        onClick={() => setSidebarOpen(!sidebarOpen)}
        name="menu"
        width={25}
        height={25}
        className="cursor-pointer size-6"
      />
    </div>
  );
}
