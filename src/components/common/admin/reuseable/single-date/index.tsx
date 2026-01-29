"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { formatDate } from "date-fns";

export function SingleCalendar({ onChange, className, defaultDate }: any) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Close calendar if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setStartDate(selectedDate);
    setCalendarOpen(false);
    onChange?.(selectedDate);
  };

  return (
    <div className="flex flex-col gap-3 relative">
      <Button
        id="date"
        type="button"
        className={`bg-white  hover:bg-transparent justify-between shadow-none rounded-full text-primary px-2! font-normal border ${className}`}
        onClick={() => setCalendarOpen(!calendarOpen)}
      >
        <span>
          {startDate
            ? formatDate(startDate, "yyyy-MM-dd")
            : defaultDate || "-Select Date-"}
        </span>
        <span className="bg-white p-1.5 rounded-full ml-2 lg:ml-10">
          <CalendarDays className="text-grays size-5" />
        </span>
      </Button>

      {calendarOpen && (
        <div
          ref={calendarRef}
          className="w-auto absolute bottom-0 top-10  z-50 bg-white rounded-md p-0"
        >
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleSelectDate}
            className="rounded-md"
            disabled={(date: Date) =>
              date.getTime() < new Date().setHours(0, 0, 0, 0)
            }
          />
        </div>
      )}
    </div>
  );
}
