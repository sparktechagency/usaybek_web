"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", like: 222, views: 150 },
  { date: "2024-04-02", like: 97, views: 180 },
  { date: "2024-04-03", like: 167, views: 120 },
  { date: "2024-04-04", like: 242, views: 260 },
  { date: "2024-04-05", like: 373, views: 290 },
  { date: "2024-04-06", like: 301, views: 340 },
  { date: "2024-04-07", like: 245, views: 180 },
  { date: "2024-04-08", like: 409, views: 320 },
  { date: "2024-04-09", like: 59, views: 110 },
  { date: "2024-04-10", like: 261, views: 190 },
  { date: "2024-04-11", like: 327, views: 350 },
  { date: "2024-04-12", like: 292, views: 210 },
  { date: "2024-04-13", like: 342, views: 380 },
  { date: "2024-04-14", like: 137, views: 220 },
  { date: "2024-04-15", like: 120, views: 170 },
  { date: "2024-04-16", like: 138, views: 190 },
  { date: "2024-04-17", like: 446, views: 360 },
  { date: "2024-04-18", like: 364, views: 410 },
  { date: "2024-04-19", like: 243, views: 180 },
  { date: "2024-04-20", like: 89, views: 150 },
  { date: "2024-04-21", like: 137, views: 200 },
  { date: "2024-04-22", like: 224, views: 170 },
  { date: "2024-04-23", like: 138, views: 230 },
  { date: "2024-04-24", like: 387, views: 290 },
  { date: "2024-04-25", like: 215, views: 250 },
  { date: "2024-04-26", like: 75, views: 130 },
  { date: "2024-04-27", like: 383, views: 420 },
  { date: "2024-04-28", like: 122, views: 180 },
  { date: "2024-04-29", like: 315, views: 240 },
  { date: "2024-04-30", like: 454, views: 380 },
  { date: "2024-05-01", like: 165, views: 220 },
  { date: "2024-05-02", like: 293, views: 310 },
  { date: "2024-05-03", like: 247, views: 190 },
  { date: "2024-05-04", like: 385, views: 420 },
  { date: "2024-05-05", like: 481, views: 390 },
  { date: "2024-05-06", like: 498, views: 520 },
  { date: "2024-05-07", like: 388, views: 300 },
  { date: "2024-05-08", like: 149, views: 210 },
  { date: "2024-05-09", like: 227, views: 180 },
  { date: "2024-05-10", like: 293, views: 330 },
  { date: "2024-05-11", like: 335, views: 270 },
  { date: "2024-05-12", like: 197, views: 240 },
  { date: "2024-05-13", like: 197, views: 160 },
  { date: "2024-05-14", like: 448, views: 490 },
  { date: "2024-05-15", like: 473, views: 380 },
  { date: "2024-05-16", like: 338, views: 400 },
  { date: "2024-05-17", like: 499, views: 420 },
  { date: "2024-05-18", like: 315, views: 350 },
  { date: "2024-05-19", like: 235, views: 180 },
  { date: "2024-05-20", like: 177, views: 230 },
  { date: "2024-05-21", like: 82, views: 140 },
  { date: "2024-05-22", like: 81, views: 120 },
  { date: "2024-05-23", like: 252, views: 290 },
  { date: "2024-05-24", like: 294, views: 220 },
  { date: "2024-05-25", like: 201, views: 250 },
  { date: "2024-05-26", like: 213, views: 170 },
  { date: "2024-05-27", like: 420, views: 460 },
  { date: "2024-05-28", like: 233, views: 190 },
  { date: "2024-05-29", like: 78, views: 130 },
  { date: "2024-05-30", like: 340, views: 280 },
  { date: "2024-05-31", like: 178, views: 230 },
  { date: "2024-06-01", like: 178, views: 200 },
  { date: "2024-06-02", like: 470, views: 410 },
  { date: "2024-06-03", like: 103, views: 160 },
  { date: "2024-06-04", like: 439, views: 380 },
  { date: "2024-06-05", like: 88, views: 140 },
  { date: "2024-06-06", like: 294, views: 250 },
  { date: "2024-06-07", like: 323, views: 370 },
  { date: "2024-06-08", like: 385, views: 320 },
  { date: "2024-06-09", like: 438, views: 480 },
  { date: "2024-06-10", like: 155, views: 200 },
  { date: "2024-06-11", like: 92, views: 150 },
  { date: "2024-06-12", like: 492, views: 420 },
  { date: "2024-06-13", like: 81, views: 130 },
  { date: "2024-06-14", like: 426, views: 380 },
  { date: "2024-06-15", like: 307, views: 350 },
  { date: "2024-06-16", like: 371, views: 310 },
  { date: "2024-06-17", like: 475, views: 520 },
  { date: "2024-06-18", like: 107, views: 170 },
  { date: "2024-06-19", like: 341, views: 290 },
  { date: "2024-06-20", like: 408, views: 450 },
  { date: "2024-06-21", like: 169, views: 210 },
  { date: "2024-06-22", like: 317, views: 270 },
  { date: "2024-06-23", like: 480, views: 530 },
  { date: "2024-06-24", like: 132, views: 180 },
  { date: "2024-06-25", like: 141, views: 190 },
  { date: "2024-06-26", like: 434, views: 380 },
  { date: "2024-06-27", like: 448, views: 490 },
  { date: "2024-06-28", like: 149, views: 200 },
  { date: "2024-06-29", like: 103, views: 160 },
  { date: "2024-06-30", like: 446, views: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  like: {
    label: "like",
    color: "var(--chart-1)",
  },
  views: {
    label: "views",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaStacked() {
  const [timeRange, setTimeRange] = React.useState("7d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="p-0 shadow-none border-[1px] mt-2">
      {/* <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader> */}
      <CardContent className="p-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="filllike" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-like)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-like)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillviews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="views"
              type="natural"
              fill="url(#fillviews)"
              stroke="var(--color-views)"
              stackId="a"
            />
            <Area
              dataKey="like"
              type="natural"
              fill="url(#filllike)"
              stroke="var(--color-like)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
