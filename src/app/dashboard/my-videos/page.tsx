"use client"
import NavItem from '@/components/common/dashboard/navber'
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import useConfirmation from '@/context/delete-modal'
import React, { useState } from 'react'
import Image from 'next/image'
import Icon from '@/icon'
import { Pagination } from '@/components/reuseable/pagination'

interface Video {
  id: string
  thumbnail: string
  title: string
  description: string
  visibility: string
  date: string
  time: string
  views: number
  likes: number
  dislikes: number
  comments: number
}

const initialVideos: Video[] = [
  {
    id: "1",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu. ",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
  {
    id: "6",
    thumbnail: "/placeholder.svg?height=80&width=120",
    title: "Video title goes here",
    description: "Lorem ipsum dolor sit amet consectetur. Netus massa nec eu arcu.",
    visibility: "Everyone",
    date: "24-04-2025",
    time: "10:20 AM",
    views: 22203,
    likes: 1256,
    dislikes: 100,
    comments: 100,
  },
]


export default function MyVideos() {
  const { confirm } = useConfirmation()
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [isCheck,setIsCheck]=useState(false)
  const [selectedVideoIds, setSelectedVideoIds] = useState<Set<string>>(new Set())

const handleSelectVideo = (id: string, isChecked: boolean) => {
  setSelectedVideoIds((prev) => {
    const updated = new Set(prev)
    if (isChecked) {
      updated.add(id)
    } else {
      updated.delete(id)
    }
    return updated
  })
}

  const handleDelete = async () => {
    const con = await confirm()
    if (con) {
      console.log(selectedVideoIds)
    }
  }


  return (
    <div>
      <NavItem title="My videos" upload={true} />
      <div>
        <div className="flex items-center space-x-4 pb-2 pt-10">
          <span className="font-medium text-blacks">Total videos: {videos.length}</span>
          {selectedVideoIds?.size > 0 && (
            <>
              <Button
                variant="ghost"
                className="rounded-md px-3 py-1 text-sm font-medium border-2 border-reds/20 text-reds hover:text-reds bg-[#FFE9E9] hover:bg-[#FFE9E9]"
                onClick={handleDelete}
              >
                <Icon name='deleteRed' />
                Delete
              </Button>
            </>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className='[&>th]:text-blacks'>
              <TableHead className='w-[220px] space-x-[7px]'>
                <Checkbox
                  id="select-all"
                  checked={isCheck}
                  onCheckedChange={(checked) => setIsCheck(checked as boolean)}
                />
                <label htmlFor="select-all" className="cursor-pointer">Videos</label>
              </TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead>Dislikes</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {videos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <div className='flex gap-5 items-center pr-5'>
                   {isCheck && (
                     <div className="flex items-center space-x-2">
                     <Checkbox
                       id={`video-${video.id}`}
                       checked={selectedVideoIds.has(video.id)}
                       onCheckedChange={(checked) => handleSelectVideo(video.id, checked as boolean)}
                     />
                   </div>
                   )}
                    <div className="flex space-x-4">
                      <div className="relative w-[120px] h-[80px] rounded-md">
                        <Image
                          src={"https://surl.li/lzklum"}
                          alt={video.title}
                          width={120}
                          height={80}
                          className="object-cover rounded-md"
                        />
                      </div>
                      <ul>
                        <li className="font-semibold text-blacks text-lg">{video.title}</li>
                        <li className="text-sm text-grays">{video.description}</li>
                      </ul>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="inline-flex items-center space-x-1 border rounded-full px-2 py-1 text-blacks">
                    <Icon name="internetBlack" width={17} height={17} />
                    <span>{video.visibility}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <ul className='[&>li]:text-grays space-y-1'>
                    <li className="flex items-center space-x-2">
                      <Icon name="calenderGarys" width={17} height={17} />
                      <span>{video.date}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Icon name="timegrays" width={17} height={17} />
                      <span>{video.time}</span>
                    </li>
                  </ul>
                </TableCell>

                <TableCell><div className="text-blacks">{video.views}</div></TableCell>
                <TableCell><div className="text-blacks">{video.likes}</div></TableCell>
                <TableCell><div className="text-blacks">{video.dislikes}</div></TableCell>
                <TableCell><div className="text-blacks">{video.comments}</div></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            page={1}
            onPageChange={() => { }}
            totalPage={10}
            per_page={2}
          ></Pagination>
        </li>
      </ul>
    </div>
  )
}