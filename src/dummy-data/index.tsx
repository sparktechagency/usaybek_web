import assets from "@/assets";

//  ViewItem
export const ViewItem = [
  {
    label: "Views",
    value: 22568,
    icon: assets.dashboard.views,
  },
  {
    label: "Videos",
    value: 40,
    icon: assets.dashboard.videos,
  },
  {
    label: "Likes",
    value: 17256,
    icon: assets.dashboard.likes,
  },
];

export const videoFilterItem = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "promoted",
    label: "Promoted",
  },
];

// serviceItem
export const serviceItem = [
  "Haircuts & Trims",
  "Hair Styling",
  "Hair Coloring",
  "Hair Treatments",
  "Chemical Services",
];

export const TakeOptions = [
  { label: "Suspend for 7 days", value: "Suspend for 7 days" },
  { label: "Suspend for 30 days", value: "Suspend for 30 days" },
  { label: "Give a warning", value: "Give a warning" },
  { label: "Suspend permanently", value: "Suspend permanently" },
];

export const contractService = [
  {
    title: "Professional Video Production",
    description:
      "A high-quality video tailored to showcase your business's unique value",
    icon: assets.contract.youtube,
  },
  {
    title: "Custom Press Release",
    description:
      "Expertly written news copy ready to be distributed to major outlets",
    icon: assets.contract.release,
  },
  {
    title: "Dedicated MyTSV Channel",
    description: "Your own branded space on mytsv.com featuring your video",
    icon: assets.contract.channel,
  },
  {
    title: "30-Day Featured Promotion",
    description:
      "High-visibility placement on our platform to drive immediate traffic",
    icon: assets.contract.promotion,
  },
];

export const processItem = [
  {
    title: "Sign & secure",
    description: "Review the terms and complete your payment below",
    icon: assets.contract.sign,
    width: 231,
  },
  {
    title: "Onboarding",
    description: "Fill out our brief questionnaire so we can get your details",
    icon: assets.contract.onboarding,
    width: 280,
  },
  {
    title: "Launch",
    description: "We produce your assets and go live within 30 business days",
    icon: assets.contract.launch,
    width: 280,
  },
];
