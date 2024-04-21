"use client";

import {
  IconArrowLeft,
  IconCalendar,
  IconChevronRight,
  IconLink,
} from "@tabler/icons-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { EventTypeRequest } from "@/lib/validators/event";
import { Prisma } from "@prisma/client";
import { Form, FormProvider, useForm } from "react-hook-form";
import { formSchema } from "./event-type";
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

const EventTypeFormLayout = ({
  id,
  eventType,
}: {
  id: string;
  eventType: Prisma.EventTypeGetPayload<{
    select: {
      id: true;
      title: true;
      isDefault: true;
      active: true;
      color: true;
      durationInMinutes: true;
      link: true;
      description: true;
    };
  }>;
}) => {
  const navLinks = [
    {
      name: "Event Setup",
      icon: IconLink,
      tabName: "setup",
      description: `${eventType.durationInMinutes} mins`,
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: eventType.title,
      active: eventType.active,
      color: "",
      description: "",

      isDefault: eventType.isDefault,
      link: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }
  return (
    <div>
      <div className=" flex items-center  gap-2">
        <Button variant="ghost" className="w-8 h-8 rounded-full " size={"icon"}>
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
        <div className="bg-primary-foreground/10 p-5 rounded-md">
          <h1 className="text-xl font-semibold">Event Setup</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Set up your event type to get started
          </p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Quick Chat" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
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
