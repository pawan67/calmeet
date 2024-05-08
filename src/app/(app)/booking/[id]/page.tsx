"use client";

import { getBookingById } from "@/actions/booking.actions";
import { getEvent } from "@/actions/event.actions";
import { getAuthorById } from "@/actions/user.actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  IconBrandGoogle,
  IconBrandTeams,
  IconCircleCheck,
  IconExternalLink,
  IconShare2,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
const BookingPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data } = useQuery({
    queryKey: ["booking", params.id],
    queryFn: async () => getBookingById(params.id),
  });
  const { data: hostData } = useQuery({
    queryKey: ["host", data?.host],
    queryFn: async () => getAuthorById(data?.host as string),
    enabled: !!data,
  });
  const { data: attendeeData } = useQuery({
    queryKey: ["attendee", data?.userId],
    queryFn: async () => getAuthorById(data?.userId as string),
    enabled: !!data,
  });

  return (
    <div className=" container flex items-center justify-center">
      <Card className=" w-full max-w-xl mt-10">
        <CardHeader className=" text-center border-b   ">
          <IconCircleCheck className=" animate-pulse mx-auto h-20 w-20 text-green-500" />
          <h1 className=" mt-5 text-2xl font-bold">
            This meeting is scheduled
          </h1>
          <h3>
            We sent an email with a calendar invitation with the details to
            everyone.
          </h3>
        </CardHeader>

        <CardContent className=" mt-5">
          <div>
            <h4 className=" font-semibold">What</h4>
            <p className="  mt-2  ">{data?.title}</p>
          </div>
          <div className=" mt-5">
            <h4 className=" font-semibold">When</h4>
            <p className=" mt-2  ">
              {moment(data?.startTime).format("dddd")},{" "}
              {moment(data?.startTime).format("ll")} at{" "}
              {moment(data?.startTime).format("LT")} (
              {data?.event?.durationInMinutes} Mins)
            </p>
          </div>

          <div className=" mt-5">
            <h4 className=" font-semibold">Who</h4>

            <p className=" mt-2   ">
              {hostData?.firstName} {hostData?.lastName} <Badge>Host</Badge>
            </p>
            <p className=" text-muted-foreground">
              ({hostData?.emailAddresses[0].emailAddress})
            </p>
            <p className=" mt-3 ">
              {attendeeData?.firstName} {attendeeData?.lastName}
            </p>
            <p className=" text-muted-foreground">
              ({attendeeData?.emailAddresses[0].emailAddress})
            </p>
          </div>

          <div className=" mt-5">
            <h4 className=" font-semibold">Where</h4>
            <Link
              href={`/video/${data?.id}`}
              className=" flex items-center gap-2 mt-2  "
            >
              <span>Calmeet video</span>

              <IconExternalLink size={20} />
            </Link>
          </div>
        </CardContent>

        <CardFooter className=" flex-col ">
          <div className=" flex items-center gap-5 mt-5">
            <h3 className="  font-semibold">Add to calendar</h3>

            <div className=" flex gap-3  ">
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "outline",
                })}
                href={"/"}
              >
                <IconBrandGoogle />
              </Link>
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "outline",
                })}
                href={"/"}
              >
                <IconBrandTeams />
              </Link>
            </div>
          </div>

          <Alert variant="destructive" className=" mt-10">
            <AlertDescription>
              Google’s new spam policy could prevent you from receiving any
              email and calendar notifications about this booking.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingPage;
