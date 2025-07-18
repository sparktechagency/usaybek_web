"use client";
import { SidebarControl } from "@/context/useSideber";
import { childrenProps } from "@/types";

export default function Providers({ children }: childrenProps) {
  return <SidebarControl>{children}</SidebarControl>;
}
