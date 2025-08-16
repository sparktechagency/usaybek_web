import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { InputSelectField } from "@/components/reuseable/from-select";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Icon from "@/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema";
import { useCategoriesQuery } from "@/redux/api/landing/videosApi";
import ImgUpload from "@/components/reuseable/img-uplod";
import VideoUpload from "@/components/reuseable/video-uplod";

type UploadVideoProps = {
  title: string;
  category: string;
  city: string;
  state: string;
  visibility: string;
  tags: string[];
  description: string;
  videoFile: FileList | null;
  thumbnail: FileList | null;
};
const intImg = {
  videoPreview: "",
  thumbnailPreview: "",
  thumbnail: "",
  video: "",
};

export default function UploadVideo({ type, setIsPayment }: any) {
  const [isImg, setIsImg] = useState<any>(intImg);
  const { data: categories } = useCategoriesQuery({
    per_page: 1000,
  });

  const [isPay, setIsPay] = useState(true);

  console.log(isImg)

  const from = useForm<UploadVideoProps>({
    // resolver: zodResolver(SignUpSchema),
    defaultValues: {
      title: "",
      category_id: "",
      city: "",
      state: "",
      visibility: "",
      tags: ["React", "Next.js", "Tailwind"],
      description: ""
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      type,
      ...values,
    };
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
                video: file,
                videoPreview: URL.createObjectURL(file),
              });
            }}
          >
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8  text-center space-y-3 min-h-[220px] flex flex-col items-center justify-center">
              <Upload className="h-12 w-12 text-black" />
              <p className="text-xl font-semibold">Upload your video</p>
              <p className="text-gray-500">Drag & drop your file or browse</p>
              <Button
                variant="primary"
                type="button"
              >
                Browse Files
              </Button>

            </div>
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
            items={[
              { label: "state 1", value: "state 1" },
              { label: "state 2", value: "state 2" },
              { label: "state 3", value: "state 3" },
            ]}
            label="State"
            name="state"
            placeholder="Select State"
            matching={true}
            className="py-4"
            itemStyle="py-2"
          />

          {/* City Dropdown */}
          <InputSelectField
            items={[
              { label: "city 1", value: "city 1" },
              { label: "city 2", value: "city 2" },
              { label: "city 3", value: "city 3" },
            ]}
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
                {isImg?.thumbnailPreview ? isImg?.thumbnailPreview : "Thumbnail"}
              </span>
              <ImgUpload
                onFileSelect={(file: File) => {
                  setIsImg({
                    ...isImg,
                    thumbnail: file,
                    thumbnailPreview: file?.name?.split(".")[0],
                  });
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
            <div className="flex items-center space-x-2 text-reds text-sm">
              <Icon name="alertRed" width={17} className="rotate-2" />
              <span>Image resolution should be minimum 1920x1080 px</span>
            </div>
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
          <InputSelectField
            items={[
              {
                label: "Everyone",
                value: "everyone",
                icon: <Icon width={16} name="internetBlack" />,
              },
              {
                label: "Only me",
                value: "only me",
                icon: <Icon width={13} name="lockBack" />,
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
            className="bg-white"
          />
        </div>
        <div className="col-span-1 lg:col-span-2 flex justify-end">
          <Button variant="primary">Publish</Button>
        </div>

        {/* {isPay ? (
          onClick={() => setIsPay(!isPay)}
        ) : (
          <div className="col-span-1 lg:col-span-2 flex space-x-3 items-center justify-end">
            <h1 className="text-gray-500">
              After payment you will be returned here immediately.
            </h1>
            <Button variant="outline">$99.00</Button>
            <Button onClick={() => setIsPayment(true)} variant="primary">
              Pay now
            </Button>
          </div>
        )} */}
      </Form>
    </div>
  );
}
