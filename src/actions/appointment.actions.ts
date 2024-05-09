"use server";

import { db } from "@/lib/db";
import { generateAvailableSlots } from "@/lib/utils";
import { AppointmentSchema } from "@prisma/client";
import { format, addMinutes } from 'date-fns';
import { toDate, formatInTimeZone, getTimezoneOffset } from 'date-fns-tz';



export const availableSlots = async (currentDate: Date, eventAuthor: string, timezone: string) => {
    try {
      const startOfDay = toDate(currentDate, { timeZone: timezone });
      const endOfDay = addMinutes(startOfDay, 1440); // 24 hours in minutes
  
      const bookedAppointments = await db.appointmentSchema.findMany({
        where: {
          startTime: { gte: startOfDay, lt: endOfDay },
          userId: eventAuthor,
        },
      });
  
      const availableSlots = generateAvailableSlots(startOfDay, endOfDay, bookedAppointments, timezone);
      return availableSlots;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
