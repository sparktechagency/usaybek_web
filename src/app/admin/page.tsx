import ChannelChart from "@/components/common/admin/chart/channel";
import { PieCharts } from "@/components/common/admin/chart/pie";
import PreferenceChart from "@/components/common/admin/chart/preference";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { Card} from "@/components/ui/card"
import FavIcon from "@/icon/admin/favIcon";


const stats = [
  {
    title: "Total channels",
    value: 120,
    icon: <FavIcon name="chanel"/>,
  },
  {
    title: "Total videos",
    value: 500,
    icon: <FavIcon name="videos" />,
  },
  {
    title: "Earnings",
    value: "$3,000.00",
    icon: <FavIcon name="earnings" />,
  }
];


export default function Home() {
  return (
    <div>
      <NavTitle title="Dashboard Overview" subTitle="You can see all of your apps statistics from here"/>
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
