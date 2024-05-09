"use server";
import { db } from "@/lib/db";
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

    console.log("startOfDay", startOfDay, date, endOfDay);

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

    console.log(availableSlots);
    return availableSlots;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

function generateAvailableSlots(
  startOfDay: Date,
  endOfDay: Date,
  bookedAppointments: AppointmentSchema[]
) {
  const availableSlots: { 12: string; 24: string }[] = [];
  const slotDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
  let currentTime = startOfDay.getTime();
  const endTime = endOfDay.getTime();

  while (currentTime < endTime) {
    const slotStartTime = new Date(currentTime);
    const slotEndTime = new Date(currentTime + slotDuration);

    const isBooked = bookedAppointments.some((appointment) => {
      const appointmentStartTime = new Date(appointment.startTime);
      const appointmentEndTime = new Date(appointment.endTime);

      return (
        (appointmentStartTime >= slotStartTime &&
          appointmentStartTime < slotEndTime) ||
        (appointmentEndTime > slotStartTime &&
          appointmentEndTime <= slotEndTime) ||
        (appointmentStartTime < slotStartTime &&
          appointmentEndTime > slotEndTime)
      );
    });

    if (!isBooked) {
      const slotStart12HourFormat = formatTime(slotStartTime, "12");
      const slotStart24HourFormat = formatTime(slotStartTime, "24");
      availableSlots.push({
        12: slotStart12HourFormat,
        24: slotStart24HourFormat,
      });
    }

    currentTime += slotDuration;
  }

  return availableSlots;
}

function formatTime(date: Date, format: "12" | "24"): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = format === "12" ? ((hours + 11) % 12) + 1 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}${format === "12" ? ampm : ""}`;
}
