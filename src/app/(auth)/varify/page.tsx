"use client"
import assets from '@/assets'
import { Button, Card, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input' // Ensure you're importing Input

export default function ForgotPassword() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");

  const handleChange = (val: string, i: number) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...code];
    updated[i] = val;
    setCode(updated);
  };

  const handleVerify = () => {
    const joined = code.join("");
    if (joined.length < 6 || code.includes("")) {
      setError("Please enter all 6 digits.");
    } else {
      setError("");
      console.log("Verifying:", joined);
      // Add your verification logic here
    }
  };

  return (
    <div className="fixed inset-0 m-0 md:m-3">
      <Image
        src={assets.auth.forgotImg}
        alt="title"
        fill
        className="object-cover z-0 md:rounded-md"
      />
      <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col justify-center">
        <Card className="w-full max-w-md rounded-md md:rounded-none md:rounded-t-xl px-4 pt-8 pb-15 md:pb-50 bg-body border-none mx-auto md:absolute md:left-1/2 md:[transform:translateX(-50%)] md:bottom-0">
          <CardHeader className="flex flex-col items-center space-y-0 gap-0 pt-6">
            <div className="mb-1 flex items-center justify-between w-full">
              <Link href="/sign-in">
                <h1 className="bg-white size-8 rounded-full grid place-items-center relative -left-4 cursor-pointer">
                  <ArrowLeft size={20} />
                </h1>
              </Link>
              <Image src={assets.logo} alt="MYTSV Logo" width={150} height={50} className="object-contain" />
              <h1 className="opacity-0">0</h1>
            </div>
            <CardTitle className="text-2xl font-bold text-reds mt-3">Verify Code</CardTitle>
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
            className="w-full rounded-full"
            onClick={handleVerify}
          >
            Verify
          </Button>
        </Card>
      </div>
    </div>
  );
}
