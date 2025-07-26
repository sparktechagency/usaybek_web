import NavTitle from '@/components/common/admin/reuseable/nav-title';
import ChannelDetails from '@/components/common/admin/view/channel';
import { videos } from '@/components/common/video-box';
import SubTilte from '@/components/reuseable/sub-title';
import { VideoCard } from '@/components/reuseable/video-card';
import { IdParams } from '@/types';


export default async function Details({ params }: IdParams) {
    const { id } = await params;
    console.log(id)


    return (
        <div className='pb-10'>
            <NavTitle
                title="Channel details"
                subTitle="You can see & manage all the channels of MyTSV from here."
            />
            {/* body section */}
            <ChannelDetails />
            <SubTilte title="Videos" className='items-start pb-5 pt-10 text-2xl font-semibold' />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} {...video} />
                ))}
            </div>
        </div>
    );

}
