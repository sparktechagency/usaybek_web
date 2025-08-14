"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// import Analytics from "@/components/common/dashboard/video-tab/analytics";
import Comments from "@/components/common/dashboard/video-tab/comments";
import Details from "@/components/common/dashboard/video-tab/details";

export default function VideoDetailsBox({ slug }: any) {
  const [isTab, setIsTab] = useState("details");
  const searchParams = useSearchParams();
  const active = searchParams.get("tab");

  useEffect(() => {
    if (active) setIsTab(active);
  }, [active]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isTab === "details" && (
        <Details slug={slug} isTab={isTab} setIsTab={setIsTab} />
      )}
      {isTab === "comments" && <Comments isTab={isTab} setIsTab={setIsTab} />}
      {isTab === "analytics" &&
        "<Analytics isTab={isTab} setIsTab={setIsTab} />"}
    </Suspense>
  );
}
