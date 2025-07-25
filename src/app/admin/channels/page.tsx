"use client"
import { CustomTable, Deletebtn, Editbtn } from '@/components/common/admin/reuseable';
import NavTitle from '@/components/common/admin/reuseable/nav-title';
import SearchBox from '@/components/common/admin/reuseable/search';
import { Pagination } from '@/components/reuseable/pagination';
import { TableCell, TableRow } from '@/components/ui';
import useConfirmation from '@/context/delete-modal';
import { PlaceholderImg } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Channels() {
    const { confirm } = useConfirmation();
    const headers = ["Sl. No", "Channel name", "Email", "Videos", "Views", "Likes", "Action"];

    const channelsItem = [
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        },
        {
            slNo: "001",
            channelName: "Haircut pro",
            email: "example@gmail.com",
            videos: 100,
            views: "100K",
            likes: "52.36K"
        }
    ];

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
            <NavTitle
                title="Channels"
                subTitle="You can see & manage all the channels of MyTSV from here."
            />
            <SearchBox placeholder="Search channel" />
            <div>
                <CustomTable headers={headers}>
                    {channelsItem.map((item, index) => (
                        <TableRow
                            key={index}
                        >
                            {/* Sl No */}
                            <TableCell>{item.slNo}</TableCell>

                            {/* Channel Name with Image */}
                            <TableCell className="relative">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full justify-center">
                                        <Image
                                            src={PlaceholderImg()}
                                            alt={item.channelName}
                                            width={100}
                                            height={100}
                                            className="size-full rounded-full object-cover"
                                        />
                                    </div>
                                    <span>
                                        {item.channelName}
                                    </span>
                                </div>
                            </TableCell>

                            {/* Email */}
                            <TableCell>{item.email}</TableCell>

                            {/* Videos */}
                            <TableCell>{item.videos}</TableCell>

                            {/* Views */}
                            <TableCell>{item.views}</TableCell>

                            {/* Likes */}
                            <TableCell>{item.likes}</TableCell>

                            {/* Action Buttons */}
                            <TableCell>
                                <ul className="flex gap-2">
                                    <li>
                                        <Link href={"/admin/channels/1"}>
                                            <Editbtn />
                                        </Link>

                                    </li>
                                    <li>
                                        <Deletebtn onClick={handleDelete} />
                                    </li>
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </CustomTable>
            </div>
            <ul className="flex flex-wrap justify-end my-7">
                <li className="font-medium">
                    <Pagination
                        page={1}
                        onPageChange={() => { }}
                        totalPage={10}
                        per_page={2}
                        activeStyle="!rounded-full !bg-reds !border-none !text-white hover:text-white"
                        itemStyle='rounded-full'
                    ></Pagination>
                </li>
            </ul>
        </div>
    );
}
