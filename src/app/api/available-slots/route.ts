import { db } from "@/lib/db";
import { generateAvailableSlots } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  revalidatePath(req.url);

  const currentDate = req.nextUrl.searchParams.get("date");
  const eventAuthor = req.nextUrl.searchParams.get("eventAuthor");

  try {
    if (!eventAuthor) {
      return new Response(JSON.stringify({ error: "Event ID not provided" }), {
        status: 400,
      });
    }

    if (!currentDate) {
      return new Response(JSON.stringify({ error: "Date not provided" }), {
        status: 400,
      });
    }

    const date = new Date(currentDate);

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(startOfDay.getTime() + 86400000); // 24 hours in milliseconds

    console.log("START OF DAY", startOfDay);
    console.log("END OF DAY", endOfDay);
    const bookedAppointments = await db.appointmentSchema.findMany({
      where: {
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
        userId: eventAuthor,
      },
    });

    console.log("BOOKED APPOINTMENTS", bookedAppointments);

    const availableSlots = generateAvailableSlots(
      startOfDay,
      endOfDay,
      bookedAppointments
    );

    return new Response(JSON.stringify(availableSlots));
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
