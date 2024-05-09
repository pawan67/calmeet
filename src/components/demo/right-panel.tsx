import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { availableTimes } from "./available-times";
import { useQuery } from "@tanstack/react-query";
import { availableSlots } from "@/actions/appointment.actions";
import { useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

export function RightPanel({
  date,
  timeZone,
  weeksInMonth,
  handleChangeAvailableTime,
  eventAuthor,
}: {
  date: DateValue;
  timeZone: string;
  weeksInMonth: number;
  handleChangeAvailableTime: (time: string) => void;
  eventAuthor: string;
}) {
  // const { data } = useQuery({
  //   queryKey: ["availableTime", date.toDate(timeZone)],
  //   queryFn: async () =>
  //     await availableSlots(date.toDate(timeZone), eventAuthor),
  // });

  const searchParams = useSearchParams();

  const urlDate = searchParams.get("date");

  const { data } = useQuery({
    queryKey: ["availableTime", date],
    queryFn: async () => {
      const res = await axios.get(
        `/api/available-slots?date=${date}&eventAuthor=${eventAuthor}`
      );
      return res.data;
    },
  });

  const { locale } = useLocale();
  const [dayNumber, dayName] = date
    .toDate(timeZone)
    .toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
    })
    .split(" ");

  return (
    <Tabs
      defaultValue="12"
      className="flex flex-col gap-4 mt-5 md:mt-0  md:w-[280px] md:border-l md:pl-6"
    >
      <div className="flex justify-between items-center">
        <p
          aria-hidden
          className="flex-1 align-center font-bold text-md text-gray-12"
        >
          {dayName} <span className="text-gray-11">{dayNumber}</span>
        </p>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="12">12h</TabsTrigger>
          <TabsTrigger value="24">24h</TabsTrigger>
        </TabsList>
      </div>
      {["12", "24"].map((time) => (
        <TabsContent key={time} value={time}>
          <ScrollArea
            type="always"
            className="h-[380px] "
            style={{
              maxHeight: weeksInMonth > 5 ? "380px" : "320px",
            }}
          >
            <div className="grid  gap-2 pr-3">
              {!data &&
                [...Array(5)].map((_, index) => (
                  <Skeleton
                    className=" w-full h-8  my22
                "
                    key={index}
                  />
                ))}
              {data?.map((availableTime: any) => (
                <Button
                  variant="outline"
                  onClick={() =>
                    handleChangeAvailableTime(
                      availableTime[time as "12" | "24"]
                    )
                  }
                  key={availableTime[time as "12" | "24"]}
                >
                  {availableTime[time as "12" | "24"]}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
