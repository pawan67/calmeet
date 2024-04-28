import { db } from "@/lib/db";
import { EventTypeValidator } from "@/lib/validators/event";
import { getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  revalidatePath(req.url);

  try {
    const auth = getAuth(req);

    if (!auth) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!auth.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const eventType = await db.eventType.findMany({
      where: {
        authorId: auth.userId,
      },
    });

    return new Response(JSON.stringify(eventType));
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = getAuth(req as NextRequest);

    if (!auth) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    if (!auth.userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();

    const {
      active,
      isDefault,
      color,
      description,
      durationInMinutes,
      link,
      title,
    } = EventTypeValidator.parse(body);

    await db.eventType.create({
      data: {
        active,
        isDefault,
        color,
        description,
        durationInMinutes,
        link,
        title,
        authorId: auth.userId,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Event type created!",
      })
    );
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const dynamic = "force-dynamic"; // defaults to auto
export const revalidate = 0;
