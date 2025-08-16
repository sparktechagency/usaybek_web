"use client";
import { Skeleton } from "@/components/ui";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/ui/kibo-ui/video-player";
import { cn } from "@/lib";

interface PlayerProps {
  src?: string;
  className?: string;
  thumbnail?: string;
}

const PlayerBox = ({ src, className, thumbnail }: PlayerProps) =>
  src ? (
    <VideoPlayer
      className={cn(
        "overflow-hidden w-full h-[650px] rounded-lg border",
        className
      )}
    >
      <VideoPlayerContent
        // crossOrigin="anonymous"
        preload="metadata"
        autoPlay={true}
        slot="media"
        // controls={false}
        src={src}
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer>
  ) : (
    <div
      className={cn(
        "overflow-hidden w-full h-[650px] rounded-lg border",
        className
      )}
    >
      <Skeleton className="w-full h-full bg-blacks/5" />
    </div>
  );

export default PlayerBox;
