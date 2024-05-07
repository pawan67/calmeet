import PublicProfileBooking from "@/components/profile/profile-page";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

const UserUserNamePage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  return <PublicProfileBooking userId={params.userId} />;
};

export default UserUserNamePage;
