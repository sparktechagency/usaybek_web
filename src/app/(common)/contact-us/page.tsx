import ContactUs from "@/components/common/contact-us";
import SectionNav from "@/components/reuseable/section-nav";
import { Card } from "@/components/ui";
import Icon from "@/icon";
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: "Contact Us | MyTSV",
  description:
    "Reach out to MyTSV for support, business inquiries, or partnership opportunities. We're here to help you connect with our team.",
  creator: "MyTSV",
  publisher: "MyTSV",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
  openGraph: {
    title: "Contact Us | MyTSV",
    description:
      "Get in touch with the MyTSV team. Contact us by email, phone, or visit our office. We're ready to assist you.",
    url: "/contact-us",
    siteName: "MyTSV",
    images: [
      {
        url: "/images/contact-us.svg",
        width: 800,
        height: 600,
        alt: "Contact MyTSV",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MyTSV",
    description:
      "Have a question or need help? Contact MyTSV for professional support and inquiries.",
    images: ["/images/contact-us.svg"],
    creator: "@mytsv",
  },
  alternates: {
    canonical: "/contact-us",
  },
};



export default function Contact() {
  return (
    <div className="m-auto max-w-7xl">
      <SectionNav
        src={"/images/contact-us.svg"}
        title="Contact Us"
        imgStyle="h-48 w-60 sm:w-xs"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="py-6 px-10">
          <div className="flex flex-col justify-between rounded-xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Get in touch</h2>
              <p className="text-blacks max-w-md">
                We&apos;d love to hear from you! Reach out to us through any of
                the following methods:
              </p>
              <div className="space-y-3 mt-8">
                <div className="flex items-center space-x-3 [&>div]:text-blacks">
                  <Icon name="femail" width={19} height={19}/>
                  <span>info@mytsv.com</span>
                </div>
                <div className="flex items-center space-x-3">
                   <Icon name="fphone" width={19} height={19}/>
                  <span>+1 630 297 7501</span>
                </div>
                <div className="flex items-start space-x-3">
                <Icon name="locationBlack" width={19} height={19}/>
                  <span>20570 N Milwaukee Ave Deerfield IL 60015</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <ContactUs />
      </div>
    </div>
  );
}
