"use client";
import { childrenProps } from "@/types";
import { LoginProvider } from "../common/login-provider";
import { SidebarControl } from "@/context/useSideber";
import { ConfirmDialogProvider } from "@/context/delete-modal";
import { SuccessDialogProvider } from "@/context/success-modal";
import { Provider } from "react-redux";
import { Toaster } from "../ui";
import { AuthProvider } from "@/context/auth";
import { store } from "@/redux/store";


export default function Providers({ children }: childrenProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ConfirmDialogProvider>
          <SuccessDialogProvider>
            <SidebarControl>
              <LoginProvider>{children}</LoginProvider>
            </SidebarControl>
          </SuccessDialogProvider>
        </ConfirmDialogProvider>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </Provider>
  );
}
