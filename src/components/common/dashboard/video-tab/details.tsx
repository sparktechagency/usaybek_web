"use client"
import TabBox from '@/components/common/dashboard/video-tab/tab-box'
import { Button } from '@/components/ui'
import useConfirmation from '@/context/delete-modal'
import { TabBoxProps } from '@/types'
import { ArrowLeft, Maximize, Play, Settings } from 'lucide-react'
import Icon from '@/icon'
import React from 'react'
import Image from 'next/image'
import { FromShow } from '@/components/reuseable/input-show'
import { PlaceholderImg } from '@/lib/utils'
import Link from 'next/link'
import VideoPlayer from '../../video-player'
import { FromTagShow } from '@/components/reuseable/from-tag-show'



export default function Details({ isTab, setIsTab }: TabBoxProps) {
  const { confirm } = useConfirmation();


  const handleDelete = async () => {
    const con = await confirm();
    if (con) {
      console.log("ok");
    }
  };


  return (
    <div>
      <ul className='flex justify-between my-4'>
        <li >
          <Link className='font-medium text-lg flex items-center' href={"/dashboard/my-videos"}><ArrowLeft size={18} className='mr-3 font-bold' />Video details</Link>
        </li>
        <li className='flex gap-x-2'>
          <Link href={"/dashboard/edit-video"}>
            <Button variant={"primary"} size={"lg"} className='rounded-full bg-transparent text-blacks border shadow-none text-base'> <Icon name="editBlack" /> Edit this video</Button>
          </Link>
          <Button onClick={() => handleDelete()} variant={"primary"} size={"lg"} className='rounded-full text-base'><Icon name="deleteWhite" />Delete this video</Button>
        </li>
      </ul>
      <TabBox isTab={isTab} setIsTab={setIsTab} className='my-10' />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
        <div>
          <VideoPlayer />
          <h1 className='text-xl font-medium mt-6'>Joe&apos;s Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL 60647, United States</h1>
          <p className='text-grays mt-3'>
            Lorem ipsum dolor sit amet consectetur. Aenean tortor tellus semper tincidunt vel. Eget venenatis feugiat sed eget facilisi felis egestas. Tempor pulvinar vel euismod mattis. Auctor porttitor proin augue massa massa. Tortor vel eu felis tempus. Semper sit proin molestie semper fermentum. Justo accumsan rutrum ut risus at purus dignissim. Sit ipsum aenean aliquet suspendisse. Pulvinar egestas justo sed aliquam id donec sit nec. Cursus volutpat pellentesque odio donec. Et ac aliquet neque quis pulvinar consectetur lorem felis. Fermentum massa risus volutpat iaculis. Et elit faucibus velit dictum integer cursus iaculis. Faucibus rutrum lorem pellentesque cras laoreet. In molestie magna tincidunt tellus. Scelerisque tempus quis sagittis vulputate sagittis habitant. Eu vitae faucibus sapien in magna aliquam dui nullam. Vitae arcu id purus ornare porta nulla et in auctor. Amet lorem sagittis magna aliquam. Iaculis pretium nec nisl mi augue dolor et mauris odio. At augue adipiscing ac ac urna. Est gravida sed nisl nunc. Velit cursus blandit volutpat sem porta.
          </p>
        </div>
        <div className='border p-3 py-6 rounded-xl'>
          <div className='space-y-8'>
            <FromShow label='State' value='Uk' />
            <FromShow label='City' value='Bangladesh' />
            <FromShow label='Category' value='Category 1' />
            <FromShow label='Visibility' value='EveryOne' />
            <FromTagShow name="specialties"
              label="Specialties"
              tags={["Cricket", "Football", "Basketball"]} />
            {/* <FromShow label='Tags' value='' /> */}
          </div>
          <div>
            <h1 className='font-semibold text-xl my-6'>Thumbnail</h1>
            <div className="w-full h-auto md:w-[600px] md:h-[300px]">
              <Image
                src={PlaceholderImg(400, 400)}
                alt={"Thumbnail"}
                width={400}
                height={225}
                className="w-full h-full rounded-md object-cover aspect-video"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
