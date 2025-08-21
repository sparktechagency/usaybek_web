import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert, Loader, Upload } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import {
  InputSelectField,
  InputSelectFieldIcon,
} from "@/components/reuseable/from-select";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Icon from "@/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadVideo } from "@/schema";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import ImgUpload from "@/components/reuseable/img-uplod";
import VideoUpload from "@/components/reuseable/video-uplod";
import FavIcon from "@/icon/admin/favIcon";
import { useGetCitiesQuery, useGetStatesQuery } from "@/redux/api/commonApi";
import { useStoreVideosMutation } from "@/redux/api/dashboard/videosApi";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { toast } from "sonner";
import { modifyPayloadAll } from "@/lib";


// local preview state
const intImg = {
  videoPreview: "",
  thumbnailPreview: "",
};

export default function UploadVideo({ type, setIsPayment }: any) {
  const { data: states } = useGetStatesQuery({});
  const [isImg, setIsImg] = useState<any>(intImg);
  const [storeVideos, { isLoading }] = useStoreVideosMutation();
  const { data: categories } = useCategoriesQuery({
    per_page: 1000,
  });
  const [isSelect, setIsSelect] = useState({
    state: [],
    city: [],
  });

  const [isPay, setIsPay] = useState(true);

  const from = useForm({
    resolver: zodResolver(uploadVideo),
    defaultValues: {
      title: "",
      category_id: "",
      states: "",
      city: "",
      visibility: "",
      tags: [],
      description: "",
      video: null,
      thumbnail: null,
    },
  });

  const stateId = from.watch("states");
  const { data: citys } = useGetCitiesQuery(stateId, {
    skip: !stateId,
  });
  const stateName=stateId && (states?.find((item:any)=>item?.id === parseInt(stateId))?.name)
 


  useEffect(() => {
    if (!citys?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      city: citys.map(({ name, id }: any) => ({
        label: name,
        value: name,
      })),
    }));
  }, [citys]);

  useEffect(() => {
    if (!states?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      state: states.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [states]);

  const handleSubmit = async (values: FieldValues) => {
    const { states, ...rest}=values
    const value = {
      ...rest,
      states:stateName,
      type,
      is_promoted: 1,
    };
    try {
      const data = modifyPayloadAll(value);
      const res = await storeVideos(data).unwrap();
      if (res.status) {
        toast("Video Uploaded", {
          description: res?.message,
        });
        setIsPayment(true);
      }
      from.reset();
      setIsImg(intImg);
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  return (
    <div>
      <Form
        from={from}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left Column */}
        <div className="space-y-5">
          {/* Video Upload */}
          <VideoUpload
            onFileSelect={(file: File) => {
              setIsImg({
                ...isImg,
                videoPreview: URL.createObjectURL(file),
              });
              from.setValue("video", file, { shouldValidate: true });
            }}
          >
            {isImg.videoPreview ? (
              <div className="relative w-full h-full">
                <video
                  key={isImg.videoPreview}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                >
                  <source src={isImg?.videoPreview} />
                  Your browser does not support the video tag.
                </video>
                <div className="size-8 absolute cursor-pointer grid place-items-center rounded-md  top-2 right-2 backdrop-blur-3xl bg-black/50">
                  <FavIcon className="size-4" name="editprofile" />
                </div>
              </div>
            ) : (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8  text-center space-y-3 min-h-[220px] flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-black" />
                  <p className="text-xl font-semibold">Upload your video</p>
                  <p className="text-gray-500">
                    Drag & drop your file or browser
                  </p>
                  <Button variant="primary" type="button">
                    Browse Files
                  </Button>
                </div>
                {from?.formState?.errors?.video && (
                  <p className="text-reds flex justify-end items-center gap-1 text-sm">
                    {from?.formState?.errors?.video?.message as string}
                    <CircleAlert size={14} />
                  </p>
                )}
              </div>
            )}
          </VideoUpload>

          {/* Promoted Button */}
          <Button
            variant="primary"
            className="rounded-full font-normal text-base"
          >
            <Icon name="promoted" width={20} />
            <span>{isPay ? "Promoted" : "Promote for $99 / Month"}</span>
          </Button>

          {/* State Dropdown */}
          <InputSelectField
            items={isSelect?.state}
            label="State"
            name="states"
            placeholder="Select State"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />

          {/* City Dropdown */}
          <InputSelectField
            items={isSelect?.city}
            label="City"
            name="city"
            placeholder="Select City"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Title Input */}
          <FromInput
            label="Title"
            name="title"
            placeholder="Enter Your title"
            className="h-10"
          />

          {/* Category Dropdown */}
          <InputSelectField
            items={categories?.data?.map((item: any) => ({
              label: item?.name,
              value: item?.id?.toString(),
            }))}
            label="Category"
            name="category_id"
            placeholder="Select Category"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />

          {/* Thumbnail Upload */}
          <div className="space-y-1">
            <div className="flex items-center justify-between border rounded-full p-1 h-9">
              <span className="text-sm pl-1">
                {isImg?.thumbnailPreview
                  ? isImg?.thumbnailPreview
                  : "Thumbnail"}
              </span>
              <ImgUpload
                onFileSelect={(file: File) => {
                  setIsImg({
                    ...isImg,
                    thumbnailPreview: file?.name?.split(".")[0],
                  });
                  from.setValue("thumbnail", file, { shouldValidate: true });
                }}
              >
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center space-x-2 h-7 rounded-full text-[#3B97D3] border-[#3B97D3] hover:text-[#3B97D3]"
                >
                  <Upload className="h-4 w-4 text-[#3B97D3]" />
                  <span>Upload an image</span>
                </Button>
              </ImgUpload>
            </div>
            {from?.formState?.errors?.thumbnail && (
              <p className="text-reds justify-end mt-1 flex items-center gap-1 text-sm">
                {from?.formState?.errors?.thumbnail?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
          </div>

          {/* Description */}
          <FromTextAreas
            label="Description"
            name="description"
            placeholder="Enter your Description"
            className="min-h-40 rounded-3xl"
            matching={true}
          />

          {/* Visibility Dropdown */}
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
            placeholder="Select Visibility"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <FromTagInputs
            label="Tags"
            name="tags"
            stylelabel="bg-white"
            className="bg-white rounded-2xl min-h-25"
          />
        </div>
        <div className="col-span-1 lg:col-span-2 flex justify-end">
          <Button disabled={isLoading} variant="primary">
            {isLoading ? (
              <span className="flex items-center">
                <Loader className="animate-spin size-4 mr-1" />
                Uploading
              </span>
            ) : (
              "Publish"
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//         {/* {isPay ? (
//           onClick={() => setIsPay(!isPay)}
//         ) : (
//           <div className="col-span-1 lg:col-span-2 flex space-x-3 items-center justify-end">
//             <h1 className="text-gray-500">
//               After payment you will be returned here immediately.
//             </h1>
//             <Button variant="outline">$99.00</Button>
//             <Button onClick={() => setIsPayment(true)} variant="primary">
//               Pay now
//             </Button>
//           </div>
//         )} */}
