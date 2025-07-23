"use client";
import { childrenProps } from "@/types";
import { LoginProvider } from "../common/login-provider";
import { SidebarControl } from "@/context/useSideber";
import { ConfirmDialogProvider } from "@/context/delete-modal";
import { SuccessDialogProvider } from "@/context/success-modal";

export default function Providers({ children }: childrenProps) {
  return (
    <ConfirmDialogProvider>
      <SuccessDialogProvider>
        <SidebarControl>
          <LoginProvider>
            {children}
          </LoginProvider>
        </SidebarControl>
      </SuccessDialogProvider>
    </ConfirmDialogProvider>
  );
}
