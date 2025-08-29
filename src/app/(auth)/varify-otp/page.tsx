"use client";
import assets from "@/assets";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  Suspense,
} from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useOtpVarifyMutation } from "@/redux/api/authApi";
import { delay, modifyPayload, setCookie } from "@/lib";
import { toast } from "sonner";
import { authKey } from "@/lib";

 function VarifyOtpChild() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpVarify, { isLoading }] = useOtpVarifyMutation();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const [isError, setIsError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    // Allow only single digit numbers
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[i] = value;
    setCode(updated);

    // Auto-focus next input
    if (value && i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    // Backspace focuses previous input if current is empty
    if (e.key === "Backspace" && !code[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d{6}$/.test(pastedData)) {
      setError("Please paste a 6-digit number.");
      return;
    }
    setError("");
    setCode(pastedData.split(""));
  };

  const handleVerify = async () => {
    setIsError("");
    try {
      const joinedCode = code.join("");
      if (joinedCode.length < 6) {
        setError("Please enter all 6 digits.");
      } else {
        const value = { email, otp: code.join("") };
        const data = modifyPayload(value);
        const res = await otpVarify(data).unwrap();
        if (res.status) {
          const { access_token: token, user: info } = res.data;
          setCookie(authKey, token);
          toast("Login Successfull", {
            description: res?.message,
          });
          await delay(4050);
          if (info.role == "USER") {
            router.push("/");
          } else if (info.role == "ADMIN") {
            router.push("/admin");
          }
        }

        setError("");
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
    <Image
      src={assets.auth.forgotImg}
      alt="background image"
      fill
      className="object-cover z-0 md:rounded-md"
    />
    <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col justify-center">
      <Card className="w-full max-w-md rounded-md md:rounded-none md:rounded-t-xl px-4 pt-8 pb-15 md:pb-50 bg-body border-none mx-auto md:absolute md:left-1/2 md:[transform:translateX(-50%)] md:bottom-0">
        <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
          <div className="mb-1 flex items-center justify-between w-full">
            <Link href="/forgot-password">
              <h1 className="bg-white size-8 rounded-full grid place-items-center relative -left-4 cursor-pointer">
                <ArrowLeft size={20} />
              </h1>
            </Link>
            <Image
              src={assets.logo}
              alt="MYTSV Logo"
              width={150}
              height={50}
              className="object-contain"
            />
            <h1 className="opacity-0">0</h1>
          </div>
          <CardTitle className="text-2xl font-bold text-reds mt-3">
            Verify Code
          </CardTitle>
          <CardDescription className="text-blacks font-normal text-center mt-1">
            Enter the 6 digit code that we sent to{" "}
            {email || "your provided email"}.
          </CardDescription>
        </CardHeader>
        <div className="flex justify-center space-x-3 mb-2">
          {code.map((digit, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className="w-12 h-12 text-center text-lg font-medium border-gray-300"
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {isError && (
          <p className="text-red-500 text-sm text-center mb-4">{isError}</p>
        )}
        <Button
          type="button"
          variant="primary"
          className="w-full rounded-full"
          disabled={isLoading}
          onClick={handleVerify}
        >
          Verify
        </Button>
      </Card>
    </div>
  </div>
  );
}


export default function VarifyOtp() {
  return (
   <Suspense fallback={<h1>Loading....</h1>}>
      <VarifyOtpChild/>
   </Suspense>
  )
}
