"use server";

import { db } from "@/lib/db";
import { useAuth } from "@clerk/nextjs";
import { getAuthorById } from "./user.actions";
import sendEmail from "@/lib/utils/sendEmail";

type Booking = {
  eventId: string;
  startTime: Date;
  userId: string;
  title: string;
};
export const createBooking = async (booking: Booking) => {
  try {
    const eventType = await db.eventType.findUnique({
      where: {
        id: booking.eventId,
      },
    });

    if (!eventType) {
      throw new Error("Event not found");
    }

    let endTime;

    if (eventType.durationInMinutes) {
      endTime = new Date(
        booking.startTime.getTime() + eventType.durationInMinutes * 60000
      );
    }

    if (!endTime) {
      throw new Error("End time not found");
    }

    const newBooking = await db.booking.create({
      data: {
        eventId: booking.eventId,
        startTime: booking.startTime,
        endTime: endTime,
        title: booking.title,
        userId: booking.userId,
        host: eventType.authorId,
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
      <p>Title: ${booking.title}</p>
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

export const getAllBookings = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("User not found");
    }
    const bookings = await db.booking.findMany({
      where: {
        host: userId,
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
