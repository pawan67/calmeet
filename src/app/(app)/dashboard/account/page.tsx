"use client";
import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
  return (
    <div className=" w-full">
      <UserProfile  />
    </div>
  );
};

export default AccountPage;
