import { authMiddleware } from "@clerk/nextjs";
import { ApiError } from "next/dist/server/api-utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
