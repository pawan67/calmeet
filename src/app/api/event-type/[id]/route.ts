import { db } from "@/lib/db";
import { custom_middleware } from "@/lib/middleware";
import { getAuth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { ApiError } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function fetchEventWithId(
  req: NextRequest,
  params: {
    params: {
      id: string;
    };
  }
) {
  try {
    const eventType = await db.eventType.findUnique({
      where: {
        id: params.params.id,
      },
    });

    if (!eventType) {
      throw new ApiError(404, "Event type not found");
    }

    return NextResponse.json(eventType);
  } catch (error: any) {
    if (error) {
      throw new ApiError(error.statusCode, error.message);
    }
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

    const {
      active,
      isDefault,
      color,
      description,
      durationInMinutes,
      title,
      link,
    } = body;

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
        link,
      },
    });

    return new Response(JSON.stringify(eventType));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    throw e;

    return new Response(JSON.stringify(e), { status: 500 });
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const GET = custom_middleware(fetchEventWithId);
