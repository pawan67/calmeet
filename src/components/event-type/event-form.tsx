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
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { getEventTypeById } from "@/lib/handlers/event-type";
import { useRouter } from "next/navigation";

interface EventTypeEditFormProps {
  id: string;
}

const EventTypeEditForm = ({ id }: EventTypeEditFormProps) => {
  const {
    data: eventType,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["event-type", id],
    queryFn: () => getEventTypeById(id),
  });

  const router = useRouter();

  if (isError) {
    router.push("/dashboard/event-types");
  }

  const [background, setBackground] = useState(
    eventType?.color ? eventType?.color : "#B4D455"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: eventType?.title ? eventType?.title : "",
      active: eventType?.active,
      color: eventType?.color ? eventType?.color : "#B4D455",
      description: eventType?.description ? eventType?.description : "",
      durationInMinutes: eventType?.durationInMinutes
        ? eventType?.durationInMinutes
        : 15,

      isDefault: eventType?.isDefault ? eventType?.isDefault : false,
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

  useEffect(() => {
    if (eventType) {
      setBackground(eventType.color);

      form.reset({
        title: eventType.title,
        active: eventType.active,
        color: eventType.color,
        description: eventType.description,
        durationInMinutes: eventType.durationInMinutes,
        isDefault: eventType.isDefault,
      });
    }
  }, [eventType]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await axios.put(`/api/event-type/${eventType?.id}`, values);
    },

    onSuccess: () => {
      toast.success("Event type updated!");
      queryClient.invalidateQueries();
    },

    onError: (error) => {
      toast.error("An error occurred. Please try again.");
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading event type...");
    } else {
      toast.dismiss();
    }
  }, [isLoading]);
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
          <FormField
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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

          <Input
            disabled
            value={`https://calmeet.vercel.app/video/${eventType?.id}`}
            placeholder="URL "
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
