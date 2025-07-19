"use client";
import { childrenProps } from "@/types";
import { LoginProvider } from "../common/login-provider";
import { SidebarControl } from "@/context/useSideber";
import { ConfirmDialogProvider } from "@/context/delete-modal";

export default function Providers({ children }: childrenProps) {
  return (
    <ConfirmDialogProvider>
      <SidebarControl>
        <LoginProvider>
          {children}
        </LoginProvider>
      </SidebarControl>
    </ConfirmDialogProvider>


  );
}
