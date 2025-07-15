import Image from "next/image"
import { PlaceholderImg } from "@/lib/utils"
import Link from "next/link";

export type blogsProps = {
    id: any;
    description: string;
    title: string;
    image: string;
}

export function BlogsCard({
    id,
    description,
    title,
    image
}: blogsProps) {
    return (
        <div className="max-w-sm  lg:w-full lg:max-w-full">
            <div className="relative">
                <div className="">
                    <Image
                        src={PlaceholderImg()}
                        alt={title}
                        width={400}
                        height={225}
                        className="w-full h-auto rounded-md object-cover aspect-video"
                    />
                </div>
            </div>
            <ul>
                <li className="font-medium text-[22px] text-blacks py-2">{title}</li>
                <li className="line-clamp-3 text-justify text-blacks">{description}</li>
                <li><Link
                    href={`/blogs/${id}`}
                    className="text-reds/90 font-medium"
                >
                    Read more...
                </Link></li>
            </ul>
        </div>
    )
}
