import FqaBox from '@/components/view/fqa'
import { Metadata } from 'next';
import React from 'react'


export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | MyTSV.com",
  description: "Find answers to the most commonly asked questions about MyTSV.com, video campaigns, features, and support.",
  keywords: ["FAQ", "Frequently Asked Questions", "MyTSV", "Support", "Help", "Video Testimonials"],
  openGraph: {
    title: "FAQ - MyTSV.com",
    description: "Find answers to common questions about using MyTSV.com for video-based promotions.",
    url: "https://yourdomain.com/fqa",
    siteName: "MyTSV",
    images: [
      {
        url: "https://yourdomain.com/images/faq-cover.jpg",
        width: 1200,
        height: 630,
        alt: "MyTSV FAQ Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function Fqa() {
  return (
    <FqaBox/>
  )
}
