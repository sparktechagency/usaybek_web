import { DeleteBtn } from '@/components/reuseable/btn'
import { BackBtn } from '@/components/reuseable/icon-list'
import { Button } from '@/components/ui'
import FavIcon from '@/icon/admin/favIcon'
import Link from 'next/link'
import React from 'react'

export default function ChannelDetails() {
    return (
        <div>
            <ul className='flex justify-between'>
                <li>
                     <Link href={"/admin/channels"}><BackBtn iconStyle='bg-transparent' className='gap-x-0' /></Link>
                </li>
                <li>
                    <Button
                        variant="ghost"
                        className="px-3 py-1 text-sm font-medium rounded-full border-1 border-reds text-blacks bg-[#FFE9E9] hover:bg-[#FFE9E9]"
                        size={"lg"}
                    >
                         <FavIcon name='delete' className='size-5'/>
                       Delete channel
                    </Button>
                </li>
            </ul>
        </div>
    )
}
