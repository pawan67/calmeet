import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  params: {
    params: {
      id: string;
    };
  }
) {
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

    const eventType = await db.eventType.findUnique({
      where: {
        id: params.params.id,
      },
    });

    if (!eventType) {
      throw new Error("Event type not found");
    }

    return new Response(JSON.stringify(eventType));
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  params: {
    params: {
      id: string;
    };
  }
) {
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

    const body = await req.json();

    const { active, isDefault, color, description, durationInMinutes, title } =
      body;

    const eventType = await db.eventType.update({
      where: {
        id: params.params.id,
      },
      data: {
        active,
        isDefault,
        color,
        description,
        durationInMinutes,
        title,
      },
    });

    return new Response(JSON.stringify(eventType));
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  params: {
    params: {
      id: string;
    };
  }
) {
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

    const checkEventType = await db.eventType.findUnique({
      where: {
        id: params.params.id,
      },
    });

    if (!checkEventType) {
      return new Response(
        JSON.stringify({
          message: "Event type not found",
        }),
        { status: 404 }
      );
    }

    const eventType = await db.eventType.delete({
      where: {
        id: params.params.id,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Event type deleted",
      })
    );
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
