import ChannelChart from "@/components/common/admin/chart/channel";
import { PieCharts } from "@/components/common/admin/chart/pie";
import PreferenceChart from "@/components/common/admin/chart/preference";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Icon from "@/icon"
import { LayoutGrid, PlaySquare, CreditCard } from "lucide-react"

const stats = [
  {
    title: "Total channels",
    value: 120,
    icon: <Icon name="channel" />,
  },
  {
    title: "Total videos",
    value: 500,
    icon: <Icon name="videos" />,
  },
  {
    title: "Earnings",
    value: "$3,000.00",
    icon: <Icon name="earnings" />,
  }
];


export default function Home() {
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {
          stats.map((item, idx) => (
            <Card key={idx} className="flex flex-row shadow-none bg-white gap-0 border-1  py-7 px-4 justify-between">
              <div>
                <h1 className="text-xl font-medium  text-blacks">{item.title}</h1>
                <h1 className="text-3xl font-semibold mt-1">{item.value}</h1>
              </div>
              <div className="bg-red-100 size-14 grid place-items-center rounded-full">
                {item.icon}
              </div>
            </Card>
          ))
        }
      </div>

      <div className="grid gap-6 lg:grid-cols-2 my-8">
        <div>
          <h1 className="text-xl font-semibold mb-4">Channel creating Statistics</h1>
          <ChannelChart />
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-4">Earning Statistics</h1>
          <PieCharts />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold mb-4">Video posting preferences</h1>
        <PreferenceChart />
      </div>
    </div>
  )
}
