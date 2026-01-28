"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

interface TextEditorProps {
  value: string;
}

const TextEditorPreview: React.FC<TextEditorProps> = ({ value }) => {
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
    "br",
  ];

  return (
    <div className="ql-container ql-snow">
      <ReactQuill
        theme="snow"
        value={value}
        formats={formats}
        readOnly
        modules={{
          toolbar: false,
        }}
      />
    </div>
  );
};

export default TextEditorPreview;
