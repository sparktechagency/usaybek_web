"use client"
import { Button, Card } from '@/components/ui'
import { contactSchema } from '@/schema'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import Form from '@/components/reuseable/from'
import { FromInput } from '@/components/reuseable/from-input'
import React from 'react'
import { FromInputs } from '@/components/reuseable/from-inputs';
import { FromTextArea } from '@/components/reuseable/from-textarea';
import Icon from '@/icon';



export default function ContactUs() {
    const from = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    });

    const handleSubmit = async (values: FieldValues) => {
        console.log("Login form:", values);
    };
    return (
        <Card>
            <Form className="space-y-6" from={from} onSubmit={handleSubmit}>
                <FromInputs
                    label="Name"
                    name="name"
                    placeholder="Enter your Name"
                />
                <FromInputs
                    label="Email"
                    name="email"
                    placeholder="Enter your Email"
                />
                <FromInput
                    label="Subject"
                    name="subject"
                    placeholder="Enter your Subject"

                />
                <FromTextArea
                    className="resize-none h-24 rounded-xl"
                    label="Your message"
                    name="message"
                    placeholder="Your message"
                />



                <Button
                    type="submit"
                    size={"lg"}
                    variant={"primary"}
                    className='rounded-full text-base font-normal w-full'
                >
                    Send message <Icon name="sent" className='relative top-[1px]' width={18} />
                </Button>
            </Form>
        </Card>
    )
}
