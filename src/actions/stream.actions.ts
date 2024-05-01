"use server";
import { StreamClient } from "@stream-io/node-sdk";

import { currentUser } from "@clerk/nextjs/server";

const apikey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apisecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not looged in");
  if (!apikey) throw new Error("Stream API key not found");
  if (!apisecret) throw new Error("Stream secret key not found");

  const client = new StreamClient(apikey, apisecret);
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, issued);

  return token;
};
