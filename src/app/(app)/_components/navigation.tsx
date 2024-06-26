import {
  IconCalendarEvent,
  IconCirclesRelation,
  IconClockHour4,
  IconDots,
  IconSettings,
  IconTimeDuration0,
  IconUserCircle,
  IconWorld,
} from "@tabler/icons-react";
import UserItem from "./user-item";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/shared/mode-toggle";
import Link from "next/link";
import { UserProfile, useUser } from "@clerk/nextjs";

const Navigation = () => {
  const { user } = useUser();
  const navOptions = [
    {
      name: "Events Types",
      icon: IconCirclesRelation,
      url: "/dashboard/event-types",
    },
    {
      name: "Bookings",
      icon: IconCalendarEvent,
      url: "/dashboard/bookings",
    },
    {
      name: "Availability",
      icon: IconClockHour4,
      url: "/dashboard/availability",
    },
    {
      name: "Settings",
      icon: IconSettings,
      url: `/dashboard/settings`,
    },
    {
      name: "Public Profile",
      icon: IconWorld,
      url: `/${user?.id}`,
    },

    {
      name: "More",
      icon: IconDots,
      url: "/dashboard/more",
      onlyForMobile: true,
    },
  ];

  const pathname = usePathname();
  return (
    <>
      <div className=" fixed left-0 w-[230px] top-0 bottom-0  bg-secondary/40 backdrop-blur-md hidden md:block border-r px-4 py-4  h-screen">
        <div className="  space-y-3 mt-5">
          {navOptions.map((option, index) => {
            if (option.onlyForMobile) return null;
            return (
              <Link
                href={option.url}
                key={index}
                className={`cursor-pointer rounded-md ${
                  pathname == option.url && "bg-primary/20"
                }  hover:bg-primary/5  flex items-center gap-2 p-3 py-2 text-sm`}
              >
                {<option.icon size={20} />}
                <span>{option.name}</span>
              </Link>
            );
          })}
        </div>{" "}
      </div>

      {/* Navigation for mobile devices */}
      <div className=" bg-secondary/40 backdrop-blur-md border-t p-3 px-5  fixed inset-x-0 bottom-0  md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navOptions.map((option, index) => (
            <Link
              href={option.url}
              key={index}
              className={`cursor-pointer ${
                pathname == option.url
                  ? "text-primary"
                  : "text-muted-foreground"
              } hover:text-primary  flex flex-col items-center justify-center`}
            >
              <option.icon size={20} />
              <span className=" text-xs mt-1">{option.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Header for mobile devices */}
      <header className=" bg-secondary/40 backdrop-blur-md  flex md:hidden items-center justify-between  p-2 px-4 border-b fixed top-0 inset-x-0">
        <div>
          <img src="/images/logo.png" alt="logo" className=" w-8" />
        </div>
      </header>
    </>
  );
};

export default Navigation;
