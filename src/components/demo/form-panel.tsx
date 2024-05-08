import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { UserPlus, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneInput } from "../phone-input";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/actions/booking.actions";
import { toast } from "sonner";
import { EventType } from "@prisma/client";

type Guest = {
  email: string;
};

export function FormPanel({ eventType }: { eventType: EventType }) {
  const { user, isLoaded } = useUser();
  const [note, setNote] = React.useState("");
  const router = useRouter();

  const [guests, setGuests] = React.useState<Guest[]>([]);

  const addGuest = () => {
    setGuests([...guests, { email: "" }]);
  };

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, email: string) => {
    setGuests(guests.map((guest, i) => (i === index ? { email } : guest)));
  };

  const hasGuests = guests.length > 0;
  const searchParams = useSearchParams();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      // startime shoudl also include time selected

      const payload = {
        eventId: eventType.id,
        startTime: searchParams.get("slot") as unknown as Date,
        userId: user?.id as string,
        note: note,
      };
      return await createBooking(payload);
    },

    onSuccess: (data) => {
      console.log(data);
      toast.success("Booking created successfully");

      router.push(`/booking/${data.id}`);
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  if (!isLoaded && !user) return null;

  return (
    <form className="flex flex-col gap-5 w-[360px]">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Your name *</Label>
        <Input id="name" defaultValue={user?.fullName as string} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email address *</Label>
        <Input
          id="email"
          type="email"
          defaultValue={user?.emailAddresses[0].emailAddress as string}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Additional notes</Label>
        <Textarea
          id="notes"
          placeholder="Please share anything that will help prepare for our meeting"
        />
      </div>
      {hasGuests && (
        <>
          <Label htmlFor="email">Add guests</Label>
          <div className="flex flex-col gap-1">
            {guests.map((guest, index) => (
              <div key={index} className="flex items-center space-x-2 relative">
                <Input
                  id="guest"
                  type="email"
                  placeholder="Email"
                  value={guest.email}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <X
                        className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 size-4"
                        onClick={() => removeGuest(index)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>Remove email</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        onClick={() => addGuest()}
        className="w-fit"
      >
        <UserPlus className="mr-2 size-4" />
        Add guests
      </Button>
      <p className="text-gray-11 text-xs my-4">
        By proceeding, you agree to our{" "}
        <span className="text-gray-12">Terms</span> and{" "}
        <span className="text-gray-12">Privacy Policy</span>.
      </p>
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Button disabled={isPending} onClick={() => mutate()} type="button">
          {isPending ? "Booking..." : "Book"}
        </Button>
      </div>
    </form>
  );
}
