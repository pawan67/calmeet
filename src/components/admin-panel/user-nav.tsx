"use client";


import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export function UserNav() {
 
  return (
    <>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
