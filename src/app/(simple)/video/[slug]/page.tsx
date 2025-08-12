import VideoDetails from "@/components/view/video-details";
import { authKey } from "@/lib";
import { SlugParams } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";


export async function generateMetadata({
  params,
}: SlugParams): Promise<Metadata> {
  const { slug} = await params;
  const tokon = (await cookies()).get(authKey)?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/${slug}`, {
    headers: { Authorization: `Bearer ${tokon}` },
    cache: "force-cache",
  });
  const data = await res.json();
  const {title,description,thumbnail:image,video}=data?.data || {}
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/video/${slug}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 800, height: 600, alt: title }],
      videos: video
        ? [
            {
              url: video,
              width: 1920,
              height: 1080,
              type: "video/*"
            },
          ]
        : undefined,
      type: "website",
      siteName: "MY TSV",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
  };
}

export default async function VideoSingle({ params }: SlugParams) {
  const { slug } = await params;
  return <VideoDetails slug={slug} />;
}
