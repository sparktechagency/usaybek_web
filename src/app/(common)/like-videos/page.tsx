import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceholderImg } from "@/lib/utils"
import Img from "@/components/reuseable/img"
import Icon from "@/icon"


export default function LinkVideos() {
    const historyItems = Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        title: "Video title goes here",
        channel: "Channel name",
        views: "22k views",
        time: "10 hours ago",
        description:
            "Lorem ipsum dolor sit amet consectetur. Habitabit enim augue urna facilisis risus tortor turpis. Sit aliquet et vitae nunc lacus potenti enim. Volutpat in tincidunt consectetur odio a in nunc est sollicitudin.",
        thumbnail: "/images/hair-styling.png"
    }))

    return (
        <div>
            <h1 className="text-2xl font-bold mb-5 text-blacks">Watch History</h1>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
                {/* Right Column: Search and Actions */}
                <ul className="space-y-6 like-gradient p-2 rounded-t-2xl [&>li>h1]:text-white">
                    <li> <Img
                        src={"https://surl.li/lzklum"}
                        title="video"
                        className="rounded-md h-[150px] border-7 w-full"
                    /></li>
                    <li>
                        <h1 className="text-2xl font-medium mb-1">Liked videos</h1>
                        <h1>10 videos</h1>
                    </li>
                    <li>
                        <Button variant={"primary"} className="text-blacks bg-white px-10 rounded-full"><Icon name="playBlack"/>Play all</Button>
                    </li>
                </ul>
                {/* Left Column: Watch History List */}
                <div className="space-y-4">
                    {historyItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4 border-b">
                            <Img
                                src={PlaceholderImg()}
                                title="video"
                                className="rounded-sm h-[125px] w-[200px]"
                            />

                            <div className="flex-1 grid gap-1">
                                <h2 className="font-semibold text-lg">{item.title}</h2>
                                <p className="text-blacks font-medium">{item.channel}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <span className="mr-2">{item.views}</span>
                                    <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full"></span>
                                    <span>{item.time}</span>
                                </div>
                                <p className="text-sm text-grays line-clamp-2">{item.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <X className="size-5 text-blacks" />
                                <span className="sr-only">Remove video</span>
                            </Button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
