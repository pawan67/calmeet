"use client";
import { tokenProvider } from "@/actions/stream.actions";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from "react";
import FullPageLoader from "../shared/loader";
const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apikey) throw new Error("Stream API key not found");

    const client = new StreamVideoClient({
      apiKey: apikey,
      user: {
        id: user?.id,
        name: user?.fullName || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <FullPageLoader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export const VideoMeetingComponent = () => {
  return (
    <StreamClientProvider>
      <div>
        <h1>Video Meeting</h1>
      </div>
    </StreamClientProvider>
  );
};

export default StreamClientProvider;
