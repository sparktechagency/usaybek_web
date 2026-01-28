"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
<<<<<<< HEAD
import Avatars from "@/components/reuseable/avater";
=======
import TextEditorPreview from "@/components/common/admin/reuseable/text-editor-preview";
>>>>>>> dc748a8c2e93287097a626ef416482bc34a4d2e2
import { BackBtn } from "@/components/reuseable/icon-list";
import Modal from "@/components/reuseable/modal";
import ShareBox from "@/components/reuseable/share-box";
import { Button, TextareaResizing } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { modifyPayload } from "@/lib";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useDeleteBlogCommentMutation,
  useGetBlogsCommentQuery, useSingleBlogQuery,
  useStoreCommentMutation, useUpdateBlogCommentMutation
} from "@/redux/api/landing/blogApi";
import DOMPurify from "dompurify";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SingleBlog({ id }: any) {
  const [commentText, setCommentText] = useState('')
  const [isSubmit, setIsSubmit] = useState(true)
  const [commentId, setCommentId] = useState("")
  const { data } = useSingleBlogQuery(id);
  const { id: blogId, image, title, description } = data || {};
  const [isShare, setIsShare] = useState(false);
  const { data: user } = useGetProfileQuery({});
  const { data: blogComment } = useGetBlogsCommentQuery(
    { blog_id: blogId },
    { skip: !blogId }
  );
  const [storeComment, { isLoading: storeLoading }] = useStoreCommentMutation()
  const [updateBlogComment, { isLoading: updateLoading }] = useUpdateBlogCommentMutation()
  const [deleteBlogComment] = useDeleteBlogCommentMutation()

  const resetComment = () => {
    setCommentText("")
    setIsSubmit(true)
    setCommentId("")
  }

  const SubmitComment = async (e: any) => {
    e.preventDefault();
    if (isSubmit) {
      const data = modifyPayload({
        comment: commentText,
        blog_id: blogId
      })

      const res = await storeComment(data).unwrap()
      if (res.status) {
        toast.success("Comment added!", {
          description: "Thanks for contributing to the discussion.",
          position: "bottom-right",
        });
        setCommentText("")
      }
    } else {
      const data = modifyPayload({
        _method: "PUT",
        comment: commentText,
        blog_id: blogId
      })

      const res = await updateBlogComment({ id: commentId, data }).unwrap()
      if (res.status) {
        toast.success("Comment Update!", {
          description: "Thanks for contributing to the discussion.",
          position: "bottom-right",
        });
        resetComment()
      }
    }

  }


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
<<<<<<< HEAD

        <article className="mb-10">
          <div className="ql-container ql-snow">
            <div
              className="ql-editor !p-0"
              dangerouslySetInnerHTML={{ __html:description }}
            />
          </div>
        </article>

        <div className="mt-10">
          <h1 className="text-xl font-bold mb-2">Comments</h1>
          {user?.data?.id && <form onSubmit={SubmitComment} className="w-full lg:w-1/2">
            <div className="flex gap-3">
              <Avatars
                className="size-10 lg:size-13"
                alt={user?.data?.channel_name}
                src={user?.data?.avatar}
                fallback={user?.data?.channel_name}
              />
              <TextareaResizing
                placeholder="Write a comment..."
                className="p-2 w-full border rounded-md min-h-30"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText}
                required={true}
              />
            </div>
            <div className="flex justify-end mt-3">
              {isSubmit ? (
                <Button disabled={storeLoading} variant="primary" className="rounded-md">
                  {storeLoading ? "Waiting..." : "Submit"}
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button type="button" onClick={() => resetComment()}>Cancel</Button>
                  <Button disabled={updateLoading} variant="primary" className="rounded-md">
                    {updateLoading ? "Waiting..." : "Submit"}
                  </Button>
                </div>
              )}

            </div>
          </form>}
          {blogComment?.data?.length > 0 && (
            <div className="space-y-6 mt-2 mb-4 w-full lg:w-1/2">
              {blogComment?.data?.map((item: any, idx: any) => (
                <div key={idx} className="flex gap-4">
                  <Avatars
                    className="size-10 lg:size-13"
                    alt={item?.user?.name || "comment name"}
                    src={item?.user?.avatar || "/user.png"}
                    fallback={item?.user?.name}
                  />
                  <ul>
                    <li className="mt-1">
                      <span className="font-medium text-base">{item?.user?.name}</span>
                      {/* <span className="font-normal text-sm text-grays"> {formatDate(item.created_at)}</span> */}
                    </li>
                    <li className="text-grays">{item.comment}</li>
                    {user?.data?.id === item?.user?.id && (
                      <li className="mt-2">
                        <ul className="flex gap-2">
                          <li className="border rounded-md size-8 grid place-items-center cursor-pointer">
                            <Pencil onClick={() => {
                              setCommentText(item.comment)
                              setIsSubmit(false)
                              setCommentId(item.id)
                            }} size={20} className="text-grays" />
                          </li>
                          <li onClick={async () => {
                            await deleteBlogComment(item.id).unwrap()
                          }} className="border rounded-md size-8 grid place-items-center cursor-pointer">
                            <Trash2 size={19} className="text-grays" />
                          </li>
                        </ul>
                      </li>
                    )}

                  </ul>

                </div>
              ))}
            </div>
          )}

        </div>
=======
        <TextEditorPreview value={description} />
>>>>>>> dc748a8c2e93287097a626ef416482bc34a4d2e2
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
