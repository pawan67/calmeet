"use client";

import { Calendar } from "@/components/calendar";

import {
  type CalendarDate,
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { FormPanel } from "./form-panel";
import { LeftPanel } from "./left-panel";
import { RightPanel } from "./right-panel";
import { EventType } from "@prisma/client";

export const dynamic = "force-dynamic";

export function Demo({ eventType }: { eventType: EventType }) {
  const router = useRouter();
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const slotParam = searchParams.get("slot");

  const [timeZone, setTimeZone] = React.useState("Asia/Kolkata");
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
    date
  );

  React.useEffect(() => {
    handleChangeDate(date);
  }, [dateParam]);

  const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0]
    );
    router.push(url.toString());
  };

  const handleChangeAvailableTime = (time: string) => {
    const timeValue = time.split(":").join(" ");

    const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
    if (!match) {
      console.error("Invalid time format");
      return null;
    }

    let hours = Number.parseInt(match[1]);
    const minutes = Number.parseInt(match[2]);
    const isPM = match[3] && match[3].toLowerCase() === "pm";

    if (isPM && (hours < 1 || hours > 12)) {
      console.error("Time out of range (1-12) in 12-hour format");
      return null;
    }

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const currentDate = new Date()
    currentDate.setHours(hours, minutes);

    const url = new URL(window.location.href);
    url.searchParams.set("slot", currentDate.toISOString());
    router.push(url.toString());
  };

  const showForm = !!dateParam && !!slotParam;

  return (
    <div className="w-full md:border  md:mt-20 md:bg-secondary/20 px-8 py-6 rounded-lg max-w-max mx-auto">
      <div className=" md:flex gap-6">
        <LeftPanel
          showForm={showForm}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          title={eventType.title}
          durationInMinutes={eventType.durationInMinutes}
          description={eventType.description}
        />

        {!showForm ? (
          <>
            <Calendar
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              value={date}
              onChange={handleChangeDate}
              onFocusChange={(focused) => setFocusedDate(focused)}
            />
            <RightPanel
              {...{
                date,
                timeZone,
                weeksInMonth,
                handleChangeAvailableTime,
                eventAuthor: eventType.authorId,
              }}
            />
          </>
        ) : (
          <FormPanel timeZone={timeZone} eventType={eventType} />
        )}
      </div>
    </div>
  );
}
