"use client";
import ImageUploader from "@/components/common/admin/reuseable/img-upload/img-upload";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import TextEditor from "@/components/common/admin/reuseable/text-editor";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import { Button } from "@/components/ui";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function AddBlog() {
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      title: "",
      description: " ",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };

  return (
    <div>
      <NavTitle
        title="Add Blogs"
        subTitle="You can manage your blogs of your website from here."
      />
      <Form from={from} onSubmit={handleSubmit} className="space-y-7 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-10">
            <ImageUploader title="Drag and drop your file here" />
            <FromInputs
              label="Title"
              name="title"
              placeholder="Enter your title"
            />
            <FromTextAreas
              label="Description"
              name="description"
              placeholder="Enter your Description"
              className="min-h-44 rounded-3xl"
            />
          </div>
          <div>
             <TextEditor value="" onChange={(v)=>console.log(v)} className="bg-body !min-h-[520px]"/>
        </div>
        <div className="col-span-2 flex justify-end">
           <Button variant="primary" size="lg" className="rounded-full">Submit</Button>
        </div>
        </div>
       
      </Form>
    </div>
  );
}
