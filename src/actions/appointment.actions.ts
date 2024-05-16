"use server";

import { db } from "@/lib/db";
import { generateAvailableSlots } from "@/lib/utils";
import { AppointmentSchema } from "@prisma/client";
import { format, addMinutes } from "date-fns";
import { toDate, formatInTimeZone, getTimezoneOffset } from "date-fns-tz";

export const availableSlots = async (
  currentDate: Date,
  eventAuthor: string
) => {
  console.log("CURRENT DATE", currentDate);

  console.log("TRIGGERED");
  try {
    const date = new Date(currentDate);

    // Convert to UTC for consistent comparison with appointments
    date.setUTCHours(0, 0, 0, 0);

    const startOfDay = date;
    const endOfDay = new Date(startOfDay.getTime() + 86400000); // 24 hours in milliseconds

    console.log("START OF DAY", startOfDay);
    console.log("END OF DAY", endOfDay);
    const bookedAppointments = await db.appointmentSchema.findMany({
      where: {
        startTime: { gte: startOfDay, lt: endOfDay },
        userId: eventAuthor,
      },
    });

    console.log("BOOKED APPOINTMENTS", bookedAppointments);

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

export const getFormattedAppointments = async (userId: string) => {
  const appointments = await db.appointmentSchema.findMany({
    where: {
      OR: [{ userId: userId }, { attendeeId: userId }],
    },
    include: {
      booking: true,
    },
  });

  const formattedAppointments = appointments.map((appointment) => {
    return {
      title: appointment.title,
      start: appointment.startTime.toISOString(), // Include both date and time
      end: appointment.endTime.toISOString(), // Include both date and time for end
    };
  });

  return formattedAppointments;
};
