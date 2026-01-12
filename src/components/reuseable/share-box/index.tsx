import { Button } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn, delay } from "@/lib";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ShareBoxProps {
  setIsShare: (isShare: boolean) => void;
  title: string;
  description: string;
  btn?: string;
  titleStyle?: string;
  descriptionStyle?: string;
  btnStyle?: string;
  message: string;
}


export default function ShareBox({setIsShare,title,description,btn="Copy link",titleStyle,descriptionStyle,btnStyle,message}:ShareBoxProps) {
  const path = usePathname();
  return (
    <div>
      <ul>
        <li className={cn("text-xl text-blacks font-semibold text-center",titleStyle)}>
          {title}
        </li>
        <li className={cn("text-center text-grays px-3",descriptionStyle)}>
          {description}
        </li>
      </ul>
      <div className="w-full  rounded-full h-12 border select-none flex justify-center items-center text-center text-lg text-grays my-4">
        <h1 className="px-3 line-clamp-1">{`${process.env.NEXT_PUBLIC_APP_URL}${path}`}</h1>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={async () => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_APP_URL}${path}`
            );
            toast.success("Link copied to clipboard!", {
              description: message,
              duration: 2000,
              position: "bottom-right",
            });
            await delay(2400);
            setIsShare(false);
          }}
          className="rounded-full px-6 py-2 h-auto text-center text-base bg-transparent hover:bg-transparent shadow-none border border-input"
        >
          <FavIcon name="copy1" className="size-6" />
          <span className={cn("text-blacks",btnStyle)}> {btn}</span>
        </Button>
      </div>
    </div>
  );
}
