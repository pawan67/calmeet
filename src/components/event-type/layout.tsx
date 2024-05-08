"use client";

import {
  IconArrowLeft,
  IconCalendar,
  IconChevronRight,
  IconLink,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { EventTypeRequest } from "@/lib/validators/event";
import { Prisma } from "@prisma/client";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import EventTypeEditForm from "./event-form";

const EventTypeFormLayout = ({ id }: { id: string }) => {
  const navLinks = [
    {
      name: "Event Setup",
      icon: IconLink,
      tabName: "setup",
      description: `Update`,
    },
    {
      name: "Availability",
      icon: IconCalendar,
      tabName: "availability",
      description: "Working hours",
    },
  ];

  const searchParams = useSearchParams();
  const tabName = searchParams.get("tabName");
  const router = useRouter();

  return (
    <div className=" ">
      <div className=" flex items-center  gap-2">
        <Button
          onClick={() => router.push("/dashboard/event-types")}
          variant="ghost"
          className="w-8 h-8 rounded-full "
          size={"icon"}
        >
          <IconArrowLeft size={16} />
        </Button>
        <span className=" font-semibold">Go back</span>
      </div>

      <div className=" md:absolute  flex items-center overflow-x-auto md:grid gap-1 mt-7">
        {navLinks.map((navLink) => (
          <NavTabs
            id={id}
            key={navLink.tabName}
            navLink={navLink}
            tabName={tabName}
          />
        ))}
      </div>

      <div className="mt-5 md:ml-[280px] ">
        <EventTypeEditForm id={id} />
      </div>
    </div>
  );
};

const NavTabs = ({
  navLink,
  tabName,
  id,
}: {
  navLink: {
    name: string;
    icon: any;
    tabName: string;
    description: string;
  };
  tabName: string | null;
  id: string;
}) => {
  return (
    <Link
      href={`/dashboard/event-types/${id}?tabName=${navLink.tabName}`}
      key={navLink.tabName}
      className={`px-5   p-3 rounded-md  cursor-pointer ${
        tabName === navLink.tabName && "bg-primary-foreground"
      } hover:bg-primary-foreground/40 w-[250px] flex items-center justify-between`}
    >
      <div className="   flex  gap-3 items-center ">
        <navLink.icon size={20} />

        <div>
          <span className=" font-medium">{navLink.name}</span>
          <p className=" text-sm text-muted-foreground ">
            {navLink.description}
          </p>
        </div>
      </div>
      <div>{tabName === navLink.tabName && <IconChevronRight size={20} />}</div>
    </Link>
  );
};

export default EventTypeFormLayout;
