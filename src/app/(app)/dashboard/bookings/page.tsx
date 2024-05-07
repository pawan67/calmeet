"use client";

import { getAllBookings } from "@/actions/booking.actions";
import { getAuthorById } from "@/actions/user.actions";
import { EventTypeSkeleton } from "@/components/profile/profile-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { Booking, Prisma } from "@prisma/client";
import { IconRowRemove, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BookingsPage = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => getAllBookings(user?.id as string),
  });

  return (
    <div>
      <h1 className=" text-xl font-semibold ">Bookings Page</h1>

      <p className=" text-muted-foreground">
        This is the bookings page. You can view all your bookings here.
      </p>
      <div className=" my-10 space-y-5">
        {isLoading &&
          [...Array(3)].map((_, index) => <EventTypeSkeleton key={index} />)}
        {data?.map((booking: Booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const BookingItem = ({ booking }: { booking: Booking }) => {
  const { data } = useQuery({
    queryKey: ["user", booking.userId],
    queryFn: async () => getAuthorById(booking.userId as string),
  });

  const router = useRouter();

  return (
    <Card
      onClick={() => {
        router.push(`/booking/${booking.id}`);
      }}
    >
      <CardContent className=" items-center sm:flex justify-between pt-4">
        <div className=" flex space-x-10 ">
          <div className=" min-w-[170px]">
            <h3 className="  ">
              <span>{moment(booking.startTime).format("dddd")}</span>,{" "}
              <span>{moment(booking.startTime).format("ll")}</span>
            </h3>
            <div className=" text-sm">
              <span>{moment(booking.startTime).format("LT")}</span> -{" "}
              <span>{moment(booking.endTime).format("LT")}</span>
            </div>
            <Link
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={`/video/${booking.id}`}
              className=" mt-2 text-blue-400 text-sm hover:underline  "
            >
              Join Calmeet Video
            </Link>
          </div>

          <div>
            <p className="  ">{booking.title}</p>
            <p className=" text-sm">
              You and {data?.firstName} {data?.lastName}
            </p>
          </div>
        </div>

        <div className=" mt-5 sm:mt-0">
          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="outline"
          >
            <IconX size={20} className=" mr-2" />
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsPage;
