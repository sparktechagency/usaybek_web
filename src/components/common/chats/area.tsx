"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// Define color config for chart keys
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  like: {
    label: "Likes",
    color: "var(--chart-1)",
  },
  views: {
    label: "Views",
    color: "var(--chart-2)",
  },
  dislike: {
    label: "Dislikes",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

// Helper: build YYYY-MM-DD string for June 2024 (adjust if needed)
function buildDate(day: number) {
  const month = 6; // June
  const year = 2024;
  return `${year}-${month?.toString()?.padStart(2, "0")}-${day
    ?.toString()
    ?.padStart(2, "0")}`;
}

interface charProps {
  analytics: {
    views: { day: number; total_watch: number }[];
    likes: { day: number; total_liked: number }[];
    dislikes: { day: number; total_dislikes: number }[];
  };
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ChartAreaOverView({
  children,
  analytics,
  isActive = true,
  className,
}: charProps) {
  const [status, setStatus] = React.useState("Views");
  const [timeRange, setTimeRange] = React.useState("7d");
  const [chartData, setChartData] = React.useState<
    { date: string; views: number; like: number; dislike: number }[]
  >([]);

  React.useEffect(() => {
    if (!analytics) return;

    const combinedData = analytics?.views?.map((viewEntry) => {
      const day = viewEntry?.day;
      const views = viewEntry?.total_watch;
      const likeEntry = analytics?.likes?.find((l) => l.day === day);
      const dislikeEntry = analytics?.dislikes?.find((d) => d.day === day);
      const like = likeEntry ? likeEntry?.total_liked : 0;
      const dislike = dislikeEntry ? dislikeEntry?.total_dislikes : 0;

      return {
        date: buildDate(day),
        views,
        like,
        dislike,
      };
    });

    setChartData(combinedData);
  }, [analytics]);

  // Filter data based on selected time range (7d, 30d, 90d)
  const filteredData = React.useMemo(() => {
    if (chartData?.length === 0) return [];

    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate?.setDate(startDate?.getDate() - daysToSubtract);

    return chartData?.filter((item) => new Date(item.date) >= startDate) || [];
  }, [chartData, timeRange]);

  const statusToDataKey = {
    Views: "views",
    Likes: "like",
    Dislikes: "dislike",
  };
  const activeDataKey =
    statusToDataKey[status as keyof typeof statusToDataKey] || "views";

  return (
    <div>
      {isActive && (
        <>
          <h1 className="text-center text-base lg:text-2xl font-semibold my-6 lg:my-10">
            Overall statistics of your channel
          </h1>
          <div className="flex justify-between border-b border-gray-200">
            <div>
              {["Views", "Likes", "Dislikes"].map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={cn(
                    "cursor-pointer px-6 py-2 text-sm font-medium text-[#333] border-b-2 border-transparent focus:outline-none",
                    status === item && "!border-reds"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            {children}
          </div>
        </>
      )}

      <Card className={cn("p-0 shadow-none border-[1px] mt-2", className)}>
        <CardContent className="p-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full  pb-4"
          >
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
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
                <linearGradient id="filldislike" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-dislike)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-dislike)"
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
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />

              {/* Render the active data area */}
              {activeDataKey === "views" && (
                <Area
                  dataKey="views"
                  type="natural"
                  fill="url(#fillviews)"
                  stroke="var(--color-views)"
                  stackId="a"
                />
              )}
              {activeDataKey === "like" && (
                <Area
                  dataKey="like"
                  type="natural"
                  fill="url(#filllike)"
                  stroke="var(--color-like)"
                  stackId="a"
                />
              )}
              {activeDataKey === "dislike" && (
                <Area
                  dataKey="dislike"
                  type="natural"
                  fill="url(#filldislike)"
                  stroke="var(--color-dislike)"
                  stackId="a"
                />
              )}

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
