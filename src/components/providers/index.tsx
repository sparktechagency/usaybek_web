"use client";
import { childrenProps } from "@/types";
import { LoginProvider } from "../common/login-provider";

export default function Providers({ children }:childrenProps) {
  return (
    <LoginProvider>
        {children}
    </LoginProvider>
  );
}
