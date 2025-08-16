"use client";
import VideoPlayer from "@/components/common/video-player";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import {
  InputSelectField,
  InputSelectFieldIcon,
} from "@/components/reuseable/from-select";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import ImgUpload from "@/components/reuseable/img-uplod";
import { Button } from "@/components/ui";
import Icon from "@/icon";
import {
  useCategoriesQuery,
  useVideosDetailsQuery,
} from "@/redux/api/landing/videosApi";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FavIcon from "@/icon/admin/favIcon";
import VideoUpload from "@/components/reuseable/video-uplod";
import { useVideoEditMutation } from "@/redux/api/dashboard/videosApi";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayloadAll } from "@/lib";
import Image from "next/image";
import Link from "next/link";

const intImg = {
  videoPreview: "",
  thumbnailPreview: "",
  thumbnail: "",
  video: "",
};

export default function EditVideo({ slug }: { slug: string }) {
  const [isImg, setIsImg] = useState<any>(intImg);
  const { data: categories, isLoading: categoriLoading } = useCategoriesQuery({
    per_page: 1000,
  });
  const { data, isLoading } = useVideosDetailsQuery(slug);
  const [videoEdit, { isLoading: editLoading }] = useVideoEditMutation();
  const from = useForm({
    defaultValues: {
      title: "",
      description: "",
      state: "",
      city: "",
      category_id: null,
      visibility: "",
      tags: [],
    },
  });

  const {
    video,
    thumbnail,
    title,
    states,
    city,
    description,
    visibility,
    tags,
    category_id,
  } = (!isLoading && data) || {};

  // This effect correctly sets the initial form values when data loads
  useEffect(() => {
    if (data) {
      from.reset({
        title,
        description,
        state: states,
        city,
        category_id,
        visibility,
        tags: tags,
      });
    }
  }, [data, from]); // Added 'from' to dependency array as per best practices

  const handleSubmit = async (values: FieldValues, id: string) => {
    const { state, category_id, ...rest } = values;
    const value = {
      ...rest,
      category_id: parseInt(values.category_id),
      states: state,
      _method: "PUT",
      ...(isImg?.thumbnail && { thumbnail: isImg?.thumbnail }),
      ...(isImg.video && { video: isImg.video }),
    };
    try {
      const data = modifyPayloadAll(value);
      const res = await videoEdit({ data, id }).unwrap();
      if (res.status) {
        from.reset();
         setIsImg(intImg);
      }
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  // ✅ **NEW: Centralized function to undo all changes**
  const handleUndoChanges = () => {
    if (data) {
      from.reset();
    }
    setIsImg(intImg);
  };

  return (
    <Form from={from} onSubmit={(values) => handleSubmit(values, slug)}>
      <div className="pb-10">
        <ul className="flex justify-between items-center my-4">
          <li>
            <Link
              className="font-medium text-lg flex items-center"
              href={"/dashboard/my-videos"}
            >
              <ArrowLeft size={18} className="mr-3 font-bold" />
              Edit Video
            </Link>
          </li>
          <li className="flex gap-x-2">
            <Button
              variant={"primary"}
              size={"lg"}
              className="rounded-full bg-transparent text-blacks border shadow-none text-base"
              // ✅ **UPDATED: Use the new handler function**
              onClick={handleUndoChanges}
              type="button" // Add type="button" to prevent form submission
            >
              <Icon name="undoBlack" width={16} /> Undo changes
            </Button>
            <Button
              variant={"primary"}
              size={"lg"}
              className="rounded-full text-base"
              type="submit"
              disabled={editLoading}
            >
              <Icon name="saveWhite" width={16} />
              Save changes
            </Button>
          </li>
        </ul>

        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-9">
              <div className="relative">
                <VideoPlayer
                  src={isImg?.videoPreview || video}
                  thumbnail={isImg?.thumbnailPreview || thumbnail} // Also fallback for thumbnail
                  className="h-[450px]"
                />
                <VideoUpload
                  onFileSelect={(file: File) => {
                    setIsImg({
                      ...isImg,
                      video: file,
                      videoPreview: URL.createObjectURL(file),
                    });
                  }}
                >
                  <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-3 right-3 backdrop-blur-3xl bg-black/50">
                    <FavIcon className="size-4" name="editprofile" />
                  </div>
                </VideoUpload>
              </div>
              <FromInputs
                label="Title"
                name="title"
                placeholder="Enter your title"
              />
              <FromTextAreas
                label="Description"
                name="description"
                placeholder="Enter your Description"
                className="min-h-44 rounded-3xl"
              />
            </div>
            <div className="space-y-8 border px-3 py-5  rounded-md">
              <FromInputs
                label="State"
                name="state"
                placeholder="State name here"
              />
              <FromInputs
                label="City"
                name="city"
                placeholder="City name here"
              />
              <InputSelectField
                items={categories?.data?.map((item: any) => ({
                  label: item?.name,
                  value: item?.id,
                }))}
                label="Category"
                name="category_id"
                placeholder="Select category"
              />
              <InputSelectFieldIcon
                items={[
                  {
                    label: "Everyone",
                    value: "Everyone",
                    icon: <Icon width={18} name="internetBlack" />,
                  },
                  {
                    label: "Only me",
                    value: "Only me",
                    icon: <Icon width={14} name="lockBack" />,
                  },
                ]}
                label="Visibility"
                name="visibility"
                placeholder="Select category"
              ></InputSelectFieldIcon>

              <FromTagInputs label="Tags" name="tags" />

              <div>
                <h1 className="font-semibold text-xl my-6">Thumbnail</h1>
                <div className="w-full h-auto md:w-[600px] relative md:h-[300px]">
                  <Image
                    src={isImg?.thumbnailPreview || thumbnail || "/blur.png"}
                    alt={"Thumbnail"}
                    width={400}
                    height={225}
                    className="w-full h-full rounded-md object-cover aspect-video"
                  />
                  <ImgUpload
                    onFileSelect={(file: File) => {
                      setIsImg({
                        ...isImg,
                        thumbnail: file,
                        thumbnailPreview: URL.createObjectURL(file),
                      });
                    }}
                  >
                    <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-3 right-3 backdrop-blur-3xl bg-black/50">
                      <FavIcon className="size-4" name="editprofile" />
                    </div>
                  </ImgUpload>
                </div>
                <h1 className="text-reds flex items-center gap-2 mt-2">
                  <Icon width={18} name="alertRed" />
                  Image resolution should be minimum 1080x528 px{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
