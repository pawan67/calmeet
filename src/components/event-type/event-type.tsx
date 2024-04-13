"use client";

import { IconDots, IconLink, IconPlus, IconView360 } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";

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
import React from "react";
import { Clock9, Pencil } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(3),
  color: z.string().optional(),
  durationInMinutes: z.number().int().optional(),
  isDefault: z.boolean().default(false),
  active: z.boolean().default(true),
  link: z.string().optional(),
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
      link: "",
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
              className="space-y-8 w-full max-h-[80vh] overflow-y-auto"
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
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription className=" line-clamp-1">
                      {`https://calmeet.vercel.app/${
                        field.value || "quick-chat"
                      }`}
                    </FormDescription>

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
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {eventTypes?.map(
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
              ) => {
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
                      <h3 className="  text-sm font-semibold ">
                        {eventType.title}
                      </h3>
                      <p className="  text-muted-foreground line-clamp-2 font-black">
                        {eventType.description}{" "}
                      </p>
                      <Badge
                        className=" px-1 rounded-sm mt-2"
                        variant="default"
                      >
                        <div className=" flex items-center gap-1 text-xs">
                          <Clock9 size={14} /> {eventType.durationInMinutes}m
                        </div>
                      </Badge>
                    </div>
                    <div className=" md:hidden">
                      <Button variant="ghost" size="icon">
                        <IconDots size={16} />
                      </Button>
                    </div>
                    <div className=" hidden md:flex ">
                      <Button variant="ghost" size="icon">
                        <IconView360 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconLink size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconDots size={16} />
                      </Button>
                    </div>
                  </Card>
                );
              }
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventTypeComponent;
