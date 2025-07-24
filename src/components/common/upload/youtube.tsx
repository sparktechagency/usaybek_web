import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { FieldValues, useForm } from 'react-hook-form'
import Form from "@/components/reuseable/from";
import { FromInput } from '@/components/reuseable/from-input'
import { InputSelectField } from '@/components/reuseable/from-select'
import { FromTagInputs } from '@/components/reuseable/from-tag-inputs'
import { FromTextAreas } from '@/components/reuseable/from-textareas'
import Icon from '@/icon'


export default function YoutubeLink({ setIsPayment }: any) {
    const [isPay, setIsPay] = useState(true)
    const from = useForm({
        // resolver: zodResolver(loginSchema),
        defaultValues: {
            title: "",
            category: "",
            city: "",
            state: "",
            visibility: "",
            tags: ["React", "Next.js", "Tailwind"],
            description: ""
        },
    });


    //  handleSubmit
    const handleSubmit = async (values: FieldValues) => {
        console.log("Login form:", values);
    };


    return (
        <div>

            <Form
                from={from}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column */}
                <div className="space-y-5">

                    <FromInput
                        label='Paste your link here'
                        name="link"
                        placeholder='Enter Your title'
                        className='h-10'
                    />
                    {/* States Dropdown */}
                    <InputSelectField
                        items={[
                            { label: "state 1", value: "state 1" },
                            { label: "state 2", value: "state 2" },
                            { label: "state 3", value: "state 3" },
                        ]}
                        label="State"
                        name="state"
                        placeholder="Select State"
                        matching={true}
                        className='py-4'
                        itemStyle="py-2"
                    ></InputSelectField>

                    {/* City Dropdown */}
                    <InputSelectField
                        items={[
                            { label: "city 1", value: "city 1" },
                            { label: "city 2", value: "city 2" },
                            { label: "city 3", value: "city 3" },
                        ]}
                        label="City"
                        name="city"
                        placeholder="Select City"
                        matching={true}
                        className='py-4'
                        itemStyle="py-2"
                    ></InputSelectField>
                    {/* Promoted Button */}
                    <Button variant={"primary"} className='rounded-full font-normal mt-4 text-base'>
                        <Icon name="promoted" width={20} />
                        <span>{isPay ? ("Promoted") : ("Promote for $99 / Month")}</span>
                    </Button>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                    {/* Title Input */}
                    <FromInput
                        label='Title'
                        name="title"
                        placeholder='Enter Your title'
                        className='h-10'
                    />

                    {/* Category Dropdown */}
                    <InputSelectField
                        items={[
                            { label: "Category 1", value: "category1" },
                            { label: "Category 2", value: "Category 2" },
                            { label: "Category 3", value: "Category 3" },
                            { label: "Category 4", value: "Category 4" },
                            { label: "Category 5", value: "Category 5" },
                            { label: "Category 6", value: "Category 6" },
                            { label: "Category 7", value: "Category 7" },
                            { label: "Category 8", value: "Category 8" },
                        ]}
                        label="Category"
                        name="category"
                        placeholder="Select category"
                        matching={true}
                        className='py-4'
                        itemStyle="py-2"
                    ></InputSelectField>
                    {/* Thumbnail Section */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between border rounded-full p-1 h-9">
                            <span className="text-sm  text-blacks pl-1">Thumbnail</span>
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2 h-7 rounded-full text-[#3B97D3] hover:text-[#3B97D3] border-[#3B97D3] bg-transparent hover:bg-transparent"
                            >
                                <Upload className="h-4 w-4 text-[#3B97D3]" />
                                <span>Upload an image</span>
                            </Button>
                        </div>
                        <div className="flex items-center space-x-2 text-reds text-sm">
                            <Icon name='alertRed' width={17} className='rotate-2' />
                            <span>Image resolution should be minimum 1920x1080 px</span>
                        </div>
                    </div>


                    {/* Visibility Dropdown */}
                    <InputSelectField
                        items={[
                            { label: "Everyone", value: "everyone", icon: <Icon width={16} name="internetBlack" /> },
                            { label: "Only me", value: "only me", icon: <Icon width={13} name="lockBack" /> }
                        ]}
                        label="Visibility"
                        name="visibility"
                        placeholder="Select Visibility"
                        matching={true}
                        className='py-4'
                        itemStyle="py-2"
                    ></InputSelectField>
                </div>
                <div className='col-span-1 lg:col-span-2 space-y-5'>
                    <FromTextAreas
                        label="Description"
                        name="description"
                        placeholder="Enter your Description"
                        className='min-h-28 rounded-3xl'
                        matching={true}
                    />
                    <FromTagInputs
                        label='Tags'
                        name="tags"
                        stylelabel="bg-white"
                        className="bg-white"
                    />
                    {/* Description Textarea */}


                </div>
                {isPay ? (
                    <div className='col-span-1 lg:col-span-2'>
                        <div className="flex justify-end">
                            <Button onClick={() => setIsPay(!isPay)} variant={"primary"}>
                                Publish
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className='col-span-1 lg:col-span-2'>
                        <div className="flex space-x-3 items-center justify-end">
                            <h1 className='text-grays'> After payment you will be returned here immediately.</h1>
                            <Button variant={"out"}>
                                $99.00
                            </Button>
                            <Button onClick={() => setIsPayment(true)} variant={"primary"}>
                                Pay now
                            </Button>
                        </div>
                    </div>
                )}
            </Form>

        </div>
    )
}
