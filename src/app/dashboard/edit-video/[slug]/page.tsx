import EditVideo from "@/components/view/edit-video";
import { SlugParams } from "@/types";
import React from "react";

export default async function videoEdit({ params }: SlugParams) {
  const { slug } = await params;
  return <EditVideo slug={slug} />;
}
