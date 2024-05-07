import StreamClientProvider from "@/components/video/video-meet";

const VideoLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <StreamClientProvider>{children}</StreamClientProvider>;
};

export default VideoLayoutPage;
