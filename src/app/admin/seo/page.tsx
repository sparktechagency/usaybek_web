"use client";
import SocialMediaLink from "@/components/common/admin/basic/social-add";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTagInputs } from "@/components/reuseable/from-tag-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import { Button } from "@/components/ui";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
}

export default function Seo() {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      tags: ["React", "Next.js", "Tailwind"],
    },
  });
  const handleSubmit = (values: FieldValues) => console.log("Form:", values);

  return (
    <div>
      <NavTitle
        title="SEO Management"
        subTitle="You can manage your seo of your website from here"
      />
      <Form from={form} onSubmit={handleSubmit}>
        <div className="space-y-8 max-w-6xl mx-auto py-10">
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
          <FromTagInputs label="Tags" name="tags" />
          <SocialMediaLink socialLinks={socialLinks} setSocialLinks={setSocialLinks}/>
          <Button
            variant="primary"
            size="lg"
            className="rounded-full float-end"
          >
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}
