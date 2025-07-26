"use client"
import { BackBtn } from '@/components/reuseable/icon-list'
import { Avatar, AvatarFallback, AvatarImage, Button, Card, CardContent, CardTitle } from '@/components/ui'
import useConfirmation from '@/context/delete-modal'
import { serviceItem, ViewItem } from '@/dummy-data'
import Icon from '@/icon'
import FavIcon from '@/icon/admin/favIcon'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ChannelDetails() {
    const { confirm } = useConfirmation();


    // handleDelete
    const handleDelete = async () => {
        const con = await confirm({
            title: "You are going to delete this channel",
            description: "After deleting, users can't find this channel and videos anymore",
            icon: true
        });
        if (con) {
            //   console.log(selectedVideoIds);
        }
    };

    return (
        <div>
            <ul className='flex justify-between pb-5'>
                <li>
                    <Link href={"/admin/channels"}><BackBtn iconStyle='bg-transparent' className='gap-x-0' /></Link>
                </li>
                <li>
                    <Button
                        variant="ghost"
                        className="px-3 py-1 text-sm font-medium rounded-full border-1 border-reds text-blacks bg-[#FFE9E9] hover:bg-[#FFE9E9]"
                        size={"lg"}
                        onClick={handleDelete}
                    >
                        <FavIcon name='delete' className='size-5' />
                        Delete channel
                    </Button>
                </li>
            </ul>
            <div className='grid grid-cols-1 2xl:grid-cols-[1fr_780px] gap-3'>
                <Card className='p-2 border-0 gap-0'>
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
                                <AvatarImage src={"https://doctors-next14.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile2.0440e650.jpg&w=1920&q=75"} alt="Profile picture" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-semibold text-blacks">Haircut Pro</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-18">
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

                </Card>
                <div>
                    <Card className='p-3 border-1 gap-0'>
                        <CardTitle className="text-xl font-semibold mb-2">About</CardTitle>
                        <CardContent className="p-1 text-blacks text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur. Nibh sagittis ligula sem pulvinar elementum rhoncus lacus.
                            Dignissim pretium vitae neque vulputate velit libero suscipit amet. Felis proin in tortor amet. Sit
                            imperdiet ac aliquam leo est egestas. Sit id vitae tempus nulla ut consectetur mi lobortis nec. Convallis
                            velit lectus aliquam elementum dignissim. Est risus adipiscing ornare et lorem.mperdiet ac aliquam leo est egestas. Sit id vitae tempus nulla ut consectetur mi lobortis nec. Convallis
                            velit lectus aliquam elementum dignissim. Est risus adipiscing ornare et lorem
                        </CardContent>
                    </Card>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7'>
                        <Card className='p-3 border-1 gap-0'>
                            <ul className='space-y-3'>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="locationGary" />New work, USA</li>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="phoneGray" />+65896585232</li>
                                <li className='flex gap-x-2 items-center text-blacks'><Icon name="mailGray" />example@gmail.com</li>
                            </ul>
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
                </div>
            </div>
            {/* map */}
            <Card className="p-1 mt-8">
                <div className="w-full h-[300px] md:h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29208.80556098383!2d90.4036352!3d23.77942835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1752923814882!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0, pointerEvents: "none" }}  // disables zoom and drag
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </Card>
        </div>
    )
}
