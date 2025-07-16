"use client"
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import assets from "@/assets";
import SectionNav from "@/components/reuseable/section-nav";


const questionsData = [
  {
    title: "What is MyTSV.com?",
    content:
      "MyTSV.com is a video-based platform that helps local businesses showcase their services through authentic customer testimonials and promotional videos.",
  },
  {
    title: "Who can join MyTSV?",
    content:
      "Any local service provider or business looking to grow their online presence with video marketing can join MyTSV. Customers can also join to share reviews and experiences.",
  },
  {
    title: "How do I upload a video?",
    content:
      "After creating an account, simply go to your dashboard and click 'Upload Video'. You can drag and drop files or select them from your device. Make sure the video follows our community guidelines.",
  },
  {
    title: "Are videos moderated?",
    content:
      "Yes, all uploaded videos are reviewed by our moderation team to ensure they meet our content standards and community guidelines before being published.",
  },
  {
    title: "How do I create an account?",
    content:
      "Click on the 'Sign Up' button on the homepage. Fill in your basic information or sign up with a social account. Once registered, you can set up your profile and start using the platform.",
  },
  {
    title: "How are ratings and reviews managed?",
    content:
      "Ratings and reviews are submitted by verified users. Our system monitors for fake or harmful content, and our team manually reviews reports to maintain authenticity and trust.",
  },
];

export default function FqaBox() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };


  return (
    <div className="max-w-6xl m-auto">
        <SectionNav src={assets.basic.questionImg} title="Frequently Asked Questions (FAQ)" />
        <div ref={containerRef}>
          <div className="flex flex-col justify-center lg:flex-row">
            <div>
              {questionsData.map((item, index) => (
                <div key={index} className="flex">
                  <div className="py-3 px-5 mb-4 bg-white rounded-xl cursor-pointer w-full">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h4 className="text-base font-medium text-blacks">
                        {item.title}
                      </h4>
                      <span>
                        {activeAccordion === index ? (
                          <ChevronUp
                            size={27}
                            className="text-blacks rounded-full p-1"
                          />
                        ) : (
                          <ChevronDown
                            size={27}
                            className="text-blacks rounded-full p-1"
                          />
                        )}
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${activeAccordion === index ? "max-h-full" : "max-h-0"
                        }`}
                      style={{
                        maxHeight: activeAccordion === index ? "500px" : "0px",
                      }}
                    >
                      <p className="text-sm lg:text-base mt-1">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}