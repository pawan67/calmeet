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

export const getUserByUsername = async (username: string) => {
  try {
    const users = await clerkClient.users.getUserList();
    const user = users.find((user) => user.username === username);

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("ERROR AT getUserByUsername", error);
    throw new Error("Something went wrong");
  }
};

export const changeThemeOfUser = async (id: string, theme: string) => {
  try {
    const user = await clerkClient.users.updateUser(id, {
      publicMetadata: {
        theme,
      },
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("ERROR AT changeThemeOfUser", error);
    throw new Error("Something went wrong");
  }
};
