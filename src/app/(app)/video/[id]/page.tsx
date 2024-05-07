"use client";
import FullPageLoader from "@/components/shared/loader";
import { VideoMeetingComponent } from "@/components/video/video-meet";
import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useCallStateHooks,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function VideoMeetingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [callDetails, setCallDetails] = React.useState<Call>();
  const client = useStreamVideoClient();
  console.log("client", client);

  useEffect(() => {
    const call = client?.call("default", params.id);

    call?.join({
      create: true,
    });
    setCallDetails(call);
  }, []);

  return (
    <div>
      <StreamCall call={callDetails}>
        <MeetingRoom />
      </StreamCall>
    </div>
  );
}

const MeetingRoom = () => {
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <FullPageLoader />;
  const handleLeave = () => {
    window.location.href = "/dashboard";
  };

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls onLeave={handleLeave} />
    </StreamTheme>
  );
};

export default VideoMeetingPage;
