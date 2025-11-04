import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { Button } from "@/components/ui";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayload } from "@/lib";
import { useUpdatePasswordMutation } from "@/redux/api/authApi";
import { passwordChangeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePassword({ setIsPassword }: any) {
  const [isError, setIsError] = useState("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const from = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      c_password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    try {
      setIsError("");
      const data = modifyPayload(values);
      const res = await updatePassword(data).unwrap();
      if (res.status) {
        toast.success("Password Changed Successfully", {
          description: "You can now login with new password",
        });
        setIsPassword(false);
        from.reset();
      }
    } catch (err: any) {
      if (err?.data?.message) {
        setIsError(err?.data?.message);
      } else {
        ResponseApiErrors(err.data, from);
      }
    }
  };

  return (
    <Form className="space-y-6 pt-5" from={from} onSubmit={handleSubmit}>
      <FromInputs
        eye={true}
        label="Current Password"
        name="current_password"
        type="password"
        placeholder="Enter your Current Password"
        stylelabel="bg-white"
      />
      <FromInputs
        eye={true}
        label="New Password"
        name="new_password"
        type="password"
        placeholder="Enter your New  Password"
        stylelabel="bg-white"
      />
      <FromInputs
        eye={true}
        label="Confirm Password"
        name="c_password"
        type="password"
        placeholder="Enter your Confirm Password"
        stylelabel="bg-white"
      />

      {isError && <p className="text-red-400 text-center">{isError}</p>}

      <Button
        type="submit"
        variant="primary"
        className="w-full rounded-full"
        disabled={isLoading}
      >
        Update Password
      </Button>
    </Form>
  );
}
