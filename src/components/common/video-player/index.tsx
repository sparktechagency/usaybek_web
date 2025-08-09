"use client";
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

interface PlayerProps {
  src: string;
}

const PlayerBox = ({ src }: PlayerProps) => (
  <VideoPlayer className="overflow-hidden w-full h-[650px] rounded-lg border">
    <VideoPlayerContent
      // crossOrigin="true"
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
);

export default PlayerBox;
