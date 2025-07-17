import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceholderImg } from "@/lib/utils";
import { ParamsProps } from "@/types"; 
import { BackBtn } from "@/components/reuseable/icon-list";
import Link from "next/link";
import { Metadata } from "next";



export async function generateMetadata({ params: { id } }: ParamsProps): Promise<Metadata> {
  console.log(id)
  const title = "Best Plumber Near Me: Find Trusted Plumbing Services with MyTSV.com";
  const description =
    "Need a reliable plumber fast? Discover how MyTSV.com helps you find local, trusted plumbing professionals with real videos and reviews.";
  const image = "https://yourdomain.com/images/blog-1.jpg";
  const url = `https://yourdomain.com/blogs/$`;

  return {
    title: `${title} | MyTSV Blog`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article", 
      title,
      description,
      url,
      siteName: "MyTSV",
      images: [
        {
          url: image,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US", 
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      site: "@MyTSV",      
      creator: "@MyTSV",  
    },
    keywords: [
      "best plumber near me",
      "plumbing services",
      "emergency plumber",
      "MyTSV",
      "find local plumber",
    ],
  };
}




export default function Blog({ params: { id } }: ParamsProps) {
  console.log(id)
  return (
    <div>
       <Link href={"/blogs"}> <BackBtn className="pb-2"/></Link>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <Image
            src={PlaceholderImg(1000, 1000)}
            alt="title"
            width={1000}
            height={1000}
            className="w-full h-full rounded-md object-cover aspect-video"
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 w-full space-y-4">
          <h1 className="text-xl lg:text-2xl font-bold leading-tight">
            Best Plumber Near Me: Find Trusted Plumbing Services with MyTSV.com
          </h1>
          <p className="text-lg text-blacks">
            When a plumbing emergency strikes, the last thing you want is to waste time searching endlessly online for
            a &quot;best plumber near me.&quot; You need someone reliable, fast, and affordable – and that&apos;s
            exactly why MyTSV.com was created.
          </p>
          <p className="text-blacks">
            We bring together local plumbing experts in your area, showcasing real video profiles, customer reviews,
            and ratings to help you find the perfect plumber in minutes!
          </p>

         <div>
         <h2 className="font-medium">Why Finding a Local Plumber Matters</h2>
          <p className="text-blacks">
            Plumbing problems can cause major disruptions to your home or business. Whether it&apos;s a leaking pipe,
            clogged drain, water heater failure, or major sewer backup, you need a professional who knows the local
            codes, weather challenges, and building standards.
          </p>
          <p className="text-blacks">
            Local plumbers not only arrive faster but also understand your area&apos;s specific plumbing systems,
            saving you time, stress, and money.
          </p>
         </div>
       

        <div>
        <h2 className="font-medium">How MyTSV.com Helps You Find the Right Plumber</h2>
        <p className="text-blacks">At MyTSV.com, we make it easy and transparent to choose a plumber:</p>
        </div>
        </div>
      </div>

      {/* Remaining Content */}
      <div className="mt-12 space-y-2 text-blacks">
        <p>
          <strong>Watch Real Videos:</strong> See local plumbers explain their services, showcase completed projects,
          and offer tips – no more guessing who&apos;s behind the phone number.
        </p>
        <p>
          <strong>Read Verified Reviews:</strong> Check real customer feedback and ratings for each plumber.
        </p>
        <p>
          <strong>Compare Services Easily:</strong> From emergency repairs to new installations, find plumbers
          specializing in exactly what you need.
        </p>
        <p>
          <strong>Connect Instantly:</strong> Contact the plumber directly through their MyTSV video profile – no
          middleman!
        </p>
        <p>
          <strong>Services Offered by Local Plumbers on MyTSV.com</strong>
        </p>
        <p className="mt-7">Our directory of professional plumbers covers every service you might need, including:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Emergency plumbing repairs</li>
          <li>Water heater installation and repair</li>
          <li>Sewer and drain cleaning</li>
          <li>Pipe leak detection and repair</li>
          <li>Bathroom and kitchen remodeling plumbing</li>
          <li>Sump pump repairs</li>
          <li>Gas line services</li>
        </ul>
        <p>
          Whether it&apos;s a small leak or a major renovation project, you&apos;ll find top-rated plumbers ready to
          help – and you can watch their video portfolio before you even make a call!
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">How to Get Started</h2>
        <p>Finding the best plumber near me is simple with MyTSV.com:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Go to MyTSV.com</li>
          <li>Search for &quot;Plumber&quot; and enter your location</li>
          <li>Watch videos, read reviews, and choose the plumber that fits your needs</li>
          <li>Contact them directly – fast and easy!</li>
        </ul>
        <p>
          <strong>Why MyTSV.com Is the Future of Finding Local Services</strong>
        </p>
        <p>Traditional search methods are outdated.</p>
        <p>
          Today&apos;s customers want to see who they&apos;re hiring. With MyTSV&apos;s video-driven platform,
          businesses build trust immediately, and customers find the right fit with confidence.
        </p>
        <p>
          <strong>Don&apos;t gamble with your plumbing needs.</strong>
        </p>
        <p>Use MyTSV.com today and connect with the best plumbers near you – quickly, safely, and confidently!</p>
      </div>

      {/* Button */}
      <div className="mt-12">
        <Button
          variant="outline"
          className="px-8 py-3 rounded-full border-2 border-pink-200 text-reds hover:bg-pink-50 hover:text-reds bg-transparent"
        >
          Read more blogs
        </Button>
      </div>
    </div>
  );
}
