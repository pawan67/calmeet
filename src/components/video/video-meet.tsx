"use client";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const apiKey = "mmhfdzb5evj2"; // the API key can be found in the "Credentials" section
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmF5bmVfQ2FycmljayIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWmF5bmVfQ2FycmljayIsImlhdCI6MTcxNDQ3NTIzNywiZXhwIjoxNzE1MDgwMDQyfQ.-M8ihRgi_XXGcPtDVSmX_OuqPqq-KUSQwUYGGugcmqg"; // the token can be found in the "Credentials" section
const userId = "Zayne_Carrick"; // the user id can be found in the "Credentials" section
const callId = "4OsD3XEOQpef"; // the call id can be found in the "Credentials" section

// set up the user object
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

const VideoMeetingComponent = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
};

export default VideoMeetingComponent;

export const MyUILayout = () => {
  const call = useCall();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};
