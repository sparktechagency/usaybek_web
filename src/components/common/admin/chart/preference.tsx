"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

export default function PreferenceChart() {
  const chartData = [
    { day: "01", videos: 830 },
    { day: "02", videos: 680 },
    { day: "03", videos: 980 },
    { day: "04", videos: 320 },
    { day: "05", videos: 600 },
    { day: "06", videos: 60 },
    { day: "07", videos: 50 },
    { day: "08", videos: 850 },
    { day: "09", videos: 950 },
    { day: "10", videos: 330 },
    { day: "11", videos: 10 },
    { day: "12", videos: 900 },
    { day: "13", videos: 480 },
    { day: "14", videos: 180 },
    { day: "15", videos: 220 },
    { day: "16", videos: 370 },
    { day: "17", videos: 820 },
    { day: "18", videos: 830 },
    { day: "19", videos: 800 },
    { day: "20", videos: 300 },
    { day: "21", videos: 750 },
    { day: "22", videos: 810 },
    { day: "23", videos: 870 },
    { day: "24", videos: 880 },
    { day: "25", videos: 600 },
    { day: "26", videos: 300 },
    { day: "27", videos: 10 },
    { day: "28", videos: 300 },
    { day: "29", videos: 500 },
    { day: "30", videos: 400 },
  ]

  const chartConfig = {
    videos: {
      label: "Videos",
      color: "hsl(350 80% 70%)", // A shade of red/pink
    },
  }

  return (
    <div className="bg-white p-3 rounded-xl">
      <ChartContainer config={chartConfig} className="max-h-[500px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} domain={[0, 1000]} />
          <Bar dataKey="videos" fill="var(--color-videos)" radius={[4, 4, 0, 0]} />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
