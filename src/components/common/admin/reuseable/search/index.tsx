import { Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import React from 'react'


interface searchBoxProps{
    placeholder?:string,
    className?:string
}

export default function SearchBox({placeholder="Search hare",className}:searchBoxProps) {
    return (
        <div className={cn(`relative w-full max-w-2xl bg-transparent border rounded-md lg:rounded-full bg-red py-1`,className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-grays" />
            <Input
                type="text"
                placeholder={placeholder}
                className="pl-10 pr-4 py-2 rounded-full border-none w-full placeholder:text-grays"
            />
        </div>
    )
}
