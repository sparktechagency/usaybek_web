"use client"
import { ImgBox } from '@/components/common/admin/reuseable'
import { BackBtn } from '@/components/reuseable/icon-list'
import SafeHTML from '@/components/reuseable/safe-html'
import { useSingleBlogQuery } from '@/redux/api/landing/blogApi'
import Link from 'next/link'
import React from 'react'

export default function SingleBlog({id}:any) {
const {data}=useSingleBlogQuery(id)
const {image,title,description}= data || {}

  return (
    <div>
    <Link href={"/blogs"}>
      {" "}
      <BackBtn className="pb-2 mb-2" />
    </Link>
    <div className="w-full">
      <ImgBox
        src={image || "/blur.png"}
        className="w-full xl:w-[600px] h-[400px] 2xl:w-[800px] 2xl:h-[450px] float-left mb-4 xl:mb-[6px] mr-5"
        alt='title box'
      />
      <h1 className="text-xl lg:text-2xl font-bold leading-tight pb-3">
        {title}
      </h1>
      <SafeHTML html={description} />
      {/* <div dangerouslySetInnerHTML={{ __html:htmlContent}} /> */}
    </div>
  </div>
  )
}
