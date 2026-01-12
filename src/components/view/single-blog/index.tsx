"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
import { BackBtn } from "@/components/reuseable/icon-list";
import Modal from "@/components/reuseable/modal";
import ShareBox from "@/components/reuseable/share-box";
import FavIcon from "@/icon/admin/favIcon";
import { useSingleBlogQuery } from "@/redux/api/landing/blogApi";
import DOMPurify from "dompurify";
import Link from "next/link";
import React, { useState } from "react";

export default function SingleBlog({ id }: any) {
  const { data } = useSingleBlogQuery(id);
  const { image, title, description } = data || {};
  const [isShare, setIsShare] = useState(false);

  const sanitizedContent = DOMPurify.sanitize(description, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: ["p", "b", "i", "em", "strong", "a", "ul", "ol", "li", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
  const cleanedContent = sanitizedContent.replace(/&nbsp;/g, " ");

  return (
    <div>
      <div className="flex justify-between gap-10">
        <Link href={"/blogs"}>
          {" "}
          <BackBtn className="pb-2 mb-2" />
        </Link>
        <div
          onClick={() => setIsShare(!isShare)}
          className="size-10 grid place-items-center cursor-pointer bg-white rounded-full"
        >
          <FavIcon name="share" />
        </div>
      </div>
      <div className="w-full relative">
        <h1 className="text-xl lg:text-2xl font-bold leading-tight pb-3">
          {title}
        </h1>
        <ImgBox
            src={image || "/blur.png"}
            className="w-full h-100 max-w-4xl my-10  mx-auto 2xl:h-[450px]"
            alt="title box"
          />

        <article className="mb-10">
          <div className="ql-container ql-snow">
            <div
              className="ql-editor !p-0"
              dangerouslySetInnerHTML={{ __html: cleanedContent }}
            />
          </div>
        </article>
      </div>
      {/* blog box */}
      <Modal open={isShare} title="Share" setIsOpen={setIsShare}>
        <ShareBox
          setIsShare={setIsShare}
          title="Link for this blog"
          description="Copy this link and share to your friends through anything you want"
          message="You can now share this blog link with others"
        />
      </Modal>
    </div>
  );
}
