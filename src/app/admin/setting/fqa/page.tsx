"use client";
import { Deletebtn, Editbtn } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Modal from "@/components/reuseable/modal";
import { Button } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const questionsData = [
  {
    title: "Sign Up and Onboard",
    content:
      "Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started.",
  },
  {
    title: "Recruit Affiliates",
    content:
      "Launch your advertising campaigns across various channels. Whether you're focusing on display ads, social media, or search, Affity supports all major advertising platforms.",
  },
  {
    title: "Track and Optimize",
    content:
      "Monitor your campaigns in real-time and use our advanced analytics to optimize performance. Make data-driven decisions to enhance your ROI.",
  },
  {
    title: "Scale Your Efforts",
    content:
      "As you refine your strategy, scale your campaigns to reach a larger audience. Affity provides the tools you need to grow your advertising efforts successfully.",
  },
];

export default function FQA() {
  const { confirm } = useConfirmation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  // edit  question
  const editfrom = useForm({
    defaultValues: {
      question: "Sign Up and Onboard",
      answer:
        "Create your account and set up your first campaign with ease. Our user-friendly interface and guided setup process make it simple to get started",
    },
  });

  const editSubmit = async (values: FieldValues) => {
    console.log("Profile form:", values);
    editfrom.reset();
  };

  // add question
  const storefrom = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const StoreSubmit = async (values: FieldValues) => {
    console.log("Profile form:", values);
    storefrom.reset();
  };

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "You are going to delete this question",
      description:
        "After deleting, users can't find this question & answer anymore.",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="FAQ"
        subTitle="You can manage the FAQ section of MyTSV from here."
      />
      <div className="py-5" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            {questionsData.map((item, index) => (
              <div key={index} className="flex">
                <div className="py-[10px] px-5 mb-4 bg-white rounded-md border cursor-pointer w-full">
                  <div
                    className="flex items-center justify-between"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4 className="text-base font-medium text-[#1B1B1B]">
                      {item.title}
                    </h4>
                    <span>
                      {activeAccordion === index ? (
                        <ChevronUp
                          size={27}
                          className="text-primary rounded-full p-1"
                        />
                      ) : (
                        <ChevronDown
                          size={27}
                          className="text-primary rounded-full p-1"
                        />
                      )}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      activeAccordion === index ? "max-h-full" : "max-h-0"
                    }`}
                    style={{
                      maxHeight: activeAccordion === index ? "500px" : "0px",
                    }}
                  >
                    <p className="text-sm lg:text-base mt-1">{item.content}</p>
                  </div>
                </div>
                <div className="ml-2 w-32 flex gap-2">
                  <Editbtn
                    onClick={() => setEditOpen(!editOpen)}
                    className="rounded-md size-11"
                  />
                  <Deletebtn
                    onClick={() => handleDelete(index)}
                    className="rounded-md size-11"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => setStoreOpen(!storeOpen)}
          variant="primary"
          size="lg"
          className="rounded-full mt-7"
        >
          <Plus className="text-white size-5" />
          Add FQA
        </Button>
      </div>
      {/*edit question*/}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <FromInputs
            label="Question"
            name="Question"
            placeholder="Enter your Question"
            stylelabel="bg-white"
          />
          <FromTextAreas
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-3xl"
            stylelabel="bg-white"
          />
          <Button variant="primary" className="rounded-full w-full" size="lg">
            Save changes
          </Button>
        </Form>
      </Modal>

      {/* added question */}
      <Modal
        open={storeOpen}
        setIsOpen={setStoreOpen}
        title="Add FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form
          from={storefrom}
          onSubmit={StoreSubmit}
          className="space-y-6 pt-4"
        >
          <FromInputs
            label="Question"
            name="Question"
            placeholder="Enter your Question"
            stylelabel="bg-white"
          />
          <FromTextAreas
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-3xl"
            stylelabel="bg-white"
          />
          <Button variant="primary" className="rounded-full w-full" size="lg">
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
