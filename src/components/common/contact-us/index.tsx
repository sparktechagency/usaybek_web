"use client"
import { Button, Card } from '@/components/ui'
import { contactSchema } from '@/schema'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import Form from '@/components/reuseable/from'
import { FromInput } from '@/components/reuseable/from-input'
import { Send } from 'lucide-react'
import React from 'react'



export default function ContactUs() {
    const from = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            messsage: ""
        },
    });

    const handleSubmit = async (values: FieldValues) => {
        console.log("Login form:", values);
    };
    return (
        <Card>
            <Form className="space-y-4" from={from} onSubmit={handleSubmit}>
                <FromInput
                    className="bg-[#636363]/0.5 border"
                    label="Email"
                    stylelabel="text-[#636363]"
                    name="email"
                    placeholder="Enter your Email"
                />
                <FromInput
                    className="bg-[#636363]/0.5 border"
                    eye={true}
                    stylelabel="text-[#636363]"
                    label="Password"
                    name="password"
                    placeholder="Enter your Password"
                    type="password"
                />



                <Button
                    type="submit"
                    className="w-full rounded-full bg-red-500 py-3 text-lg font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Send message <Send className="ml-2 h-5 w-5" />
                </Button>
            </Form>
            {/* <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                                <span className="text-red-500">*</span> Name
                            </label>
                            <Input id="name" placeholder="Your Name" className="rounded-full px-4 py-2" />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                <span className="text-red-500">*</span> Email
                            </label>
                            <Input id="email" type="email" placeholder="example@gmail.com" className="rounded-full px-4 py-2" />
                        </div>
                        <div>
                            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700 sr-only">
                                Subject
                            </label>
                            <Input id="subject" placeholder="Subject" className="rounded-full px-4 py-2" />
                        </div>
                        <div>
                            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 sr-only">
                                Your message
                            </label>
                            <Textarea id="message" placeholder="Your message" className="min-h-[120px] rounded-xl px-4 py-3" />
                        </div>
                        <Button
                            type="submit"
                            className="w-full rounded-full bg-red-500 py-3 text-lg font-semibold text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Send message <Send className="ml-2 h-5 w-5" />
                        </Button>
                    </form> */}
        </Card>
    )
}
