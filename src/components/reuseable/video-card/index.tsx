import Image from "next/image";
import Link from "next/link";
import Avatars from "../avater";
import FavIcon from "@/icon/admin/favIcon";
import { ImgBox } from "@/components/common/admin/reuseable";


export function VideoCard({ item, className }: any) {
  const {
    id,
    title,
    thumbnail,
    user,
    views_count_formated,
    created_at_format,
    is_promoted,
  } = item || {};
  return (
    <div className={className}>
      <Link href={`/video/${id}`}>
        <div className="relative">
          <ImgBox
            src={thumbnail || "/blur.png"}
            alt={title || "logo"}
            className="w-full h-[220px]"
          >
            {!!is_promoted && (
              <div className="absolute top-2 right-2  bg-reds/80 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1">
                <FavIcon name="rocket" className="size-4 mr-1" />
                <span> Promoted</span>
              </div>
            )}
          </ImgBox>
        </div>
        <div>
          <div className="flex gap-2 pt-2">
            <Avatars
              className="size-13"
              alt={title}
              src={user?.avatar}
              fallback={user?.channel_name}
            />
            <ul className="[&>li]:text-blacks">
              <li className="text-lg font-semibold line-clamp-2">{title}</li>
              <li>{user?.channel_name}</li>
              <li className="*:text-grays  flex space-x-2 items-center">
                <span className="text-sm">{views_count_formated} views</span>
                <span className="flex items-center text-sm">
                  <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                  {created_at_format}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
}

// link is no show VideoCard2
export function VideoCard2({ item, className }: any) {
  const {
    id,
    title,
    thumbnail,
    user,
    views_count_formated,
    created_at_format,
    is_promoted,
    is_suspend,
  } = item || {};
  return (
    <>
      <div className="relative">
        <ImgBox
          src={thumbnail || "/blur.png"}
          alt={title || "logo"}
          className="w-full h-[220px] rounded-none rounded-t-md"
        >
          {!!is_promoted && (
            <div className="absolute top-2 right-2  bg-reds/80 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1">
              <FavIcon name="rocket" className="size-4 mr-1" />
              <span> Promoted</span>
            </div>
          )}
        </ImgBox>
      </div>
      <div>
        <div
          className={`flex gap-2 pt-2 ${
            !!is_suspend && "border-reds"
          } border-r border-l border-b rounded-b-md p-2`}
        >
          <Avatars
            className="size-13"
            alt={title}
            src={user?.avatar}
            fallback={user?.channel_name}
          />
          <ul className="[&>li]:text-blacks">
            <li className="text-lg font-semibold line-clamp-2">{title}</li>
            <li>{user?.channel_name}</li>
            <li className="*:text-grays  flex space-x-2 items-center">
              <span className="text-sm">{views_count_formated} views</span>
              <span className="flex items-center text-sm">
                <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                {created_at_format}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
