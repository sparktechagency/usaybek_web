import { IdParams } from "@/types";
import SingleBlog from "@/components/view/single-blog";


export async function generateMetadata({ params }: IdParams): Promise<any> {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
    cache: "no-cache",
  });

  const data = await res.json();
  const { title, description: text, image } = data?.data || {};
  const description = text?.replace(/<[^>]+>/g, "")
    ?.replace(/\s+/g, " ")
    ?.trim();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const url = `${baseUrl}/blogs/${id}`;

  // 🔹 Convert title to tags (split by spaces or commas)
  const tags = title
    .split(/[,\s]+/)
    .filter((word: string) => word.length > 2)
    .map((word: string) => word.toLowerCase());

  return {
    title,
    keywords: tags.join(", "),
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 800, height: 600, alt: title }],
      type: "website",
      siteName: "MY TSV",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
  };
}

export default async function Blog({ params }: IdParams) {
  const { id } = await params;

  return <SingleBlog id={id} />;
}
