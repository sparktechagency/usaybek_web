"use client"
import ResponsivePagination from 'react-responsive-pagination'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from '@/lib/utils'
import React from 'react'

interface PaginationProps {
  current_page?: number
  onPageChange: (page: number) => void
  total?: number
  per_page: number
  className?: string,
  activeStyle?:string,
  itemStyle?:string
}

export function Pagination({
  current_page=1,
  onPageChange,
  total=10,
  per_page,
  className,
  activeStyle,
  itemStyle
}: PaginationProps) {
  const totalCount = Math.ceil(total / per_page)

  return (
    <div className={cn("lg:w-[320px] flex justify-end", className)}>
      <ResponsivePagination
        previousLabel={<ChevronLeft className="h-4 w-4" />}
        nextLabel={<ChevronRight className="h-4 w-4" />}
        className="flex flex-row gap-1 w-fit"
        pageItemClassName={cn("h-10 border rounded-md w-10 flex items-center justify-center whitespace-nowrap text-sm font-medium hover:bg-accent hover:text-accent-foreground",itemStyle)}
        pageLinkClassName="h-10 w-10 flex items-center justify-center rounded-full"
        activeItemClassName={cn(`bg-transparent border border-[#1890FF] text-[#1890FF] hover:bg-transparent hover:!text-[#1890FF] rounded-md`,activeStyle)}
        disabledItemClassName="hover:!bg-transparent"
        current={current_page}
        total={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  )
}
