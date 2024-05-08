"use client";
import React, { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthorById } from "@/actions/user.actions";
import { getEventTypeById } from "@/lib/handlers/event-type";
import { getEvent } from "@/actions/event.actions";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@stream-io/video-react-sdk";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DropdownMenu, DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { createBooking } from "@/actions/booking.actions";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Logo from "../shared/logo";
import { ArrowLeft } from "lucide-react";
import FullPageLoader from "../shared/loader";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Value } from "@radix-ui/react-select";

function EventBookingComponent({ id }: { id: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [title, setTitle] = React.useState("");
  const [selectedTime, setSelectedTime] = React.useState("");
  const router = useRouter();
  const { user } = useUser();
  const { data: eventType, isLoading: isEventTypeLoading } = useQuery({
    queryKey: ["event-type", id],
    queryFn: () => getEvent(id),
  });

  useEffect(() => {
    if (!eventType) return;
    setTitle(
      `Quick ${eventType.durationInMinutes} mins meet for ${eventType.title}`
    );
  }, [eventType]);

  const { data: author, isLoading: isAuthorLoading } = useQuery({
    queryKey: ["author", eventType?.authorId],
    queryFn: () => getAuthorById(eventType?.authorId as string),
    enabled: !!eventType,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      // startime shoudl also include time selected

      const startTIme = new Date(date as Date) + "T" + selectedTime;

      const payload = {
        eventId: id,
        startTime: date as Date,
        userId: user?.id as string,
        title: title,
      };
      return await createBooking(payload);
    },

    onSuccess: (data) => {
      console.log(data);
      toast.success("Booking created successfully");

      router.push(`/booking/${data.id}`);
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  if (isEventTypeLoading || isAuthorLoading) return <FullPageLoader />;
  return (
    <div className=" flex items-center justify-center">
      <div className="p-4  max-w-md w-full  mt-20  ">
        <div className="   ">
          <div>
            <Logo size="sm" className=" mb-3" />
            <h3 className=" text-xl font-bold">{eventType?.title}</h3>
            <p className=" break-words  text-muted-foreground  ">
              {eventType?.description}
            </p>
          </div>

          <div>
            <div className=" mt-2">
              <h3 className=" text-sm ">
                By {author?.firstName} {author?.lastName}
              </h3>
            </div>
          </div>
        </div>

        {!date || !selectedTime ? (
          <div className=" flex gap-3     mt-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md p-0    "
            />
            <TimeSlot
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              duration={eventType?.durationInMinutes as number}
            />
          </div>
        ) : (
          <div>
            <div className=" mt-5">
              <div className=" mt-5">
                <div className=" mt-5">
                  <h4 className=" font-semibold">Title</h4>

                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    className=" mt-3"
                    value={title}
                  />
                </div>
                {date && (
                  <div className=" mt-5 ">
                    <h3 className=" font-semibold">When</h3>
                    <p className=" text-sm ">
                      {date.toDateString()}, {selectedTime} for{" "}
                      {eventType?.durationInMinutes} mins
                    </p>
                  </div>
                )}

                <div className=" mt-5">
                  <h3 className=" font-semibold">Where</h3>
                  <p className=" text-sm">Calmeet Video</p>
                </div>
                <div className=" mt-5">
                  <h3 className=" font-semibold">Host </h3>
                  <p className=" text-sm">
                    {author?.firstName} {author?.lastName}
                    <span className=" text-xs text-muted-foreground">
                      {" "}
                      ({author?.emailAddresses[0].emailAddress})
                    </span>
                  </p>
                </div>
                <div className=" mt-5">
                  <h3 className=" font-semibold">Attendee </h3>
                  <p className=" text-sm">
                    {user?.firstName} {user?.lastName}
                    <span className=" text-xs text-muted-foreground">
                      {" "}
                      ({user?.emailAddresses[0].emailAddress})
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <p className=" my-5 text-xs text-muted-foreground">
              By proceeding, you agree to our Terms and Privacy Policy.
            </p>
            <div className=" w-[50%] float-right flex items-center gap-3 mt-6">
              <Button
                className=" w-full"
                onClick={() => {
                  setDate(undefined);
                  setSelectedTime("");
                }}
                variant="ghost"
              >
                Back
              </Button>
              <Button
                className=" w-full"
                onClick={() => {
                  mutate();
                }}
                disabled={isPending}
              >
                {isPending ? "Booking..." : " Book"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TimeSlot = ({
  duration,
  selectedTime,
  setSelectedTime,
}: {
  duration: number;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}) => {
  const timeArray = [
    { label: "9:00 AM", value: "09:00:00" },
    { label: "9:15 AM", value: "09:15:00" },
    { label: "9:30 AM", value: "09:30:00" },
    { label: "9:45 AM", value: "09:45:00" },
    { label: "10:00 AM", value: "10:00:00" },
    { label: "10:15 AM", value: "10:15:00" },
    { label: "10:30 AM", value: "10:30:00" },
    { label: "10:45 AM", value: "10:45:00" },
    { label: "11:00 AM", value: "11:00:00" },
    { label: "11:15 AM", value: "11:15:00" },
    { label: "11:30 AM", value: "11:30:00" },
    { label: "11:45 AM", value: "11:45:00" },
    { label: "12:00 PM", value: "12:00:00" },
    { label: "12:15 PM", value: "12:15:00" },
    { label: "12:30 PM", value: "12:30:00" },
    { label: "12:45 PM", value: "12:45:00" },
    { label: "1:00 PM", value: "13:00:00" },
    { label: "1:15 PM", value: "13:15:00" },
    { label: "1:30 PM", value: "13:30:00" },
    { label: "1:45 PM", value: "13:45:00" },
    { label: "2:00 PM", value: "14:00:00" },
    { label: "2:15 PM", value: "14:15:00" },
    { label: "2:30 PM", value: "14:30:00" },
    { label: "2:45 PM", value: "14:45:00" },
    { label: "3:00 PM", value: "15:00:00" },
    { label: "3:15 PM", value: "15:15:00" },
    { label: "3:30 PM", value: "15:30:00" },
    { label: "3:45 PM", value: "15:45:00" },
    { label: "4:00 PM", value: "16:00:00" },
    { label: "4:15 PM", value: "16:15:00" },
    { label: "4:30 PM", value: "16:30:00" },
    { label: "4:45 PM", value: "16:45:00" },
    { label: "5:00 PM", value: "17:00:00" },
  ];

  return (
    <ScrollArea className=" h-[250px]  w-full     ">
      <div className=" flex flex-col gap-1 mr-3 ">
        {timeArray.map((time) => (
          <Button
            key={time.value}
            variant={selectedTime === time.value ? "default" : "outline"}
            onClick={() => {
              setSelectedTime(time.value);
            }}
            className="w-full"
          >
            {time.label}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default EventBookingComponent;
