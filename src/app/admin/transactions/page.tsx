"use client"
import { CustomTable, Deletebtn, Editbtn } from '@/components/common/admin/reuseable';
import NavTitle from '@/components/common/admin/reuseable/nav-title';
import SearchBox from '@/components/common/admin/reuseable/search';
import { Pagination } from '@/components/reuseable/pagination';
import { Button, TableCell, TableRow } from '@/components/ui';
import useConfirmation from '@/context/delete-modal';
import FavIcon from '@/icon/admin/favIcon';
import { PlaceholderImg } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Channels() {
    const headers = ["Sl. No", "Channel name", "Reason", "Amount"];

    const data = [
        {
            slNo: "001",
            channelName: "Haircut pro",
            reason: "Uploading video",
            amount: "$9.99",
        },
        {
            slNo: "002",
            channelName: "Haircut pro",
            reason: "Promoting YouTube Link",
            amount: "$9.99",
        },
        {
            slNo: "003",
            channelName: "Haircut pro",
            reason: "Onsite account creation",
            amount: "$9.99",
        },
        {
            slNo: "004",
            channelName: "Haircut pro",
            reason: "Uploading video",
            amount: "$9.99",
        },
        {
            slNo: "005",
            channelName: "Haircut pro",
            reason: "Promoting YouTube Link",
            amount: "$9.99",
        },
        {
            slNo: "006",
            channelName: "Haircut pro",
            reason: "Onsite account creation",
            amount: "$9.99",
        },
        {
            slNo: "007",
            channelName: "Haircut pro",
            reason: "Uploading video",
            amount: "$9.99",
        },
        {
            slNo: "008",
            channelName: "Haircut pro",
            reason: "Promoting YouTube Link",
            amount: "$9.99",
        },
    ];





    return (
        <div>
            <NavTitle
                title="Channels"
                subTitle="You can see & manage all the channels of MyTSV from here."
            />
           <ul className='flex justify-between'>
              <li> <SearchBox placeholder="Search channel" className='min-w-md' /></li>
              <li>
                 <Button variant={"primary"} className='rounded-full h-full px-6 cursor-default'>
                    <ul className='flex items-center [&>li]:text-base [&>li]:font-normal [&>li]:first:mr-9'>
                        <li className='flex items-center'><FavIcon name='doller' className='mr-2 size-5'/>Earned this month</li>
                        <li>$320.56</li>
                    </ul>
                 </Button>
              </li>
           </ul>
            <div>
                <CustomTable headers={headers}>
                    {data.map((item, index) => (
                        <TableRow key={index}>
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
                                    <span>{item.channelName}</span>
                                </div>
                            </TableCell>

                            {/* Reason */}
                            <TableCell>{item.reason}</TableCell>

                            {/* Amount */}
                            <TableCell>{item.amount}</TableCell>
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
