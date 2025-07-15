import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, ThumbsUp, ThumbsDown, Share2, Flag, MessageCircle, Search, Play, Settings, Maximize } from "lucide-react"
import { PlaceholderImg } from "@/lib/utils"
import Avatars from "@/components/reuseable/avater"

export default function Component() {
  return (
    <div className="w-11/12 lg:max-w-screen ;g:px-20 mx-auto">
         <div className="flex flex-col">
      {/* Header */}

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row flex-1 p-6 gap-6">
        {/* Left column: Video player, details, comments */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <Image
              src="https://surl.li/lzklum"
              alt="Video thumbnail"
              layout="fill"
              objectFit="cover"
              className="opacity-70"
            />
            {/* Playback controls placeholder */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Play className="w-5 h-5" />
                  <span className="sr-only">Play</span>
                </Button>
                <span>2:26 / 8:34</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="w-5 h-5" />
                  <span className="sr-only">Settings</span>
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Maximize className="w-5 h-5" />
                  <span className="sr-only">Fullscreen</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Video Title and Actions */}
          <div>
            <h1 className="text-lg lg:text-xl font-semibold text-blacks mt-3">
              Joe's Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL 60647, United States
            </h1>
            <div className="flex items-center flex-wrap lg:flex-nowrap justify-between mt-5">
                <div className="flex items-center gap-3">
                  <Avatars src="" fallback="C" alt="Channel Avatar"/>
              <div className="flex-1">
                <Link href="#" className="font-semibold text-gray-900">
                  Channel name
                </Link>
              </div>
            </div>
            {/* right */}
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2  text-sm has-[>div]:cursor-pointer">
              <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                <Eye className="size-6 text-grays" />
                <span className="text-blacks font-semibold">10K</span>
              </div>
              <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                <ThumbsUp className="size-5 text-grays" />
                <span className="text-blacks font-semibold">10</span>
              </div>
              <div className="flex items-start gap-1 border px-4 py-1 rounded-full">
               <ThumbsDown className="size-5 text-grays" />
                <span className="text-blacks font-semibold">10</span>
              </div>
              <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                  <MessageCircle className="size-5 text-grays" />
                <span className="text-blacks font-semibold">10</span>
              </div>
              <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
               <Share2 className="size-4 text-grays" />
                <span className="text-blacks font-semibold">Share</span>
              </div>
              <div className="flex items-center gap-1 border px-4 py-1 rounded-full">
                <Flag className="size-5 text-grays" />
                <span className="text-blacks font-semibold">Report</span>
              </div>
            </div>
            </div>
          </div>

          {/* Channel Info and Description */}
          <div className="border p-4 rounded-md my-5 shadow-xs">
            <p className="text-sm text-blacks font-semibold">10 hours ago</p>
            <p className="mt-1  text-sm text-grays leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Malesuada at pharetra convallis sociis a consectetur. In semper
              tortor felis gravida magna eu. Sit sollicitudin dolor ac diam risus nisl gravida. Turpis nisl eget mauris
              eu volutpat eget urna. Vel ante praesent sapien quam. Non sapien fringilla rutrum porttitor in eu sit
              consectetur. Sapien scelerisque si faucibus tincidunt potenti amet sed enim a. Laciniis sagittis tellus
              lobortis sed odio ullamcorper eu sit. Tristique id quisque pulvinar adipiscing bibendum in penatibus
              egestas. Gravida urna aliquet feugiat habitant amet eget nisl. Etiam aenean viverra dui nisl id.
              Scelerisque ultricies urna morbi in leo sapien volutpat gravida. Convallis viverra mattis iaculis viverra
              pellentesque sed amet id. Elit vestibulum iaculis id. Sed tincidunt platea pharetra vestibulum. Vel ipsum
              nulla neque est. Dignissim massa odio enim vitae tortor laoreet consectetur amet. Sociis quam nisl sed
              tristique libero.
            </p>
          </div>

          {/* Comments Section */}
          <div className="border-gray-200">
            <h2 className="text-lg font-semibold">1000 Comments</h2>
            <div className="flex items-center gap-3 mt-4">
              <Avatars src="" fallback="M" alt="Channel Avatar"/>
              <Input placeholder="Comment as Ms. Abid" className="flex-1 rounded-full bg-white" />
            </div>

            {/* Sample Comments */}
            <div className="mt-6 space-y-6">
              {/* Comment 1 */}
              <div className="flex gap-3">
                 <Avatars src={""} fallback="J" alt="John Doe"/>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <p className="mt-1 text-gray-800">Very informative video. I will obviously take your service.</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>2.6K</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      See Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
              {/* Comment 2 */}
              <div className="flex gap-3">
                 <Avatars src="" fallback="J" alt="Channel Avatar"/>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">John Doe</span>
                    <span className="text-gray-500">2 days ago</span>
                  </div>
                  <p className="mt-1 text-gray-800">Very informative video. I will obviously take your service.</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>2.6K</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      See Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Related videos */}
        <div className="w-full lg:w-96 flex-shrink-0 mt-6 lg:mt-0">
          <h2 className="text-xl font-semibold mb-4">Related videos</h2>
           <div className="space-y-5">
              {[...Array(10)].map((_, i) => (
                <Link href="#" key={i} className="flex gap-3 group">
                  <div className="relative w-37 h-22 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={PlaceholderImg(200,200)}
                      alt="Related video thumbnail"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-2 text-blacks">
                      Joe's Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL
                    </h3>
                    <ul>
                       <li className="text-gray-600 text-base mt-1">Channel name</li>
                       <li className="text-grays flex space-x-2 items-center text-sm">
                            <span className="text-xs">22K views</span>
                            <span className="flex items-center text-sm">
                                <span className="inline-block w-2 h-2 bg-[#D9D9D9] rounded-full mr-1"></span>
                                10 hours ago
                            </span>
                        </li>
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}
