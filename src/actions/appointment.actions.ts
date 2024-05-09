"use server";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

import { db } from "@/lib/db";
import { generateAvailableSlots } from "@/lib/utils";
import { AppointmentSchema } from "@prisma/client";

export const availableSlots = async (
  currentDate: Date,
  eventAuthor: string
) => {
  try {
    const date = new Date(currentDate);
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 86400000); // 24 hours in milliseconds

    const bookedAppointments = await db.appointmentSchema.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
        userId: eventAuthor,
      },
    });

    const availableSlots = generateAvailableSlots(
      startOfDay,
      endOfDay,
      bookedAppointments
    );

    return availableSlots;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
