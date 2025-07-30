"use client";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDragAndDrop } from ".";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib/utils";
import { ImgBox } from "../Img-box";

type uploaderProps = {
  title: string;
  className?: string;
};

export default function ImageUploader({ title, className }: uploaderProps) {
  const { dragActive, preview, handleDrag, handleDrop, handleBrowse } =
    useDragAndDrop({
      onFileSelect: (file) => console.log("Selected file:", file),
    });

 console.log(preview)

  return (
    <div
      className={cn(
        `border-2 border-dashed rounded-lg h-[200px] w-full p-2 flex flex-col items-center justify-center text-center transition-colors  ${
          dragActive ? "border-red-400 bg-red-50" : "border-gray-300"
        }`,
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {preview ? (
        <ImgBox src={preview} alt="img" className="w-full h-full"/>
      ) : (
        <div>
          <div className="flex justify-center mb-2">
            <FavIcon name="representative" />
          </div>

          <p className="text-blaks  mb-2">
            {preview ? "Change the image" : title}
          </p>
          <p className="text-gray-400 font-medium mb-4">Or</p>

          <Button
            variant="primary"
            onClick={() => document.getElementById("file-input")?.click()}
          >
            Browse files
          </Button>
        </div>
      )}

      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBrowse}
      />
    </div>
  );
}
