"use client";
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const HomeComponent = () => {
  const { isSignedIn, isLoading, user } = useUser();

  console.log(user);

  return (
    <div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}

      <div>
        {isLoading ? (
          <></>
        ) : (
          <div>
            {isSignedIn ? (
              <div>
                <p>Welcome {user.firstName}!</p>
                <SignOutButton>
                  <Button>Sign Out</Button>
                </SignOutButton>
              </div>
            ) : (
              <p>Sign in to view your tasks!</p>
            )}
          </div>
        )}
      </div>
      <img src="/images/logo.png" alt="logo" />
    </div>
  );
};

export default HomeComponent;
