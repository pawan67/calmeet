import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { timeZones } from "./time-zones";

export function LeftPanel({
  showForm,
  timeZone,
  setTimeZone,
  title,
  durationInMinutes,
}: {
  showForm: boolean | null;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
  title: string;
  durationInMinutes: number | null;
}) {
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const slotParam = searchParams.get("slot");

  return (
    <div className="flex flex-col gap-4 md:w-[280px] mb-10 md:mb-0 md:border-r  md:pr-6">
      <div className="grid gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                alt="Calmeet"
                src="/images/logo.png"
                className="rounded-full border"
                width={24}
                height={24}
              />
            </TooltipTrigger>
            <TooltipContent>Calmeet</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-gray-11 text-sm font-semibold">Calmeet</p>
      </div>
      <div className="grid gap-3">
        <p className="text-gray-12 text-2xl font-bold">{title}</p>

        {showForm && (
          <div className="flex text-gray-12">
            <CalendarIcon className="size-4 mr-2" />
            <div className="flex flex-col text-sm font-semibold">
              <p>
                {new Date(slotParam as string).toLocaleString(locale, {
                  dateStyle: "full",
                })}
              </p>
              <p>
                {new Date(slotParam as string).toLocaleString(locale, {
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center text-gray-12">
          <Clock4 className="size-4 mr-2" />
          <p className="text-sm font-semibold">{durationInMinutes} mins</p>
        </div>
        <div className="flex items-center text-gray-12">
          <img
            alt="Calmeet video"
            src="/cal-video.svg"
            className="mr-2"
            width={16}
            height={16}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm font-semibold">Calmeet video</p>
              </TooltipTrigger>
              <TooltipContent>Calmeet video</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={timeZone} onValueChange={setTimeZone}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select time zone">
              {timeZone.replace(/_/g, " ").split("(")[0].trim()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-fit dark:bg-gray-5">
            {timeZones.map((timeZone) => (
              <SelectItem
                key={timeZone.label}
                value={timeZone.tzCode}
                className="dark:focus:bg-gray-2"
              >
                {timeZone.label.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
