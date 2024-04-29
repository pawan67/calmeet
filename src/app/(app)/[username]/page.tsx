import PublicProfileBooking from "@/components/profile/profile-page";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const UserUserNamePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const users = await clerkClient.users.getUserList();

  console.log(users);

  const user = users.find((user) => user.username === params.username);

  console.log(user);

  if (!user) {
    notFound();
  }

  return <PublicProfileBooking user={JSON.parse(JSON.stringify(user))} />;
};

export default UserUserNamePage;
