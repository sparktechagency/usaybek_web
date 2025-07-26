"use client"
import NavTitle from '@/components/common/admin/reuseable/nav-title'
import { Button, Input, Label } from '@/components/ui'
import React, { useState } from 'react'

interface PriceItemProps {
    id: string
    label: string
    unit?: string
    value: string
    onChange: (value: string) => void
}



export default function Pricings() {
    const [prices, setPrices] = useState({
        uploadingVideo: "9.99",
        uploadingYouTubeLink: "9.99",
        onsiteAccountCreation: "9.99",
    })

    const handlePriceChange = (service: string, value: string) => {
        setPrices((prev) => ({
            ...prev,
            [service]: value,
        }))
    }

    const handleUpdate = () => {
        console.log("Updated prices:", prices)
        // Handle update logic here
    }

    return (
        <div>
            <NavTitle
                title="Pricings"
                subTitle="You can see & manage all the pricings of MyTSV from here."
            />
            <div className="max-w-7xl mx-auto space-y-4 mt-10">
                <PriceItem
                    id="uploading-video"
                    label="Uploading video"
                    value={prices.uploadingVideo}
                    onChange={(val) => handlePriceChange("uploadingVideo", val)}
                />
                <PriceItem
                    id="uploading-youtube"
                    label="Uploading YouTube Link"
                    value={prices.uploadingYouTubeLink}
                    onChange={(val) => handlePriceChange("uploadingYouTubeLink", val)}
                />
                <PriceItem
                    id="onsite-account"
                    label="Onsite account creation"
                    value={prices.onsiteAccountCreation}
                    onChange={(val) => handlePriceChange("onsiteAccountCreation", val)}
                />

                {/* Update Button */}
                <div className="mt-8 flex justify-center">
                    <Button onClick={handleUpdate} variant="primary" className="rounded-full h-11 px-30 text-base">
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}



// PriceItem
const PriceItem = ({ id, label, unit = "/Video", value, onChange }: PriceItemProps) => {
    const [inputWidth, setInputWidth] = useState(`${Math.max(value.length, 2)}ch`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
        setInputWidth(`${Math.max(newValue.length, 2)}ch`);
    };

    return (
        <div className="bg-white rounded-full py-3 px-6 flex items-center justify-between *:text-lg border">
            <Label htmlFor={id} className="font-medium cursor-default select-text text-blacks">
                {label}
            </Label>
            <div className="flex items-center">
                <span className="font-medium text-blacks">$</span>
                <Input
                    id={id}
                    type="number"
                    step="0.01"
                    value={value}
                    onChange={handleChange}
                    style={{ width: inputWidth }}
                    className="border-none p-0 !text-lg font-medium text-blacks focus-visible:ring-0 text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-sm text-[#888] font-medium relative mt-2">{unit}</span>
            </div>
        </div>
    );
};
