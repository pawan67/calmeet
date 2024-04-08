"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  return (
    <header className="py-8 flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <img className="w-10" src="/images/logo.png" alt="logo" />
        <h1 className=" font-semibold text-xl">Calmeet</h1>
      </div>
      <div>
        {isSignedIn ? (
          <Button className="  rounded-full font-semibold px-5">
            Enter Calmeet
          </Button>
        ) : (
          <SignInButton mode="modal">
            <Button className="  rounded-full font-semibold px-5">Login</Button>
          </SignInButton>
        )}
      </div>
    </header>
  );
};

export default Header;
