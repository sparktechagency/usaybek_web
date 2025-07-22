"use client"
import NavItem from '@/components/common/dashboard/navber'
import VideoPlayer from '@/components/common/video-player'
import Form from '@/components/reuseable/from'
import { FromInputs } from '@/components/reuseable/from-inputs'
import { FromTextAreas } from '@/components/reuseable/from-textareas'
import Modal from '@/components/reuseable/modal'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import Icon from '@/icon'
import { PlaceholderImg } from '@/lib/utils'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export default function Reports() {
  const [isAppeal, setIsAppeal] = useState(false)
  const [isView, setIsView] = useState(false)
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      subject: "",
      explanation: "",
    },
  });
  const videoData = [
    {
      id: 1,
      title: "Video title goes here",
      description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
      status: "Suspended for 30 days.",
      reason: "Spreading misinformation.",
      until: "This video won't go anyone feeds until 6th May, 2025",
      blockedBy: null,
    },
    {
      id: 2,
      title: "Video title goes here",
      description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
      status: "Suspended for 7 days.",
      reason: "Sexual content.",
      until: "This video won't go anyone feeds until 6th May, 2025",
      blockedBy: null,
    },
    {
      id: 3,
      title: "Video title goes here",
      description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
      status: "MyTSV blocked your video.",
      reason: "Violating terms & conditions.",
      until: "This video will no longer goes anyone feeds.",
      blockedBy: null,
    }, {
      id: 4,
      title: "Video title goes here",
      description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
      status: "MyTSV blocked your video.",
      reason: "Violating terms & conditions.",
      until: "This video will no longer goes anyone feeds.",
      blockedBy: null,
    }, {
      id: 5,
      title: "Video title goes here",
      description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
      status: "MyTSV blocked your video.",
      reason: "Violating terms & conditions.",
      until: "This video will no longer goes anyone feeds.",
      blockedBy: null,
    },
  ]

  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };


  return (
    <div>
      <NavItem title="Reports" />
      <Table className="border border-gray-300 mt-10">
        <TableHeader className='px-5' >
          <TableRow className='rounded-tr-md'>
            <TableHead className="border border-gray-300 text-base">Video</TableHead>
            <TableHead className="border border-gray-300 text-base">Reason</TableHead>
            <TableHead className="border border-gray-300 text-right pr-20 text-base">Appeal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videoData.map((video) => (
            <TableRow key={video.id}>
              <TableCell className="border border-gray-300 py-3">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-md overflow-hidden">
                    <Image
                      src={PlaceholderImg()}
                      alt="Video thumbnail"
                      width={144}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="font-semibold">{video.title}</h3>
                    <p className="text-grays block break-all whitespace-normal line-clamp-2 w-[220px]">{video.description}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="border border-gray-300">
                <div className="grid gap-1 text-sm">
                  <p className={`font-semibold text-reds`}>
                    {video.status}
                  </p>
                  <p className="text-blacks font-medium">Reason: {video.reason}</p>
                  <p className="text-grays">{video.until}</p>
                </div>
              </TableCell>

              <TableCell className="border border-gray-300 text-right">
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setIsView(!isView)} variant="outline" className='rounded-full px-6' size="sm">
                    View
                  </Button>
                  <Button onClick={() => setIsAppeal(!isAppeal)} variant={"primary"} size="sm" className='rounded-full px-6'>
                    Appeal
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Appeal to MyTSV  */}
      <Modal open={isAppeal} title="Appeal to MyTSV" setIsOpen={setIsAppeal} className='sm:max-w-4xl'>
        <Form
          className="space-y-6 pt-4"
          from={from}
          onSubmit={handleSubmit}
        >
          <FromInputs
            label="Subject"
            name="subject"
            placeholder="Subject hare"
            stylelabel="bg-white"
          />

          <FromTextAreas
            label="Your explanation"
            name="explanation"
            placeholder="Explanation hare"
            stylelabel="bg-white"
            className='min-h-56'
          />
          <div className='flex justify-end'>
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              className='rounded-full text-base font-normal w-fit'
            >
              Send <Icon name="sent" className='relative top-[1px]' width={18} />
            </Button>
          </div>
        </Form>
      </Modal>
      {/* View report */}
      <Modal title="View report" open={isView} setIsOpen={setIsView} className='sm:max-w-4xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div>
            <VideoPlayer />
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-blacks mt-3">
                Joe&apos;s Expert Auto LLC. - Address: 2740 N Elston Ave, Chicago, IL
                60647, United States
              </h1>
              <div className="border p-3 rounded-md my-5 shadow-xs">
                <p className="text-sm text-blacks font-semibold">10 hours ago</p>
                <p className="mt-1  text-sm text-grays leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur. Malesuada at pharetra
                  convallis sociis a consectetur. In semper tortor felis gravida
                  magna eu. Sit sollicitudin dolor ac diam risus nisl gravida.
                  Turpis nisl eget mauris eu volutpat eget urna. Vel ante praesent
                </p>
              </div>
            </div>
          </div>
          <div className='space-y-5'>
          <ul className='border py-2 px-4 rounded-full flex items-center justify-between'>
               <li className='font-medium'>Reason</li>
               <li className='flex gap-2'>Spreading misinformation <Icon name='quesReads'/></li>
            </ul>
            <ul className='border py-2 px-4 rounded-full flex items-center justify-between'>
               <li className='font-medium'>Action</li>
               <li className='flex gap-2'>Suspended for 7 days <Icon name='exBlack'/></li>
            </ul>
            <div className="border p-3 rounded-md shadow-xs">
              <p className="text-xl text-reds  font-semibold">Issue</p>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Malesuada at pharetra
                convallis sociis a consectetur. In semper tortor felis gravida
                magna eu. Sit sollicitudin dolor ac diam risus nisl gravida.
                Turpis nisl eget mauris eu volutpat eget urna. Vel ante praesent
              </p>
            </div>
            <Button onClick={() => {
              setIsView(false)
              setIsAppeal(true)
            }} variant={"primary"} className='rounded-full w-full'>Appeal</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
