"use client";
import assets from "@/assets";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromInputs } from "@/components/reuseable/from-inputs";
import {
    Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
} from "@/components/ui";
import Icon from "@/icon";
import { onSideSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function OnSideAccount({setIsPayment,setIsAccount}:any) {
    const [isVarify, setIsVarify] = useState(true)
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<string>("");
    const from = useForm({
        resolver: zodResolver(onSideSchema),
        defaultValues: {
            secret: "",
            email: "",
            channel_name: "",
            full_name: "",
            password: "",
            confirm_password: ""
        },
    });


    const handleChange = (val: string, i: number) => {
        if (!/^\d?$/.test(val)) return;
        const updated = [...code];
        updated[i] = val;
        setCode(updated);
    };

    //  handleVerify
    const handleVerify = () => {
        const joined = code.join("");
        if (joined.length < 6 || code.includes("")) {
            setError("Please enter all 6 digits.");
        } else {
            setError("");
            console.log("Verifying:", joined);
            // Add your verification logic here
            setIsAccount(false)
            setIsPayment(true)
        }
    };


    const handleSubmit = async (values: FieldValues) => {
        console.log("Login form:", values);
    };

    return (
        <div>
            <Card className="border-none p-0 gap-0 py-6">
                <Image
                    src={assets.logo}
                    alt="MYTSV Logo"
                    width={150}
                    height={50}
                    className="object-contain mx-auto"
                />

                {isVarify ? (<>
                    <CardHeader className="flex flex-col items-center space-y-0 gap-0  pb-4">
                        <CardTitle className="text-2xl font-semibold text-reds mt-2">Create an account</CardTitle>
                    </CardHeader>
                    <Form
                        className="space-y-6 pt-4"
                        from={from}
                        onSubmit={handleSubmit}
                    >
                        <FromInputs
                            label="Representative secret key"
                            name="secret"
                            stylelabel="bg-white"
                            placeholder="Representative secret key hare"
                        />
                        <FromInputs
                            label="Email"
                            name="email"
                            stylelabel="bg-white"
                            placeholder="Enter your Email"
                        />
                        <FromInputs
                            label="Channel name"
                            name="channel_name"
                            stylelabel="bg-white"
                            placeholder="Channel name goes here"
                        />
                        <FromInputs
                            label="Your full name"
                            name="full_name"
                            stylelabel="bg-white"
                            placeholder="Your full name hare"
                        />
                        <FromInput
                            eye={true}
                            label="Password"
                            name="password"
                            placeholder="Enter your Password"

                        />
                        <FromInput
                            eye={true}
                            label="Confirm Password"
                            name="confirm_password"
                            placeholder="Enter your Confirm Password"

                        />

                        <Button
                            onClick={() => setIsVarify(!isVarify)}
                            type="submit"
                            variant={"primary"}
                            className="w-full rounded-full"
                        >
                            Create account
                        </Button>
                    </Form>
                    <Button
                        variant="outline"
                        size={"lg"}
                        className="w-full mt-5 rounded-full border flex justify-between shadow-none px-1"
                    >
                        <div className="flex items-center">
                            <Icon name="google" className="mr-1" />
                            <span>Continue with Google</span>
                        </div>
                        <ArrowRight className="size-4 text-blacks rotate-[-20deg]" />
                    </Button>

                </>) : (<>
                    <CardHeader className="flex flex-col items-center space-y-0 gap-0  mb-10">
                        <CardTitle className="text-2xl font-semibold text-reds mt-2">Create an account</CardTitle>
                        <CardDescription className="text-blacks font-normal text-center mt-1">
                            Enter the 6 digit code that we sent you to your provided email.
                        </CardDescription>
                    </CardHeader>
                    <div className="flex justify-center space-x-3 mb-2">
                        {code.map((d, i) => (
                            <Input
                                key={i}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={d}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, i)}
                                className="w-12 h-12 text-center text-lg font-medium border-gray-300"
                            />
                        ))}
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                    <Button
                        type="button"
                        variant="primary"
                        className="min-w-md text-center m-auto rounded-full mt-5"
                        onClick={handleVerify}
                    >
                        Verify
                    </Button>
                </>)}

            </Card>
        </div>
    );
}
