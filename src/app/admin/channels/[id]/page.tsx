import NavTitle from '@/components/common/admin/reuseable/nav-title';
import ChannelDetails from '@/components/common/admin/view/channel';
import { IdParams } from '@/types';


export default async function Details({ params }: IdParams) {
    const { id } = await params;
    console.log(id)




    return (
        <div>
            <NavTitle
                title="Channel details"
                subTitle="You can see & manage all the channels of MyTSV from here."
            />
            {/* body section */}
            <ChannelDetails />
        </div>
    );

}
