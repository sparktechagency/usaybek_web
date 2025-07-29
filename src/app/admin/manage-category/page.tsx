"use client";
import { Deletebtn, Editbtn } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import Modal from "@/components/reuseable/modal";
import { Button } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import z from "zod";

const categories = [
  "Beauty esthetics",
  "Restaurant & Catering",
  "Antiques",
  "Hair stylists",
  "Supermarket malls",
  "Electronic stores",
  "Auto mechanics",
  "Medical doctors",
];
// schema
const CategorySchema = z.object({
  category_name: z.string().nonempty("Category is required"),
});

export default function ManageCategory() {
  const [isStore, setIsStore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { confirm } = useConfirmation();

  //   create section
  const createfrom = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category_name: "",
    },
  });

  const CreateSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
    createfrom.reset();
  };

  // edit section
  const editfrom = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      category_name: "Electronic stores",
    },
  });

  const EditSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
    editfrom.reset();
  };

  //   handledelete
  const handleDelete = async (id: any) => {
    const con = await confirm({
      title: "Are you sure to delete this category ?",
      description: "Users will not be able to find this category.",
      icon: true,
    });
    if (con) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage category"
        subTitle="You can manage your video categories of your website from here."
      />
      <div className="flex gap-6 flex-wrap">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-3 flex items-center justify-between"
          >
            <span className="text-lg font-semibold text-blacks flex-1">
              <span className="font-medium">{index + 1}.</span> {category}
            </span>
            <div className="flex items-center gap-2 ml-3">
              <Editbtn onClick={() => setIsEdit(!isEdit)} />
              <Deletebtn onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setIsStore(!isStore)}
        variant="primary"
        size="lg"
        className="rounded-full mt-7"
      >
        <Plus className="text-white size-5" />
        Add more
      </Button>
      {/* store */}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        titleStyle="text-center"
        title="Create a new category"
      >
        <Form
          className="space-y-6 pt-4"
          from={createfrom}
          onSubmit={CreateSubmit}
        >
          <FromInput
            className="bg-white border rounded-2xl"
            label="Category name"
            name="category_name"
            placeholder="Type hare"
            matching={true}
          />
          <Button variant="primary" size="lg" className="w-full rounded-full">
            Save
          </Button>
        </Form>
      </Modal>
      {/* edit */}
      <Modal open={isEdit} setIsOpen={setIsEdit}  titleStyle="text-center" title="Edit category">
        <Form className="space-y-6 pt-4" from={editfrom} onSubmit={EditSubmit}>
          <FromInput
            className="bg-white border rounded-2xl"
            label="Category name"
            name="category_name"
            placeholder="Type hare"
            matching={true}
          />
          <Button variant="primary" size="lg" className="w-full rounded-full">
          Save changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
