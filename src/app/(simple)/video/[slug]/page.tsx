import VideoDetails from "@/components/view/video-details";
import { SlugParams } from "@/types";

// Dummy dynamic data simulation

// export async function generateMetadata({ params:{ slug } }: ParamsProp): Promise<Metadata> {
//   const title = "Joe's Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL 60647, United States";
//   const description =
//     "orem ipsum dolor sit amet consectetur. Malesuada at pharetra convallis sociis a consectetur. In semper tortor felis gravida magna eu";
//   const image = "https://yourdomain.com/images/blog-1.jpg";
//   const url = `https://yourdomain.com/blogs/${slug}`;

//   return {
//     title: `${title} | Single Video`,
//     description,
//     alternates: {
//       canonical: url,
//     },
//     openGraph: {
//       type: "article",
//       title,
//       description,
//       url,
//       siteName: "MyTSV",
//       images: [
//         {
//           url: image,
//           height: 630,
//           alt: title,
//         },
//       ],
//       locale: "en_US",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//       site: "@MyTSV",
//       creator: "@MyTSV",
//     },
//     keywords: [
//       "best plumber near me",
//       "plumbing services",
//       "emergency plumber",
//       "MyTSV",
//       "find local plumber",
//     ],
//   };
// }

export default async function VideoSingle({ params }: SlugParams) {
  const { slug } = await params;
  return <VideoDetails slug={slug} />;
}
