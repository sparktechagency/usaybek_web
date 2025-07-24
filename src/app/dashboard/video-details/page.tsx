"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Analytics from "@/components/common/dashboard/video-tab/analytics";
import Comments from "@/components/common/dashboard/video-tab/comments";
import Details from "@/components/common/dashboard/video-tab/details";

function VideoTabContent() {
  const [isTab, setIsTab] = useState("details");
  const searchParams = useSearchParams();
  const active = searchParams.get("tab");

  useEffect(() => {
    if (active) setIsTab(active);
  }, [active]);

  if (isTab === "analytics") return <Analytics isTab={isTab} setIsTab={setIsTab} />;
  if (isTab === "comments") return <Comments isTab={isTab} setIsTab={setIsTab} />;
  return <Details isTab={isTab} setIsTab={setIsTab} />;
}

export default function VideoDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoTabContent />
    </Suspense>
  );
}

