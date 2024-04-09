"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
const Header = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  return (
    <header className="py-4 flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <img className="w-10" src="/images/logo.png" alt="logo" />
        <h1 className=" font-semibold text-xl">Calmeet</h1>
      </div>
      <div>
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button className="   font-semibold px-5">
              Enter Calmeet
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button className="   font-semibold px-5">Login</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Header;
