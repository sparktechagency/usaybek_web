"use client"
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { Button } from "@/components/ui/button";
import { passwordChangeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm } from "react-hook-form";



export default function ChangePassword() {
    const from = useForm({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    });

    const handleChange = async (values:any) => {
        console.log("Password change form:", values);
    };
    return (
        <Form className="space-y-4" from={from} onSubmit={handleChange}>
            <FromInput
                className="bg-white border-none rounded-md"
                label="Current Password"
                name="current_password"
                placeholder="********"
                matching={true}
            />
            <FromInput
                className="bg-white border-none rounded-md"
                label="New Password"
                name="new_password"
                placeholder="********"
                matching={true}
            />
            <FromInput
                className="bg-white border-none rounded-md"
                label="Confirm Password"
                name="confirm_password"
                placeholder="********"
                matching={true}
            />
            <div className="flex justify-center">
                <Button variant={"primary"} className="px-8">
                    Save
                </Button>
            </div>
        </Form>
    )
}