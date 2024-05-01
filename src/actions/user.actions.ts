"use server";
import { clerkClient } from "@clerk/nextjs/server";

export const getAuthorById = async (id: string) => {
  try {
    const user = await clerkClient.users.getUser(id);
    console.log("user", user, id);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("ERROR AT getAuthorById", error);
    throw new Error("Something went wrong");
  }
};
