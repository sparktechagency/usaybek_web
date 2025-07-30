import Avatars from "@/components/reuseable/avater";
import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  Input,
} from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { PlaceholderImg } from "@/lib/utils";
import React, { useState } from "react";
import { Deletebtn } from "../reuseable";
import { ArrowRight, Check } from "lucide-react";

export default function SalesPreview() {
  const [isManage, setIsManage] = useState({ show: false, copied: false });
  const secretKey = "julfiker";

  const toggleShow = () =>
    setIsManage((prev) => ({ ...prev, show: !prev.show }));

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setIsManage((prev) => ({ ...prev, copied: true }));
    setTimeout(() => {
      setIsManage((prev) => ({ ...prev, copied: false }));
    }, 1000);
  };

  return (
    <div>
      {/* Profile Card */}
      <div className="border p-2 rounded-md">
        <div className="flex justify-between items-center pr-3">
          <div className="flex gap-2 items-center">
            <Avatars
              className="size-20"
              fallback="M"
              src={PlaceholderImg(50, 40)}
              alt="img"
            />
            <ul className="space-y-1 py-2">
              <li className="font-medium text-lg mb-1">Md. Abid Hasan</li>
              <li className="flex items-center text-grays space-x-1">
                <FavIcon name="phone" color="#888888" className="size-4" />
                <span>15215645612</span>
              </li>
              <li className="flex items-center text-grays space-x-1">
                <FavIcon name="mail" color="#888888" className="size-4" />
                <span>example@gmail.com</span>
              </li>
              <li className="flex items-center text-grays space-x-1">
                <FavIcon name="location" color="#888888" className="size-4" />
                <span>Dhaka, Bangladesh.</span>
              </li>
            </ul>
          </div>
          <Deletebtn />
        </div>
      </div>

      {/* Secret Key */}
      <div className="my-6">
        <h3 className="text-black text-base font-medium mb-1">Secret key</h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              value={isManage.show ? secretKey : "*****"}
              readOnly
              className="w-full h-10 rounded-full pr-10"
            />
            <div
              onClick={toggleShow}
              className="absolute inset-y-0 cursor-pointer right-3 flex items-center"
            >
              <FavIcon name={isManage.show ? "eye" : "eyeno"} color="#888888" />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="size-10 border hover:bg-transparent rounded-full flex-shrink-0"
          >
            {isManage.copied ? <Check /> : <FavIcon name="copy" />}
          </Button>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-xl">Accounts created</h1>
        <div className="space-y-3 py-3">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="border p-2 *:text-sm rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatars
                    src=""
                    fallback="H"
                    alt="profile"
                    fallbackStyle="avatar"
                  />
                  <span className="text-blacks">Haircut pro</span>
                </div>
                <div className="text-blacks">05-07-2025</div>
                <div className="text-blacks">at 05:30 PM</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="bg-transparent hover:bg-transparent rounded-full"
          >
            See all <ArrowRight className="-rotate-26" />
          </Button>
        </div>
      </div>
    </div>
  );
}
