import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getFormattedAppointments } from "@/actions/appointment.actions";
import { LoadingIndicator } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function Calendar() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["user-events", userId],
    queryFn: () => getFormattedAppointments(userId as string),
    enabled: !!userId,
  });

  const handleEventClick = (info: any) => {
    console.log(info.event.title);
  };

  if (!data)
    return (
      <div className=" h-full flex justify-center items-center ">
        <Skeleton className=" w-full h-96  " />
      </div>
    );
  return (
    <FullCalendar
      eventClick={handleEventClick}
      events={data as any}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
}

function renderEventContent(eventInfo: {
  timeText: string;
  event: { title: string };
}) {
  return (
    <>
      <div>
        <b>{eventInfo.timeText}</b>
        {!!eventInfo.event.title && <i>{eventInfo.event.title}</i>}
      </div>
    </>
  );
}
