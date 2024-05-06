"use server";

import { db } from "@/lib/db";

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
      },
    });

    return newBooking;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
