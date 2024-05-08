"use client";
import MeetingRoom from "@/components/meeting/meeting-room";
import MeetingSetup from "@/components/meeting/meeting-setup";
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
import React, { useEffect, useState } from "react";

function VideoMeetingPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);

  const [callDetails, setCallDetails] = React.useState<Call>();
  const client = useStreamVideoClient();
  console.log("client", client);

  useEffect(() => {
    const call = client?.call("default", params.id);

    setCallDetails(call);
  }, []);

  if (!callDetails) return <FullPageLoader />;

  return (
    <div>
      <StreamCall call={callDetails}>
        {!isSetupComplete ? (
          <MeetingSetup
            call={callDetails}
            setIsSetupComplete={setIsSetupComplete}
          />
        ) : (
          <MeetingRoom />
        )}
      </StreamCall>
    </div>
  );
}

// const MeetingRoom = () => {
//   const { useCallCallingState } = useCallStateHooks();
//   const [showParticipants, setShowParticipants] = useState(false);

//   // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
//   const callingState = useCallCallingState();

//   if (callingState !== CallingState.JOINED) return <FullPageLoader />;
//   const handleLeave = () => {
//     window.location.href = "/dashboard";
//   };

//   return (
//     <StreamTheme>
//       <SpeakerLayout participantsBarPosition="bottom" />
//       <CallControls onLeave={handleLeave} />
//     </StreamTheme>
//   );
// };

export default VideoMeetingPage;
