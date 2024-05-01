"use client";
import React from "react";
import { Calendar } from "../ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "@/actions/user.actions";
import { getEventTypeById } from "@/lib/handlers/event-type";
import { getEvent } from "@/actions/event.actions";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "@stream-io/video-react-sdk";

function EventBookingComponent({ id }: { id: string }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { data: eventType } = useQuery({
    queryKey: ["event-type", id],
    queryFn: () => getEvent(id),
  });

  const { data: author } = useQuery({
    queryKey: ["author", eventType?.authorId],
    queryFn: () => getAuthorById(eventType?.authorId as string),
    enabled: !!eventType,
  });

  return (
    <div className=" flex items-center justify-center">
      <div className="p-4 md:flex  mt-20  border rounded-md">
        <div className=" max-w-sm w-full p-2  pr-10  ">
          <div className=" flex  gap-3 ">
            <Avatar>
              <AvatarImage src={author?.imageUrl} />
            </Avatar>
          </div>

          <div>
            <h3 className=" text-lg font-semibold">{eventType?.title}</h3>
            <p className=" break-words text-sm text-muted-foreground font-semibold ">
              {eventType?.description}
            </p>
            <p className=" mt-1 text-sm text-muted-foreground font-semibold ">
              by {author?.firstName} {author?.lastName}
            </p>
          </div>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md  mt-5 md:mt-0 "
        />
      </div>
    </div>
  );
}

export default EventBookingComponent;
