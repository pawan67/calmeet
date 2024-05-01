"use client";
import { Clock9 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { UserInterface } from "@/lib/types/user";
import { getUserEvents } from "@/actions/event.actions";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

const PublicProfileBooking = ({ user }: { user: UserInterface }) => {
  console.log(user);

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-events", user.id],
    queryFn: () => getUserEvents(user.id),
  });

  return (
    <div className=" flex  justify-center  ">
      <div className="  max-w-xl w-full mt-10">
        <div className=" flex items-center justify-center flex-col gap-2 ">
          <Avatar className=" w-20 h-20">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.firstName[0]} {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <h2 className=" text-3xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <div className=" mt-7">
          {isLoading && <EventTypeSkeleton />}
          {events?.map((item, index) => {
            return (
              <EventTypeCard
                index={index}
                eventType={item}
                eventTypes={events}
                key={item?.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EventTypeSkeleton = () => {
  return (
    <div>
      <Card className=" py-4 px-5   gap-1 space-y-2 flex items-center justify-between">
        <div>
          <Skeleton className=" h-4 w-20" />
          <Skeleton className=" h-4  w-60 mt-1" />
          <Skeleton className=" h-4  w-64 mt-1" />
          <Skeleton className=" h-4 w-10 mt-2" />
        </div>
      </Card>
    </div>
  );
};

const EventTypeCard = ({
  index,
  eventTypes,
  eventType,
}: {
  index: number;
  eventTypes: any[];
  eventType: Prisma.EventTypeGetPayload<{
    select: Prisma.EventTypeSelect;
  }>;
}) => {
  return (
    <div>
      <Card
        className={cn(
          `  py-4 px-5 rounded-t-none  rounded-b-none bg-primary-foreground flex items-center justify-between`,
          ` ${index == 0 && "rounded-t-md"} ${
            index == eventTypes.length - 1 && "rounded-b-md"
          }   `
        )}
        //   key={eventType.id}
      >
        <div>
          <h3 className="  text-sm font-semibold ">{eventType?.title}</h3>
          <p className="  text-muted-foreground line-clamp-2 font-medium">
            {eventType?.description}
          </p>
          <Badge className=" px-1 rounded-sm mt-2" variant="default">
            <div className=" flex items-center gap-1 text-xs">
              <Clock9 size={14} /> {eventType?.durationInMinutes} mins
            </div>
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default PublicProfileBooking;
