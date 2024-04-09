import {
  IconCalendarEvent,
  IconCirclesRelation,
  IconClockHour4,
  IconDots,
  IconTimeDuration0,
  IconUserCircle,
} from "@tabler/icons-react";
import UserItem from "./user-item";
import { Button } from "@/components/ui/button";

const Navigation = () => {
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
      name: "More",
      icon: IconDots,
      url: "/dashboard/more",
      onlyForMobile: true,
    },
  ];
  return (
    <>
      <div className=" bg-secondary/40 backdrop-blur-md hidden md:block border-r px-4 py-4 w-[250px] h-screen">
        <UserItem />
        <div className=" space-y-1 mt-5">
          {navOptions.map((option, index) => {
            if (option.onlyForMobile) return null;
            return (
              <div className=" cursor-pointer rounded-md  hover:bg-primary/5  flex items-center gap-2 p-3 py-2 text-sm ">
                {<option.icon size={20} />}
                <span>{option.name}</span>
              </div>
            );
          })}
        </div>{" "}
      </div>

      {/* Navigation for mobile devices */}
      <div className=" bg-secondary/40 backdrop-blur-md border-t p-3 px-5  fixed inset-x-0 bottom-0  md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navOptions.map((option, index) => (
            <div className=" cursor-pointer text-muted-foreground hover:text-primary  flex flex-col items-center justify-center ">
              <option.icon size={20} />
              <span className=" text-xs mt-1">{option.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Header for mobile devices */}
      <header className=" bg-secondary/40 backdrop-blur-md  flex md:hidden items-center justify-between  p-2 px-4 border-b fixed top-0 inset-x-0">
        <div>
          <img src="/images/logo.png" alt="logo" className=" w-8" />
        </div>

        <div>
          <UserItem />
        </div>
      </header>
    </>
  );
};

export default Navigation;
