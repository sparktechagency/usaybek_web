import Icon from "@/icon";

export const navItems = [
    {
        icon: <Icon name="supload" />,
        text: "Upload your video",
        href: "/upload",
    },
    { icon: <Icon name="ssetting" />, text: "Settings", href: "/dashboard" },
    { icon: <Icon name="svideos" />, text: "My videos", href: "/dashboard/my-videos" },
    { text: "separator" },
    { icon: <Icon name="shome" />, text: "Home", href: "/", active: true },
    { icon: <Icon name="sblog" />, text: "Blogs", href: "/blogs" },
    {
        icon: <Icon name="spromotion" />,
        text: "Promotions",
        href: "/promotions",
    },
    { icon: <Icon name="sfqa" />, text: "FAQ", href: "/faq" },
    { icon: <Icon name="sabout" />, text: "About us", href: "/about-us" },
    { icon: <Icon name="scontact" />, text: "Contact us", href: "/contact-us" },
    {
        icon: <Icon name="strams" />,
        text: "Terms & Conditions",
        href: "/terms",
    },
    { text: "separator" },
    { icon: <Icon name="slikeup" />, text: "Liked videos", href: "/like-videos" },
    { icon: <Icon name="shistory" />, text: "History", href: "/history" },
];

//signOutItems
export const signOutItems = [
    { icon: <Icon name="shome" />, text: "Home", href: "/" },
    { icon: <Icon name="sblog" />, text: "Blogs", href: "/blogs" },
    {
        icon: <Icon name="spromotion" />,
        text: "Promotions",
        href: "/promotions",
    },
    {
        icon: <Icon name="sonSide" />,
        text: "Onsite account creation",
        href: "/onside-account",
    },
];