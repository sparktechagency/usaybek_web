import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

export function BlogsCard({ id, title, image }: any) {
  return (
    <div className="max-w-sm  lg:w-full lg:max-w-full">
      <div className="relative">
        <div className="">
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className="w-full h-auto rounded-md object-cover aspect-video"
          />
        </div>
      </div>
      <ul>
        <li className="font-medium text-base text-blacks line-clamp-2 pt-2">
          {title}
        </li>
        <li>
          <Link href={`/blogs/${id}`} className="text-reds/90">
            Read more...
          </Link>
        </li>
      </ul>
    </div>
  );
}

// BlogsSkeleton
export function BlogsSkeleton() {
  return (
    <div className="max-w-sm  lg:w-full lg:max-w-full *:bg-blacks/20 space-y-1">
      <Skeleton className="h-[225px] w-full" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-1/2 h-3" />
    </div>
  );
}
