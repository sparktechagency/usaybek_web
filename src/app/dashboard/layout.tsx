import { UserDashboardLayout } from "@/components/common/dashboard/userlayout";
import { childrenProps } from "@/types";
import React from "react";

export default function UserLayout({ children }: childrenProps) {
  return (
  <UserDashboardLayout>
    {children}
  </UserDashboardLayout>
);
}
