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
  Checkbox,
  Label,
} from "@/components/ui";
import Icon from "@/icon";
import { loginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function Login() {
  const from = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
      <Image
        src={assets.auth.loginImg}
        alt="title"
        fill
        className="object-cover z-0 md:rounded-md"
      />
      <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col  justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="text-center hidden md:block text-white self-center">
            <h1 className="text-3xl font-bold">MyTSV</h1>
            <h1 className="font-medium text-xl">
              Connect with your town like never before
            </h1>
            <ul className="space-y-2 mt-4 pl-50">
              {[
                "Access your personalized feed",
                "Interact with local experts",
                "Stay updated with your town",
              ].map((item, index) => (
                <li className="flex gap-1" key={index}>
                  <Icon name="checkWhite" width={20} height={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Card className="w-full clip-path-[polygon(0_0,100%_0,100%_90%,50%_100%,0_90%)] max-w-md rounded-md md:rounded-none md:rounded-t-xl px-4 py-8 bg-body border-none mx-auto md:absolute md:right-0 md:bottom-0">
              <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
                <Image
                  src={assets.logo}
                  alt="MYTSV Logo"
                  width={150}
                  height={50}
                  className="object-contain"
                />
                <CardTitle className="text-2xl font-bold text-reds mt-3">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-blacks text-center">
                  Use your credentials to login
                </CardDescription>
              </CardHeader>
              <Form
                className="space-y-6 pt-4"
                from={from}
                onSubmit={handleSubmit}
              >
                <FromInputs
                  label="Email"
                  name="email"
                  placeholder="Enter your Email"
                />
                <FromInput
                  eye={true}
                  label="Password"
                  name="password"
                  placeholder="Enter your Password"
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-reds font-semibold hover:underline"
                  >
                    Forgot Password ?
                  </Link>
                </div>
                <Button
                  type="submit"
                  variant={"primary"}
                  className="w-full rounded-full"
                >
                  Sign in
                </Button>
              </Form>
              <div className="text-center text-sm flex justify-center font-medium">
                Don&apos;t have an account ?{" "}
                <Link
                  href="/sign-up"
                  className="flex items-center justify-center gap-1 ml-1 hover:underline"
                >
                  Sign Up <Icon name="arrowRight" />
                </Link>
              </div>
              <Button
                variant="outline"
                size={"lg"}
                className="w-full rounded-full border flex justify-between shadow-none px-1"
              >
                <div className="flex items-center">
                  <Icon name="google" className="mr-1" />
                  <span>Continue with Google</span>
                </div>
                <ArrowRight className="size-4 text-blacks rotate-[-20deg]" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
