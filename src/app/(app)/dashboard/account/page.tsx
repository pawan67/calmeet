"use client";
import { UserProfile } from "@clerk/nextjs";

const AccountPage = () => {
  return (
    <div className=" container">
      <UserProfile />
    </div>
  );
};

export default AccountPage;
