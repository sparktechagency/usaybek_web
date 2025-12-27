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
    <div className="w-full relative">
       <h1 className="text-xl lg:text-2xl font-bold leading-tight pb-3">
        {title}
      </h1>
      <ImgBox
        src={image || "/blur.png"}
        className="w-full h-100 max-w-4xl my-10 mx-auto 2xl:h-[450px]"
        alt='title box'
      />
     
      <article className='mb-10'>
          <div className="ql-container ql-snow">
          <div
            className="ql-editor !p-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </article>
    </div>
  </div>
  )
}


      {/* <SafeHTML html={description} /> */}
      {/* <div dangerouslySetInnerHTML={{ __html:htmlContent}} /> */}