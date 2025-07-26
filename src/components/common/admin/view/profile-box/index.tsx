"use client"
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import Img from "@/components/reuseable/img";
import { Button } from "@/components/ui/button";
import { PlaceholderImg } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePassword from "./change-passwrod";
import { usePathname } from "next/navigation";


export default function ProfileBox() {
    const pathname=usePathname()
    const [isTab, setIsTab] = useState("edit");

    const from = useForm({
        defaultValues: {
            name: "Julfiker Islam",
            email: "julfiker755.bd@gmail.com",
        },
    });

    const handleSubmit = async (values: any) => {
        console.log("Profile form:", values);
    };

    //  tab control
    useEffect(()=>{
        setIsTab(pathname.includes(`/admin/setting/change-password`) ? "change":"edit" )
    },[pathname])


    return (
        <div>
            <div className="max-w-7xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-md py-4 text-center mx-auto">
                    <div className="relative inline-block mb-2">
                        <Img
                            src={PlaceholderImg()}
                            title="Profile picture"
                            className="size-30 rounded-full"
                        />
                        {isTab == "edit" && (
                            <div className="bg-white shadow-md w-fit p-1 rounded-full absolute bottom-2 right-2 cursor-pointer">
                                <SquarePen size={16} className="text-gray1" />
                            </div>
                        )}

                    </div>
                    <h1 className="text-2xl font-semibold text-blacks mb-1">John Doe</h1>
                    <p className="text-gray1 mb-4">example@gmail.com</p>
                </div>

                {/* Tab Buttons */}
                <div className="flex justify-center gap-4 text-sm py-3">
                    <button
                        onClick={() => setIsTab("edit")}
                        className={`text-[#043249] ${isTab === "edit" && "!border-b-2 !border-[#043249]/90"} px-4 border-b-2 border-transparent font-semibold text-base cursor-pointer`}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={() => setIsTab("change")}
                        className={`text-[#043249] ${isTab === "change" && "!border-b-2 !border-[#043249]/90"} px-4 border-b-2 border-transparent font-semibold text-base cursor-pointer`}
                    >
                        Change Password
                    </button>
                </div>

                {/* Forms */}
                {isTab === "edit" ? (
                    <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
                        <FromInput
                            className="bg-white border-none rounded-md"
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            matching={true}
                        />
                        <FromInput
                            className="bg-white border-none rounded-md"
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            matching={true}
                        />
                        <div className="flex justify-center">
                            <Button variant={"primary"} className="px-8">
                                Save
                            </Button>
                        </div>
                    </Form>
                ) : (
                    <ChangePassword/>
                )}
            </div>
        </div>
    );
}