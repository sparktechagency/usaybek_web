"use client";
import { childrenProps } from "@/types";
import { LoginProvider } from "../common/login-provider";
import { SidebarControl } from "@/context/useSideber";
import { ConfirmDialogProvider } from "@/context/delete-modal";
import { SuccessDialogProvider } from "@/context/success-modal";
import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";

export default function Providers({ children }: childrenProps) {
  const store = makeStore();
  return (
    <Provider store={store}>
      <ConfirmDialogProvider>
        <SuccessDialogProvider>
          <SidebarControl>
            <LoginProvider>{children}</LoginProvider>
          </SidebarControl>
        </SuccessDialogProvider>
      </ConfirmDialogProvider>
    </Provider>
  );
}
