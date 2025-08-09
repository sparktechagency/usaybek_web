import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export  function VideoCardSkeleton() {
  return (
    <div  className="max-w-sm  lg:w-full lg:max-w-full">
      <div className="relative">
        <Skeleton className="w-full h-[220px] bg-white"/>
      </div>
      <div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="w-[60px] h-[50px] bg-white rounded-full"/>
          <ul className="[&>li]:text-blacks w-full space-y-2">
             <Skeleton className="w-full h-[15px] bg-white rounded-md"/>
             <Skeleton className="w-[80%] h-[15px] bg-white rounded-md"/>
             <Skeleton className="w-1/2 h-[15px] bg-white rounded-md"/>
          </ul>
        </div>
      </div>
    </div>
  );
}
