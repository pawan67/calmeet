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
