"use client";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
const Header = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  return (
    <div className=" fixed z-[100000] top-0 inset-x-0 px-4 container">
      <header className="   py-4 flex items-center justify-between">
        <div className=" flex items-center gap-3">
          <img className="w-10" src="/images/logo.png" alt="logo" />
          <h1 className=" font-semibold text-xl">Calmeet</h1>
        </div>
        <div>
          {isSignedIn ? (
            <Link href="/dashboard">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Enter Calmeet
                </span>
              </ShimmerButton>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Login
                </span>
              </ShimmerButton>
            </SignInButton>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
