"use client";

import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// ✅ Dynamically import ReactQuill to avoid SSR issue
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "align",
    "list",
    "indent",
    "blockquote",
    "code-block",
    "link",
  ];

  return (
    <div className="w-full space-y-1">
      <div className="rounded-t-xl border border-gray-300 bg-gray-50/80 p-2">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="min-h-[280px] rounded-b-xl bg-white"
        />
      </div>
    </div>
  );
};

export default TextEditor;
