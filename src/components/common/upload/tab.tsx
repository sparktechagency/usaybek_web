"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Youtube } from "lucide-react";
import UplaodVideo from "./video";
import YoutubeLink from "./youtube";

const tabs = [
  { id: "video", label: "Upload Video", Icon: Upload },
  { id: "link", label: "YouTube Link", Icon: Youtube },
];

export default function TabList({ setIsPayment }: any) {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="p-2">
      <div className="flex space-x-4 mb-6 border p-1 rounded-full">
        {tabs.map(({ id, label, Icon }) => (
          <Button
            key={id}
            variant="out"
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 px-6 text-base border-none rounded-full font-medium transition-colors ${
              activeTab === id && "bg-reds !text-white"
            }`}
          >
            <Icon className="mr-2 size-5" />
            {label}
          </Button>
        ))}
      </div>

      {activeTab === "video" ? (
        <UplaodVideo type={activeTab} setIsPayment={setIsPayment} />
      ) : (
        <YoutubeLink type={activeTab}  setIsPayment={setIsPayment} />
      )}
    </div>
  );
}
