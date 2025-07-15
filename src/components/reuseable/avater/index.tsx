import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn, PlaceholderImg } from "@/lib/utils"

type AvatarsProps = {
  className?: string
  alt: string
  src: string
  imgstyle?: string
  fallbackStyle?: string
  fallback:string
}

export default function Avatars({
  className,
  alt,
  src,
  imgstyle,
  fallbackStyle,
  fallback,
}: AvatarsProps) {
    // src
  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarImage className={imgstyle} src={PlaceholderImg(50,50)} alt={alt} />
      <AvatarFallback className={cn("bg-grays-place text-blacks", fallbackStyle)}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}
