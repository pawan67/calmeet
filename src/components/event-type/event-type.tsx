"use client";

import { IconDots, IconLink, IconPlus, IconView360 } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventTypeValidator } from "@/lib/validators/event";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import React, { useEffect } from "react";
import { Clock9, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { EventTypeSkeleton } from "../profile/profile-page";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import NoData from "../shared/no-data";

export const formSchema = z.object({
  title: z.string().min(3),
  color: z.string().optional(),
  durationInMinutes: z.coerce.number().min(10).max(3600).int().optional(),
  isDefault: z.boolean().default(false),
  active: z.boolean().default(true),
  description: z.string().optional(),
});
const EventTypeComponent = () => {
  const [open, setOpen] = React.useState(false);
  const {
    data: eventTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event-types"],
    queryFn: async () => {
      const res = await axios.get("/api/event-type");
      return res.data;
    },
  });

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      active: true,
      color: "",
      description: "",
      durationInMinutes: 15,
      isDefault: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    mutate(values);
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-event-type"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await axios.post("/api/event-type", values);
      return res.data;
    },
    onSuccess: () => {
      form.reset();
      toast.success("Event has been created.");
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["event-types"],
      });
    },

    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const router = useRouter();

  return (
    <div>
      <div className=" hidden  md:flex w-full justify-between">
        <div>
          <h3 className=" font-bold text-xl">Event Types</h3>
          <p className=" text-muted-foreground">
            Create events to share for people to book on your calendar.
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setOpen(true);
            }}
            size="sm"
          >
            <IconPlus className=" mr-1" size={20} />
            New
          </Button>
        </div>
      </div>

      <Button
        onClick={() => {
          setOpen(true);
        }}
        className=" md:hidden rounded-full fixed right-5 bottom-24"
        size="icon"
      >
        <IconPlus />
      </Button>

      <Dialog
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
        open={open}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new event type</DialogTitle>
            <DialogDescription>
              Create a new event type for people to book times with.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8  "
            >
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationInMinutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input defaultValue={15} type="number" {...field} />
                    </FormControl>

                    <FormDescription>
                      How long should this event be scheduled for? (in minutes)
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} className=" w-full" type="submit">
                {isPending ? "Creating..." : "Create"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <div className=" mt-5 grid ">
        {eventTypes?.length === 0 && (
          <NoData message="No Event Types found, please create one" />
        )}
        {isLoading ? (
          <div className=" space-y-5">
            {[1, 2].map((item) => (
              <EventTypeSkeleton key={item} />
            ))}
          </div>
        ) : (
          <>
            {eventTypes.map(
              (
                eventType: {
                  id: string;
                  title: string;
                  description: string;
                  link: string;
                  color: string;
                  durationInMinutes: number;
                },
                index: number
              ) => (
                <EventTypeCard
                  eventTypes={eventTypes}
                  key={eventType.id}
                  eventType={eventType}
                  index={index}
                />
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

const EventTypeCard = ({
  eventType,
  index,
  eventTypes,
}: {
  eventType: {
    id: string;
    title: string;
    description: string;
    link: string;
    color: string;
    durationInMinutes: number;
  };
  index: number;
  eventTypes: any;
}) => {
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(
      `https://calmeet.vercel.app/event-book/${eventType?.id}`
    );
    toast.success("Link copied to clipboard.");
  };

  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useUser();

  const { mutate: deleteEventType, isPending } = useMutation({
    mutationKey: ["delete-event-type"],
    mutationFn: async () => {
      await axios.delete(`/api/event-type/${eventType.id}`);
    },
    onSuccess: () => {
      toast.success("Event has been deleted.");
      queryClient.invalidateQueries();
    },

    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <Card
      className={cn(
        `  py-4 px-5 rounded-t-none rounded-b-none bg-primary-foreground flex items-center justify-between`,
        ` ${index == 0 && "rounded-t-md"} ${
          index == eventTypes.length - 1 && "rounded-b-md"
        }   `
      )}
      key={eventType.id}
    >
      <div>
        <h3 className="  text-sm font-semibold ">{eventType.title}</h3>
        <p className="  text-muted-foreground line-clamp-2 font-medium">
          {eventType.description}{" "}
        </p>
        <Badge className=" px-1 rounded-sm mt-2" variant="default">
          <div className=" flex items-center gap-1 text-xs">
            <Clock9 size={14} /> {eventType.durationInMinutes}m
          </div>
        </Badge>
      </div>

      <div className=" flex ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link
                target="_blank"
                rel="noreferrer"
                href={`/event-book/${eventType?.id}`}
              >
                <Button className="hidden md:flex" variant="ghost" size="icon">
                  <IconView360 size={16} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Preview</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="hidden md:flex"
                onClick={copyLinkToClipboard}
                variant="ghost"
                size="icon"
              >
                <IconLink size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy link to event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDots size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/dashboard/event-types/${eventType.id}?tabName=setup`
                )
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className=" md:hidden "
              onClick={() => {
                window.open(`/event-book/${eventType.id}`);
              }}
            >
              Go to event
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" md:hidden "
              onClick={() => {
                copyLinkToClipboard();
              }}
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteEventType();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default EventTypeComponent;
