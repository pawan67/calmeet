"use client";
import { Clock9 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { UserInterface } from "@/lib/types/user";

const PublicProfileBooking = ({ user }: { user: UserInterface }) => {
  console.log(user);
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
          {[1, 2, 3].map((item, index) => {
            return (
              <EventTypeCard index={index} eventTypes={[1, 2, 3]} key={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EventTypeCard = ({
  index,
  eventTypes,
}: {
  index: number;
  eventTypes: any[];
}) => {
  return (
    <div>
      <Card
        className={cn(
          `  py-4 px-5 rounded-t-none rounded-b-none bg-primary-foreground flex items-center justify-between`,
          ` ${index == 0 && "rounded-t-md"} ${
            index == eventTypes.length - 1 && "rounded-b-md"
          }   `
        )}
        //   key={eventType.id}
      >
        <div>
          <h3 className="  text-sm font-semibold ">Title</h3>
          <p className="  text-muted-foreground line-clamp-2 font-medium">
            description
          </p>
          <Badge className=" px-1 rounded-sm mt-2" variant="default">
            <div className=" flex items-center gap-1 text-xs">
              <Clock9 size={14} /> 33m
            </div>
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default PublicProfileBooking;
