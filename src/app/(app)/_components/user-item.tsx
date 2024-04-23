"use client";

import { ModeToggle } from "@/components/shared/mode-toggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ChevronsLeftRight } from "lucide-react";

import { UserButton } from "@clerk/nextjs";

const UserItem = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <div
        role="button"
        className=" flex items-center justify-between text-sm px-3 py-2 w-full rounded-md "
      >
        <div className=" mr-4 gap-x-2 flex items-center max-w-[150px]">
         

          <UserButton afterSignOutUrl="/" />
          <span>
            {user?.firstName} {user?.lastName}{" "}
          </span>
        </div>
        {/* <ChevronsLeftRight className=" h-4 w-4 rotate-90 text-muted-foreground ml-2 " /> */}
      </div>
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>

    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className=" w-60 "
    //     align="start"
    //     alignOffset={11}
    //     forceMount
    //   >
    //     <div className="flex flex-col space-y-4 p-2">
    //       <p className="text-xs font-medium leading-none text-muted-foreground">
    //         {user?.emailAddresses[0].emailAddress}
    //       </p>
    //       <div className="flex items-center gap-x-2">
    //         <div className="rounded-md  p-1">
    //           <UserButton />
    //         </div>
    //         <div className="space-y-1">
    //           <p className="text-sm line-clamp-1">
    //             {user?.fullName}&apos;s Calmeet
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <DropdownMenuItem className="w-full cursor-pointer ">
    //       My Profile
    //     </DropdownMenuItem>
    //     <DropdownMenuItem className="w-full cursor-pointer ">
    //       My Settings
    //     </DropdownMenuItem>

    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem
    //       asChild
    //       className="w-full cursor-pointer text-muted-foreground"
    //     >
    //       <SignOutButton>Log out</SignOutButton>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
};

export default UserItem;
