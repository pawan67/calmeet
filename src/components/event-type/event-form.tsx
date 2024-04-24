import { FormProvider, useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./event-type";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Prisma } from "@prisma/client";
import { GradientPicker } from "../ui/GradientPicker";
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface EventTypeEditFormProps {
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
}

const EventTypeEditForm = ({ eventType }: EventTypeEditFormProps) => {
  const [background, setBackground] = useState(
    eventType.color ? eventType.color : "#B4D455"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: eventType.title,
      active: eventType.active,
      color: eventType.color ? eventType.color : "#B4D455",
      description: eventType.description ? eventType.description : "",
      durationInMinutes: eventType.durationInMinutes
        ? eventType.durationInMinutes
        : 15,

      isDefault: eventType.isDefault ? eventType.isDefault : false,
      link: eventType.link ? eventType.link : "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const payload = {
      ...values,
      color: background,
    };

    mutate(payload);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axios.put(`/api/event-type/${eventType.id}`, values);
    },

    onSuccess: () => {
      toast.success("Event type updated");
    },

    onError: (error) => {
      console.error(error);
      toast.error("Failed to update event type");
    },
  });
  return (
    <>
      <div
        style={{
          background: background,
        }}
        className=" p-5 rounded-md mb-5"
      >
        <h1
          style={{
            mixBlendMode: "difference",
          }}
          className="text-xl font-semibold"
        >
          Event Setup
        </h1>
        <p
          style={{
            mixBlendMode: "difference",
          }}
          className=" text-sm mt-2"
        >
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
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
                  <Input placeholder="Duration in minutes" {...field} />
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
                  <Input placeholder="URL " {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Theme</FormLabel>

            <GradientPicker
              className=" block"
              background={background}
              setBackground={setBackground}
            />
          </FormItem>

          <Button disabled={isPending} type="submit">
            {isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default EventTypeEditForm;
