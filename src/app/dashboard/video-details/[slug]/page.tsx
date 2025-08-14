import VideoDetailsBox from "@/components/common/dashboard/video-tab";
import { SlugParams } from "@/types";


export default async function VideoDetails({ params }: SlugParams) {
   const { slug } = await params;
  return (
    <VideoDetailsBox slug={slug} />

  );
}

