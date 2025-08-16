import React from 'react'
import { TabBoxProps } from '@/types'
import TabBox from './tab-box'
import { ArrowLeft, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui'
import Avatars from '@/components/reuseable/avater'
import { DeleteBtn } from '@/components/reuseable/btn'
import Link from 'next/link'
import useConfirmation from '@/context/delete-modal'

export default function Comments({ isTab,setIsTab }:any) {

  const { confirm } = useConfirmation();


  const handleDelete = async () => {
    const con = await confirm({
      title:"Are you sure to delete this comment ?",
      description:"Users can't find this comment anymore."
    });
    if (con) {
      console.log("ok");
    }
  };
  return (
    <div>
      <ul className='flex justify-between my-4'>
        <li>
          <Link className='font-medium text-lg flex items-center' href={"/dashboard/my-videos"}>
            <ArrowLeft size={18} className='mr-3 font-bold' />Video comments
          </Link>
        </li>
        <li className='font-medium text-lg flex items-center'>Total: 10 comments</li>
      </ul>
      <TabBox isTab={isTab} setIsTab={setIsTab} className='my-10' />
      {/* commands */}
      <div className="mt-6 space-y-6">
        {/* Comment 1 */}
        <div className="flex items-center justify-between border-b-1 pb-2">
          <div className='flex gap-3'>
            <Avatars src="" fallback="J" alt="Channel Avatar" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Julfiker Doe</span>
                <span className="text-gray-500">3 days ago</span>
              </div>
              <p className="mt-1 text-gray-800">
                Very informative video. I will obviously take your
                service.
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>2.6K</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  See Reply
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </div>
          </div>
          <DeleteBtn onClick={()=>handleDelete()} label="Remove" />
        </div>
        {/* Comment 2 */}
        <div className="flex items-center justify-between border-b-1 pb-2">
          <div className='flex gap-3'>
            <Avatars src="" fallback="J" alt="Channel Avatar" />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">John Doe</span>
                <span className="text-gray-500">2 days ago</span>
              </div>
              <p className="mt-1 text-gray-800">
                Very informative video. I will obviously take your
                service.
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>2.6K</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
                >
                  See Reply
                </Button>
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </div>
          </div>
          <DeleteBtn onClick={()=>handleDelete()} label="Remove" />
        </div>
      </div>
    </div>
  )
}

