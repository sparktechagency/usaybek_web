import { Button, Input } from '@/components/ui'
import Icon from '@/icon'
import { Search } from 'lucide-react'
import React from 'react'

type uploadProps = {
  title: string,
  upload?: boolean
}

export default function NavItem({ upload = false,title }: uploadProps) {
  return (
    <div className="flex items-center space-y-2 md:space-y-0 flex-wrap md:flex-nowrap justify-between py-2">
      <h1 className="text-2xl font-bold text-blacks">{title}</h1>
      <div className="relative w-full max-w-2xl bg-white rounded-md lg:rounded-full py-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grays" />
        <Input
          type="text"
          placeholder="Search across your profile"
          className="pl-10 pr-4 py-2 rounded-full border-none w-full placeholder:text-grays"
        />
      </div>
      {upload ? (<Button variant={"primary"} size={"lg"} className='rounded-full w-full lg:w-fit h-11'>
        <Icon name='uploadWhite' width={16} height={16} className='mr-1' />
        Upload a new video</Button>) : (<h1 className='opacity-0'>0</h1>)}

    </div>
  )
}
