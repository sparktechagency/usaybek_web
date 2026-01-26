import CategoriVideoList from '@/components/common/categori-video-list/video-list'
import React from 'react'
import { IdParams } from '@/types';
import { envs } from '@/lib';

export async function generateMetadata({ params }: IdParams): Promise<any> {
  const { id } = await params;
  const [id2, ...rest] = (id as string)?.split("-");
  const res = await fetch(`${envs.api_url}/categories/${id2}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const {name, description } = data?.data || {};
  const app_url = `${envs.app_url}/videos/${id}`
  const img = `${envs.app_url}/mytsv2.png`

  return {
    title: name,
     alternates: {
      canonical:app_url,
    },
    description,
    openGraph: {
      title: name,
      description,
      app_url,
      images: [{ url: img, width: 800, height: 600, alt: name }],
      type: "website",
      siteName: "MY TSV",
    },
    other: {
      facebook: ["website", app_url, name, description, img],
      linkedin: [app_url, name, description, img],
    },
  };
}


export default  function VideosList() {

  return (
    <CategoriVideoList/>
  )
}
