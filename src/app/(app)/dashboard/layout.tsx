"use client";
import { IconCalendarEvent, IconSearch, IconTimeDuration0 } from "@tabler/icons-react";
import UserItem from "../_components/user-item";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex ">
      <div className=" border-r px-4 py-4 w-[250px] h-screen">
        <UserItem />
        <div className=" space-y-1 mt-5">
          <div className=" rounded-md bg-muted hover:bg-primary/5  flex items-center gap-2 p-3 py-2 text-sm ">
            <IconCalendarEvent size={20} />
            <p>Events Types</p>
          </div>
          <div className=" rounded-md   flex hover:bg-primary/5 items-center gap-2 p-3 py-2 text-sm ">
            <IconCalendarEvent size={20} />
            <p>Bookings</p>
          </div>
          <div className=" rounded-md   flex hover:bg-primary/5 items-center gap-2 p-3 py-2 text-sm ">
            <IconTimeDuration0 size={20} />
            <p>Availability</p>
          </div>
        </div>
      </div>
      <div className=" p-5 flex-1">{children}</div>
    </div>
  );
};

export default Layout;
