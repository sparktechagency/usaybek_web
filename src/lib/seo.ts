import { Metadata } from 'next';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  url: string;
  image: string;
}

export function Seo({
  title,
  description,
  keywords = [],
  url,
  image,
}: SeoProps): Metadata {
  return {
    title,
    description,
    keywords,
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
      type: 'website',
      siteName: 'FTFTY | FIFTY',
    },
    other: {
      facebook: JSON.stringify(['website', url, title, description, image]),
      linkedin: JSON.stringify([title, description, url, image]),
    },
  };
}
