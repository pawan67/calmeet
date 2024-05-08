"use client";
import { useEffect, useState } from "react";
import {
  Call,
  DeviceSettings,
  StreamTheme,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const MeetingSetup = ({
  setIsSetupComplete,
  call,
}: {
  setIsSetupComplete: (value: boolean) => void;
  call: Call;
}) => {
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);
  const router = useRouter();
  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return <Alert title="The call has been ended by the host" />;

  return (
    <StreamTheme>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className=" fixed top-5 left-5 "
        >
          <IconArrowBack className=" mr-2" /> Back
        </Button>
        <h1 className="text-center text-2xl font-bold">Setup</h1>
        <VideoPreview className=" rounded-lg" />
        <div className="flex h-16 items-center justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <Checkbox
              checked={isMicCamToggled}
              onCheckedChange={() => {
                setIsMicCamToggled((prev) => !prev);
              }}
            />
            Join with mic and camera off
          </label>

          <DeviceSettings />
        </div>
        <div>
          <Button
            className="rounded-md bg-green-500 px-4 py-2.5"
            onClick={() => {
              call.join({
                create: true
              });

              setIsSetupComplete(true);
            }}
          >
            Join meeting
          </Button>
        </div>
      </div>
    </StreamTheme>
  );
};

export default MeetingSetup;
