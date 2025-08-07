"use client";
import YouTube from "react-youtube";

export default function YoutubePlayer({
  title,
  videoId,
}: {
  title: string;
  videoId: string;
}) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      title={title}
      className="aspect-video"
      videoId={videoId}
      iframeClassName="bg-background h-full w-full p-0"
      opts={opts}
    />
  );
}
