"use server";

import { db } from "@/lib/db";

export const getUserEvents = async (userId: string) => {
  const events = await db.eventType.findMany({
    where: {
      authorId: userId,
    },
  });

  return events;
};

export const getEvent = async (eventId: string) => {
  try {
    const event = await db.eventType.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) return null;
    return event;
  } catch (error) {
    console.error("ERROR AT getEvent", error);
    throw new Error("Something went wrong");
  }
};
