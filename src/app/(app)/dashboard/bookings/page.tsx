"use client";

import {
  changeStatusOfBooking,
  deleteBookingById,
  getAllBookings,
} from "@/actions/booking.actions";
import { getAuthorById } from "@/actions/user.actions";
import { EventTypeSkeleton } from "@/components/profile/profile-page";
import CustomAlert from "@/components/shared/custom-alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useUser } from "@clerk/nextjs";
import { Booking, Prisma } from "@prisma/client";
import { IconDoorEnter, IconRowRemove, IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import NoData from "@/components/shared/no-data";

const BookingsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [selectedStatus, setSelectedStatus] = useState<
    "UPCOMING" | "CONFIRMED" | "CANCELLED" | "ENDED"
  >("UPCOMING");
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["bookings", selectedStatus, dateRange],
    queryFn: async () =>
      getAllBookings(user?.id as string, selectedStatus, dateRange),
  });

  return (
    <div>
      <p className=" text-muted-foreground">
        This is the bookings page. You can view all your bookings here.
      </p>

      <div className=" flex gap-5  items-center  mt-5">
        <Select
          onValueChange={(e) =>
            setSelectedStatus(
              e as "UPCOMING" | "CONFIRMED" | "CANCELLED" | "ENDED"
            )
          }
        >
          <SelectTrigger className="w-[180px] h-11">
            <SelectValue placeholder="Upcoming  " />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="UPCOMING">Upcoming</SelectItem>
            <SelectItem value="ENDED">Ended</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker
          onUpdate={(values) => setDateRange(values.range)}
          align="start"
          locale="en-GB"
          showCompare={false}
        />
      </div>

      <div className=" my-10 space-y-5">
        {isLoading &&
          [...Array(3)].map((_, index) => <EventTypeSkeleton key={index} />)}

        {data?.length === 0 && <NoData message="No Bookings found" />}
        {data?.map((booking: Booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

const BookingItem = ({ booking }: { booking: Booking }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["user", booking.userId],
    queryFn: async () => getAuthorById(booking.userId as string),
  });

  const { mutate: cancel } = useMutation({
    mutationFn: async () => changeStatusOfBooking(booking.id, "CANCELLED"),
    onSuccess: () => {
      toast.success("Booking has been cancelled");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("Error cancelling booking");
    },
  });
  const { mutate: ended } = useMutation({
    mutationFn: async () => changeStatusOfBooking(booking.id, "ENDED"),
    onSuccess: () => {
      toast.success("Booking has marked as done");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("Error marking as done");
    },
  });
  const { mutate: deleteBooking } = useMutation({
    mutationFn: async () => deleteBookingById(booking.id),
    onSuccess: () => {
      toast.success("Booking has been deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },

    onError: () => {
      toast.error("Error deleting booking");
    },
  });

  const router = useRouter();

  return (
    <Card>
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
            <p className="  ">{booking.note}</p>
            <p className=" text-sm">
              You and {data?.firstName} {data?.lastName}
            </p>
          </div>
        </div>

        <div className=" mt-5">
          <Link
            className=" text-sm text-blue-400 hover:underline"
            href={`/booking/${booking.id}`}
          >
            View Booking Details
          </Link>
          <div className=" flex gap-3  mt-3">
            {booking.status == "UPCOMING" && (
              <CustomAlert
                onAction={(e: any) => {
                  e.stopPropagation();
                  ended();
                }}
              >
                <Button size="sm" variant="ghost">
                  Mark as done
                </Button>
              </CustomAlert>
            )}

            {booking.status == "UPCOMING" && (
              <CustomAlert
                onAction={(e: any) => {
                  e.stopPropagation();
                  cancel();
                }}
              >
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </CustomAlert>
            )}

            <CustomAlert
              description="Are you sure you want to delete this booking? This action cannot be undone."
              onAction={(e: any) => {
                e.stopPropagation();
                deleteBooking();
              }}
            >
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </CustomAlert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsPage;
