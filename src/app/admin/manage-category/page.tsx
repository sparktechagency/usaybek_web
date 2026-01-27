"use client";
import { Deletebtn, Editbtn } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import { FromTextAreaResizing } from "@/components/reuseable/from-textarea-resizing";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { Button, Skeleton } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import { modifyPayload } from "@/lib";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useStoreCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/api/admin/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// schema
const CategorySchema = z.object({
  name: z.string().nonempty("Category is required"),
  description: z.string().nonempty("Description is required"),
});

export default function ManageCategory() {
  const { confirm } = useConfirmation();
  const [isPage, setIsPage] = useState<number>(1);
  const { data: categories, isLoading } = useGetCategoryQuery({
    page: isPage,
    per_page: 20,
  });
  const [storeCategory, { isLoading: storeLoading }] =
    useStoreCategoryMutation();
  const [updateCategory, { isLoading: updateLoading }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isEditId, setIsEditId] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [isStore, setIsStore] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // create section
  const createfrom = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const CreateSubmit = async (values: FieldValues) => {
    try {
      const data = modifyPayload(values);
      const res = await storeCategory(data).unwrap();
      if (res.status) {
        toast.success("Category Added", {
          description: "A new category has been successfully added",
        });
        createfrom.reset();
        setIsStore(false);
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, createfrom);
    }
  };

  // edit section
  const editfrom = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: isEditId?.name,
      description: isEditId?.description,
    },
  });
  useEffect(() => {
    editfrom.reset({
      name: isEditId?.name,
      description: isEditId?.description || "",
    });
  }, [isEditId, editfrom]);

  //  == edit submit ==
  const EditSubmit = async (values: FieldValues) => {
    const value = {
      name: values.name,
      description: values.description,
      _method: "PUT",
    };
    try {
      const data = modifyPayload(value);
      const res = await updateCategory({
        id: isEditId.id,
        data,
      }).unwrap();
      if (res.status) {
        toast.success("Category updated", {
          description: "Category has been successfully updated",
        });
        setIsEdit(false);
      }
    } catch (err: any) {
      ResponseApiErrors(err.data, editfrom);
    }
    setIsEditId({
      id: "",
      name: "",
      description: "",
    });
    editfrom.reset();
  };

  // handledelete
  const handleDelete = async (id: any) => {
    const con = await confirm({
      title: "Are you sure to delete this category ?",
      description: "Users will not be able to find this category.",
    });
    if (con) {
      await deleteCategory(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage Category"
        subTitle="You can manage your video categories of your website from here"
      />
      <div className="flex flex-col h-[calc(100vh-150px)]  justify-between">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <SkeletonCount count={15}>
                <Skeleton className="w-full h-35 rounded-xl" />
              </SkeletonCount>
            ) : (
              categories?.data?.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-blacks flex-1">
                      {item?.name}
                    </span>
                    <div className="flex items-center gap-2 ml-3">
                      <Editbtn
                        onClick={() => {
                          setIsEditId({
                            id: item?.id,
                            name: item?.name,
                            description: item?.description,
                          });
                          setIsEdit(!isEdit);
                        }}
                      />
                      <Deletebtn onClick={() => handleDelete(item?.id)} />
                    </div>
                  </div>
                  <p className="text-[#535353] text-base mt-px line-clamp-3 w-fit">{item?.description || "N/A"}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex mt-6 lg:mt-0  items-center w-full justify-between">
          <Button
            onClick={() => setIsStore(!isStore)}
            variant="primary"
            size="lg"
            className="rounded-full"
          >
            <Plus className="text-white size-5" />
            <span className="hidden mr-2 lg:mr-0 lg:block">Add more</span>
          </Button>
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...categories?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </div>
      </div>
      {/* store */}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        titleStyle="text-center"
        title="Add New Category"
      >
        <Form
          className="space-y-6 pt-4"
          from={createfrom}
          onSubmit={CreateSubmit}
        >
          <FromInput
            className="bg-white border rounded-2xl"
            label="Category name"
            name="name"
            placeholder="Enter category name"
            matching={true}
          />
          <FromTextAreaResizing
            className="bg-white border  min-h-30 repeat-infinite rounded-2xl"
            label="Description"
            name="description"
            placeholder="Enter category description"
          />
          <Button
            variant="primary"
            disabled={storeLoading}
            size="lg"
            className="w-full rounded-full"
          >
            Save
          </Button>
        </Form>
      </Modal>
      {/* ================== edit ==================== */}
      <Modal
        open={isEdit}
        setIsOpen={setIsEdit}
        titleStyle="text-center"
        title="Edit category"
      >
        <Form className="space-y-6 pt-4" from={editfrom} onSubmit={EditSubmit}>
          <FromInput
            className="bg-white border rounded-2xl"
            label="Category name"
            name="name"
            placeholder="Enter category name"
            matching={true}
          />
          <FromTextAreaResizing
            className="bg-white border  min-h-30 repeat-infinite rounded-2xl"
            label="Description"
            name="description"
            placeholder="Enter category description"
          />
          <Button
            disabled={updateLoading}
            variant="primary"
            size="lg"
            className="w-full rounded-full"
          >
            Save changes
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
