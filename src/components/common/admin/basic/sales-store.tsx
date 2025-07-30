"use client";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FromField } from "../reuseable/form-field";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import ImageUploader from "../reuseable/img-upload/img-upload";

export default function SalesStore() {
  const from = useForm({
    // resolver: zodResolver(SignUpSchema),
    defaultValues: {
      representative: "",
      phone_number: "",
      email: "",
      location: "",
    },
  });

  // handleSubmit
  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };

  return (
    <div>
      <Form className="space-y-4 pt-4" from={from} onSubmit={handleSubmit}>
        <ImageUploader title="Drag and drop representative photo here" />
        <FromField
          name="representative"
          placeholder="Enter representative name "
          className="h-11 rounded-2xl"
          icon={
            <FavIcon name="representative" color="#888888" className="size-4" />
          }
        />
        <FromField
          name="phone_number"
          placeholder="Phone number"
          type="number"
          className="h-11 rounded-2xl"
          icon={<FavIcon name="phone" color="#888888" className="size-4" />}
        />
        <FromField
          name="email"
          placeholder="Email address"
          className="h-11 rounded-2xl"
          type="email"
          icon={<FavIcon name="mail" color="#888888" className="size-4" />}
        />
        <FromField
          name="location"
          placeholder="Location Hare"
          className="h-11 rounded-2xl"
          icon={<FavIcon name="location" color="#888888" className="size-4" />}
        />

        <Button
          type="submit"
          variant={"primary"}
          className="w-full rounded-full"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
