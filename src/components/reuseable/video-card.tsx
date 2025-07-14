import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Rocket, Dot } from "lucide-react"
import { PlaceholderImg } from "@/lib/utils"

interface VideoCardProps {
    thumbnail?: string
    title: string
    channelName: string
    views: string
    timeAgo: string
    isPromoted?: boolean
    channelAvatar: string
}

export function VideoCard({
    thumbnail,
    title,
    channelName,
    views,
    timeAgo,
    isPromoted = false,
    channelAvatar,
}: VideoCardProps) {
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
                {isPromoted && (
                    <div className="absolute top-2 right-2  bg-reds/80 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1">
                        <Rocket size={17} className="mr-1" />
                        Promoted
                    </div>
                )}
            </div>
            <div>
                <div className="flex gap-2 pt-2">
                    <Avatar className="size-14">
                        <AvatarImage src={PlaceholderImg(50, 50)} alt={channelName} />
                        <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <ul className="[&>li]:text-blacks">
                        <li className="text-lg font-semibold">{title}</li>
                        <li className="text-gray-500">{channelName}</li>
                        <li className="text-grays flex space-x-2 items-center">
                            <span className="text-sm">{views} views</span>
                            <span className="flex items-center text-sm">
                                <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                                {timeAgo}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
