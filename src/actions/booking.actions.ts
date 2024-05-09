"use server";

import { db } from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { getAuthorById } from "./user.actions";
import sendEmail from "@/lib/utils/sendEmail";
import { DateRange } from "react-day-picker";

type Booking = {
  eventId: string;
  startTime: Date;
  userId: string;
  note: string;
  timeZone: string;
};
export const createBooking = async (booking: Booking) => {
  console.log(booking);
  try {
    const eventType = await db.eventType.findUnique({
      where: {
        id: booking.eventId,
      },
    });

    if (!eventType) {
      throw new Error("Event not found");
    }

    const startTimeDate = new Date(booking.startTime);

    let endTime = new Date(booking.startTime);

    if (eventType.durationInMinutes) {
      endTime.setMinutes(endTime.getMinutes() + eventType.durationInMinutes);
    }

    if (!endTime) {
      throw new Error("End time not found");
    }

    const newBooking = await db.booking.create({
      data: {
        eventId: booking.eventId,
        startTime: startTimeDate, // Assuming startTime is in user's timezone
        endTime: convertTimeToUTC(
          startTimeDate,
          eventType.durationInMinutes as number
        ), // Convert to UTC before calculation
        note: booking.note,
        userId: booking.userId,
        host: eventType.authorId,
        timeZone: booking.timeZone,
      },
    });

    await db.appointmentSchema.create({
      data: {
        userId: eventType.authorId,
        startTime: startTimeDate,
        endTime: endTime,
        bookingId: newBooking.id,
        timeZone: booking.timeZone,
      },
    });

    const hostUser = await getAuthorById(eventType.authorId);
    const attendeeUser = await getAuthorById(booking.userId);
    console.log("hostUser", hostUser.emailAddresses[0].emailAddress);
    await sendEmail({
      to: [
        hostUser.emailAddresses[0].emailAddress,
        attendeeUser.emailAddresses[0].emailAddress,
      ],
      subject: "New booking",
      html: `<p>Hi ${hostUser.firstName},</p>
      <p>${attendeeUser.firstName} has booked an event with you.</p>
      <p>Event: ${eventType.title}</p>
      <p>Start time: ${booking.startTime}</p>
      <p>Note: ${booking.note}</p>
      <p>Attendee: ${attendeeUser.firstName} ${attendeeUser.lastName}</p>
      <p>Email: ${attendeeUser.emailAddresses[0].emailAddress}</p>

      <p>Best regards,</p>
      <p>Calmeet</p>`,
    });

    return newBooking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

function convertTimeToUTC(startTime: Date, durationInMinutes?: number) {
  const utcStartTime = new Date(startTime.toISOString()); // Convert to UTC
  if (durationInMinutes) {
    utcStartTime.setMinutes(utcStartTime.getMinutes() + durationInMinutes);
  }
  return utcStartTime;
}
export const getAllBookings = async (
  userId: string,
  status: string,
  dateRange?: DateRange
) => {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    const bookings = await db.booking.findMany({
      where: {
        userId: userId,
        status: status,
        startTime: {
          gte: dateRange?.from,
          lte: dateRange?.to,
        },
      },
      include: {
        event: true,
      },
    });

    if (!bookings) {
      return [];
    }

    return bookings;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getBookingById = async (id: string) => {
  try {
    const booking = await db.booking.findUnique({
      where: {
        id: id,
      },
      include: {
        event: true,
      },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return booking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const changeStatusOfBooking = async (id: string, status: string) => {
  try {
    const booking = await db.booking.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    if (status === "CANCELLED" || status == "ENDED") {
      await db.appointmentSchema.deleteMany({
        where: {
          bookingId: id,
        },
      });
    }

    return booking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteBookingById = async (id: string) => {
  try {
    const booking = await db.booking.delete({
      where: {
        id: id,
      },
    });

    await db.appointmentSchema.deleteMany({
      where: {
        bookingId: id,
      },
    });

    return booking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
