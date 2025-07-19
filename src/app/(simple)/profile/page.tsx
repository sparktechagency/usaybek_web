"use client"
import { serviceItem, ViewItem } from '@/app/dashboard/page'
import { videos } from '@/components/common/video-box'
import { VideoCard } from '@/components/reuseable/video-card'
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardTitle } from '@/components/ui'
import Icon from '@/icon'
import Image from 'next/image'



export const profileImgs = "https://doctors-next14.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile2.0440e650.jpg&w=1920&q=75"


export default function ProfileBox() {
    return (
        <div className='container pb-5 lg:pb-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <Card className='p-2 border-1 gap-0'>
                    <div className="relative h-48 md:h-64">
                        <Image
                            src={"https://surl.li/lzklum"}
                            alt="Cover image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                        />
                        <div className='absolute bottom-0 left-15 translate-y-1/2 '>
                        <Avatar className="size-24  shadow-md">
                            <AvatarImage src={profileImgs} alt="Profile picture" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h2 className="text-xl font-semibold text-blacks">Haircut Pro</h2>
                        </div>
                       
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 py-3'>
                        <h2 className="opacity-0">left</h2>
                        <h2 className="opacity-0">middle</h2>
                        <Card>
                            <ul className='space-y-1'>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="locationGary" />New work, USA</li>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="phoneGray" />+65896585232</li>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="mailGray" />example@gmail.com</li>
                            </ul>
                        </Card> 
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {ViewItem.map((item, index) => (
                            <Card key={index} className="gap-0 p-2  border-1">
                                <div className='flex justify-between px-4 py-3'>
                                    <div>
                                        <div className="text-blacks">{item.label}</div>
                                        <div className="text-2xl font-bold">{item.value} </div>
                                    </div>
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        width={44}
                                        height={44}
                                    />
                                </div>

                            </Card>
                        ))}

                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                        <Card className='p-3 border-1 gap-0'>
                            <CardTitle className="text-xl font-semibold mb-2">About</CardTitle>
                            <CardContent className="p-0 text-blacks text-sm leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur. Nibh sagittis ligula sem pulvinar elementum rhoncus lacus.
                                Dignissim pretium vitae neque vulputate velit libero suscipit amet. Felis proin in tortor amet. Sit
                                imperdiet ac aliquam leo est egestas. Sit id vitae tempus nulla ut consectetur mi lobortis nec. Convallis
                                velit lectus aliquam elementum dignissim. Est risus adipiscing ornare et lorem
                            </CardContent>
                        </Card>
                        <Card className="p-3 border-1 gap-0">
                            <CardTitle className="text-xl font-semibold mb-4">Services</CardTitle>
                            <CardContent className="p-0 flex flex-col max-w-xs gap-2 [&>button]:text-blacks">
                                {serviceItem.map((item, index) => (
                                    <h1 key={index}> {index + 1}{" "}{item}</h1>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </Card>
                <Card className='p-1'>
                    <div className="w-full h-[300px] md:h-full">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29208.80556098383!2d90.4036352!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1752923814882!5m2!1sen!2sbd"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </Card>
            </div>
            {/* Videos */}
            <h1 className='font-medium text-xl py-8'>Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.slice(0, 8).map((video) => (
                    <VideoCard key={video.id} {...video} />
                ))}
            </div>
        </div>
    )
}
