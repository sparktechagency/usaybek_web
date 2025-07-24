import {
    LayoutDashboard,
    Layers,
    Users,
    Tags,
    Receipt,
    Image,
    FolderTree,
    FileText,
    Search,
    BarChart2,
    Settings,
  } from "lucide-react";
  
  export const adminLinks = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/admin",
    },
    {
      label: "Channels",
      icon: Layers,
      to: "/admin/channels",
    },
    {
      label: "Sales representatives",
      icon: Users,
      to: "/admin/sales-representatives",
    },
    {
      label: "Pricings",
      icon: Tags,
      to: "/admin/pricings",
    },
    {
      label: "Transactions",
      icon: Receipt,
      to: "/admin/transactions",
    },
    {
      label: "Promotional banners",
      icon: Image,
      to: "/admin/promotional-banners",
    },
    {
      label: "Manage category",
      icon: FolderTree,
      to: "/admin/manage-category",
    },
    {
      label: "Manage blogs",
      icon: FileText,
      to: "/admin/manage-blogs",
    },
    {
      label: "Seo management",
      icon: Search,
      to: "/admin/seo-management",
    },
    {
      label: "Reports",
      icon: BarChart2,
      to: "/admin/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      to: "/admin/settings",
    },
  ];
  

//   export const adminLinks = [
//     { to: "/company", icon: LayoutDashboard, label: "Dashboard" },
//     { to: "/company/settings", icon: Dock, label: "Company Settings" },
//     { to: "/company/providers", icon: House, label: "Service providers" },
//     { to: "/company/bookings", icon: Dock, label: "Bookings" },
//     { to: "/company/chats", icon: MessageSquare, label: "Chats" },
//     { to: "/company/feedbacks", icon: ThumbsUp, label: "Feedbacks" },
//     {
//       icon: Settings,
//       label: "Settings",
//       submenu: [
//         { to: "/company/change-password", icon: KeyRound, label: "Change Password" },
//       ],
//     },
//   ];

