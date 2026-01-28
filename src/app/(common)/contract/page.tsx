import ContractView from "@/components/view/contract/page";
import { Seo } from "@/lib";
import React from "react";

export const metadata = Seo({
  title: "Your Business, Elevated- All-in-One Digital Presence & PR Package",
  description:
    "Transform your brand with our comprehensive digital presence and PR services. From impactful website design to strategic public relations, we empower your business to stand out. Our all-in-one package ensures your business reaches its full potential, both online and in the media",
  url: "/contract",
  image: "/images/contract/contract_r.png",
});

export default function Contract() {
  return (
    <div className="m-auto lg:px-28">
      <ContractView />
    </div>
  );
}
