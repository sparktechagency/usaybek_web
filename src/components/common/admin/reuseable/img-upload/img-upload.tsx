"use client";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDragAndDrop } from ".";


export default function ImageUploader() {
  const { dragActive, preview, handleDrag, handleDrop, handleBrowse } =
    useDragAndDrop({
      onFileSelect: (file) => console.log("Selected file:", file),
    });

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        dragActive ? "border-red-400 bg-red-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />

      <p className="text-blaks  mb-2">
        {preview ? "Change the image" : "Drag and drop your image here"}
      </p>
      <p className="text-gray-400 font-medium mb-4">Or</p>

      <Button
        variant="primary"
       
        onClick={() => document.getElementById("file-input")?.click()}
      >
        Browse Image
      </Button>

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
