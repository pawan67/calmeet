import { AppointmentSchema } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { formatInTimeZone, toDate } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateScale({
  name,
  isOverlay = false,
}: {
  name: string;
  isOverlay?: boolean;
}) {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;
    if (isOverlay) {
      return [[`a${id}`, `var(--${name}-a${id})`]];
    }
    return [
      [id, `var(--${name}-${id})`],
      [`a${id}`, `var(--${name}-a${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
}




export function generateAvailableSlots(
  startOfDay: Date,
  endOfDay: Date,
  bookedAppointments: AppointmentSchema[],
  timezone: string
) {
  const availableSlots: { 12: string; 24: string }[] = [];
  const slotDuration = 30; // 30 minutes in minutes
  let currentTime = startOfDay.getTime();
  const endTime = endOfDay.getTime();

  while (currentTime < endTime) {
    const slotStartTime = new Date(currentTime);
    const slotEndTime = new Date(currentTime + slotDuration * 60 * 1000); // Convert duration to milliseconds

    const isBooked = bookedAppointments.some((appointment) => {
      const appointmentStartTime = toDate(appointment.startTime, { timeZone: timezone });
      const appointmentEndTime = toDate(appointment.endTime, { timeZone: timezone });

      return (
        (appointmentStartTime >= slotStartTime && appointmentStartTime < slotEndTime) ||
        (appointmentEndTime > slotStartTime && appointmentEndTime <= slotEndTime) ||
        (appointmentStartTime < slotStartTime && appointmentEndTime > slotEndTime)
      );
    });

    if (!isBooked) {
      const slotStart12HourFormat = formatInTimeZone(slotStartTime, 'h:mm a', { timeZone: timezone });
      const slotStart24HourFormat = formatInTimeZone(slotStartTime, 'HH:mm', { timeZone: timezone });
      availableSlots.push({
        12: slotStart12HourFormat,
        24: slotStart24HourFormat,
      });
    }

    currentTime += slotDuration * 60 * 1000; // Move to the next slot in milliseconds
  }

  return availableSlots;
}


export function formatTime(date: Date, format: "12" | "24"): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = format === "12" ? ((hours + 11) % 12) + 1 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}${format === "12" ? ampm : ""}`;
}

