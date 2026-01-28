import { Poppins } from "next/font/google"; // Import Poppins
import "@/app/style/globals.css";
import Providers from "@/components/providers";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "react-quill-new/dist/quill.snow.css";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-seo`, {
    cache: "force-cache",
    next: { revalidate: 72 * 60 * 60 },
  });
  const { data } = await res.json();
  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.tags.join(", "),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_APP_URL,
    },
     openGraph: {
      images: [
        {
          url: "/mytsv2.png",
          width: 800,
          height: 600,
          alt: "mytsv Next Experience",  
        },
      ],
      type: "website",
      siteName: "MyTSV",
      title: data?.title,
      description: data?.description,
      url: process.env.NEXT_PUBLIC_APP_URL,
    },

    twitter: {
      card: "summary_large_image", 
      site: "@mytsvplatform",  
      title: data?.title,
      description: data?.description,
      image: "/mytsv2.png",
    },

    // You can also include other social media links here, if needed:
    links: data?.links.map((link:any) => ({
      [link.key]: link.value,
    })) || [],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D94SJCXC0J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D94SJCXC0J');
          `}
        </Script>
      </head>

      <body className={`${poppins.variable} antialiased`}>
        <NextTopLoader color="#ef4444" height={4} showSpinner={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
