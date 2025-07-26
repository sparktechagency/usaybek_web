import NavTitle from '@/components/common/admin/reuseable/nav-title'
import React from 'react'

import { Calendar, Clock, Mail } from "lucide-react";
import FavIcon from '@/icon/admin/favIcon';

const notifications = [
    {
        id: 1,
        title: "9+ new users registered",
        description: "Tap to view new users",
        date: "05-04-2025",
        time: "05:50 PM",
        color: "border-l-orange-500",
    },
    {
        id: 2,
        title: "9+ new video published",
        description: "Some channels published new videos. Tap to view",
        date: "05-04-2025",
        time: "05:50 PM",
        color: "border-l-blue-500",
    },
    {
        id: 3,
        title: "New report",
        description: "A channel reported against a video. Tap to view",
        date: "05-04-2025",
        time: "05:50 PM",
        color: "border-l-blue-500",
    }
];




export default function Notification() {
    return (
        <div>
            <NavTitle title='Notifications' subTitle='You can manage the notifications of MyTSV from here.' />
            <div className='space-y-8'>
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className={`bg-white border-l-4 ${notification.color} p-4 grid grid-cols-1 lg:grid-cols-3 rounded-md`}
                    >
                        <div className="mb-2 md:mb-0">
                            <h3 className="font-semibold text-xl text-blacks">{notification.title}</h3>
                            <p className="text-sm text-blacks">
                                {notification.description}{" "}
                                <span className="text-gray1 cursor-pointer">Tap to view</span>
                            </p>
                        </div>
                        <ul className='md:left-1/2 relative space-y-1 *:text-gray1'>
                            <li className="flex items-center gap-1">
                                 <FavIcon name="calender"/>
                                <span>{notification.date}</span>
                            </li>
                            <li className="flex items-center gap-1">
                            <FavIcon name="time"/>
                                <span>{notification.time}</span>
                            </li>
                        </ul>

                        <div className="text-gray-500  items-center hidden md:flex md:justify-end">
                        <FavIcon name="noti"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



