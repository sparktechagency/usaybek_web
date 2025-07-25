
  
 
 
 
 export const adminLinks = [
    {
      label: "Dashboard",
      icon:"dashboard",
      to: "/admin",
    },
    {
      label: "Channels",
      icon:"channels",
      to: "/admin/channels",
    },
    {
      label: "Sales representatives",
      icon: "sales",
      to: "/admin/sales-representatives",
    },
    {
      label: "Pricings",
      icon: "pricing",
      to: "/admin/pricings",
    },
    {
      label: "Transactions",
      icon:"transaction",
      to: "/admin/transactions",
    },
    {
      label: "Promotional banners",
      icon:"promotional",
      to: "/admin/promotional-banners",
    },
    {
      label: "Manage category",
      icon: "manage",
      to: "/admin/manage-category",
    },
    {
      label: "Manage blogs",
      icon: "blog",
      to: "/admin/manage-blogs",
    },
    {
      label: "Seo management",
      icon: "seo",
      to: "/admin/seo-management",
    },
    {
      label: "Reports",
      icon: "report",
      to: "/admin/reports",
    },
    {
      label: "Settings",
      icon:"setting",
      submenu: [
        { to: "/admin/setting/change-password", icon:"key", label: "Change Password" },
        { to: "/admin/setting/about-us", icon:"about", label: "About us" },
        { to: "/admin/setting/terms", icon:"terms", label: "Terms & Conditions" },
        { to: "/admin/setting/fqa", icon:"fqa", label: "FAQ" },
        { to: "/admin/setting/contacts", icon:"contacts", label: "Contacts" },
      ],
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

