import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

/**
 * @swagger
 * /api/event-type:
 *   get:
 *     description: Returns auth user
 *     responses:
 *       200:
 *         description: Auth!
 */
export async function GET(req: NextApiRequest) {
  try {
    const auth = getAuth(req);
    console.log("AUTH", auth);

    return new Response(JSON.stringify(auth));
  } catch (error) {
    console.log("ERROR", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function POST(req: NextApiRequest) {
  try {
    const auth = getAuth(req);
    if (!auth) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.body;

    return new Response(JSON.stringify({ body, auth }));
  } catch (error) {}
}
