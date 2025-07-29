import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

interface ImgProps {
    src: any
    alt: string
    className?: string
    imgStyle?: string
}

export  function ImgBox({ src, alt, className, imgStyle }: ImgProps) {
    return (
        <div className={cn(`w-[500px] h-[330px] relative overflow-hidden rounded-md`, className)}>
            <Image
                src={src}
                alt={alt}
                fill
                className={cn(`object-cover object-center`, imgStyle)}
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    )
}