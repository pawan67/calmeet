import { getAuth } from "@clerk/nextjs/server";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const custom_middleware =
  (...handlers: Function[]) =>
  async (req: NextRequest, res: NextResponse) => {
    try {
      await auth_middleware(req, res);

      for (const handler of handlers) {
        return await handler(req, res);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.statusCode }
        );
      } else {
        /// Log server errors using winston or your preferred logger
        console.log(error);
        return NextResponse.json(
          { message: "Server died for some reason" },
          { status: 500 }
        );
      }
    }
  };

const auth_middleware = async (req: NextRequest, res: NextResponse) => {
  const auth = getAuth(req);

  if (!auth) {
    throw new ApiError(401, "Unauthorized");
  }

  if (!auth.userId) {
    throw new ApiError(401, "Unauthorized");
  }
};
