"use client"
import { cn } from "@/lib";
import React, { useState } from "react";

interface ContentProps {
  time: string;
  description: any;
  className?:string
}

export default function ContentBox({ time, description,className }: ContentProps) {
  const [isMore, setIsMore] = useState(false);
  return (
    <div className={cn("border px-4 pt-4 pb-1 rounded-md my-5",className)}>
      <p className="text-sm text-blacks font-semibold">{time}</p>
      <div
        className={`mt-1 relative text-sm ${
          isMore ? "h-full" : "h-[50px] !overflow-hidden"
        }  text-grays leading-relaxed`}
      >
        <div className="ql-container ql-snow">
          <div
            className="ql-editor !p-0 !overflow-hidden"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
      {isMore && (
        <h1
          className="cursor-pointer pt-1 font-medium text-sm"
          onClick={() => setIsMore(false)}
        >
          Show Less
        </h1>
      )}
      {!isMore && (
        <h1
          onClick={() => setIsMore(true)}
          className="cursor-pointer pt-1 font-medium text-sm"
        >
          See More....
        </h1>
      )}
    </div>
  );
}
