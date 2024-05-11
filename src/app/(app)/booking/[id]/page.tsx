"use client";

import { getBookingById } from "@/actions/booking.actions";
import { getEvent } from "@/actions/event.actions";
import { getAuthorById } from "@/actions/user.actions";
import FullPageLoader from "@/components/shared/loader";
import Logo from "@/components/shared/logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SiMicrosoftoutlook } from "react-icons/si";
import { FaYahoo } from "react-icons/fa6";

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
  const { data, isLoading: isBookingLoading } = useQuery({
    queryKey: ["booking", params.id],
    queryFn: async () => getBookingById(params.id),
  });
  const { data: hostData, isLoading: isHostDataLoading } = useQuery({
    queryKey: ["host", data?.host],
    queryFn: async () => getAuthorById(data?.host as string),
    enabled: !!data,
  });
  const { data: attendeeData, isLoading: isAttendeeDataLoading } = useQuery({
    queryKey: ["attendee", data?.userId],
    queryFn: async () => getAuthorById(data?.userId as string),
    enabled: !!data,
  });

  if (isBookingLoading || isHostDataLoading || isAttendeeDataLoading)
    return <FullPageLoader />;

  const googleLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${
    data?.event?.title
  }&dates=${moment(data?.startTime).format("YYYYMMDDTHHmmss")}/${moment(
    data?.endTime
  ).format("YYYYMMDDTHHmmss")}&details=${
    data?.note
  }&location=https://calmeet.vercel.app/video/${data?.id}&sf=true&output=xml`;

  const outlookLink = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&subject=${
    data?.event?.title
  }&startdt=${moment(data?.startTime).format("YYYYMMDDTHHmmss")}&enddt=${moment(
    data?.endTime
  ).format("YYYYMMDDTHHmmss")}&body=${
    data?.note
  }&location=https://calmeet.vercel.app/video/${data?.id}`;

  const yahooLink = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${
    data?.event?.title
  }&st=${moment(data?.startTime).format("YYYYMMDDTHHmmss")}&et=${moment(
    data?.endTime
  ).format("YYYYMMDDTHHmmss")}&desc=${
    data?.note
  }&in_loc=https://calmeet.vercel.app/video/${data?.id}`;

  const icsLink = `data:text/calendar;charset=utf8,${encodeURIComponent(`
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${data?.event?.title}
DTSTART:${moment(data?.startTime).format("YYYYMMDDTHHmmss")}
DTEND:${moment(data?.endTime).format("YYYYMMDDTHHmmss")}
DESCRIPTION:${data?.note}
LOCATION:https://calmeet.vercel.app/video/${data?.id}
END:VEVENT
END:VCALENDAR
`)}`;

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
          <div className=" flex items-center gap-2 text-muted-foreground mb-5 font-semibold">
            <Logo size="sm" />
          </div>
          <div>
            <h4 className=" font-semibold">Note</h4>
            <p className="  mt-2  ">{data?.note}</p>
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
                target="_blank"
                rel="noreferrer noopener"
                href={googleLink}
              >
                <IconBrandGoogle />
              </Link>
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "outline",
                })}
                href={outlookLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                <SiMicrosoftoutlook />
              </Link>
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "outline",
                })}
                href={yahooLink}
                target="_blank"
                rel="noreferrer noopener"
              >
                <FaYahoo />
              </Link>
              <Link
                className={buttonVariants({
                  variant: "outline",
                })}
                href={icsLink}
              >
                ICS
              </Link>
            </div>
          </div>

          <Alert variant="destructive" className=" mt-10">
            <AlertDescription>
              Google’s new spam policy could prevent you from receiving any
              email and calendar notifications about this booking.
            </AlertDescription>
          </Alert>

          <div className=" mt-5 text-muted-foreground text-sm flex  items-center  space-x-2 ">
            <p>Powered by Calmeet</p>

            <Logo size="sm" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingPage;
