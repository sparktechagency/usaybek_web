"use client"
import VideoPlayer from '@/components/common/video-player'
import Form from '@/components/reuseable/from'
import { FromInputs } from '@/components/reuseable/from-inputs'
import { InputSelectField } from '@/components/reuseable/from-select'
import { FromTagInputs } from '@/components/reuseable/from-tag-inputs'
import { FromTextAreas } from '@/components/reuseable/from-textareas'
import { Button } from '@/components/ui'
import Icon from '@/icon'
import { PlaceholderImg } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'

export default function EditVideo() {
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      title: "Joe's Expert Auto LLC. - Address:",
      description: "Lorem ipsum dolor sit amet consectetur. Aenean tortor tellus semper tincidunt vel. Eget venenatis feugiat sed eget facilisi felis egestas. Tempor pulvinar vel euismod mattis. Auctor porttitor proin augue massa massa. Tortor vel eu felis tempus. Semper sit proin molestie semper fermentum. Justo accumsan rutrum ut risus at purus dignissim. Sit ipsum aenean aliquet suspendisse. Pulvinar egestas justo sed aliquam id donec sit nec. Cursus volutpat pellentesque odio donec. Et ac aliquet neque quis pulvinar consectetur lorem felis. ",
      state: "Uk",
      city: "Bangldesh",
      category: "category1",
      visibility: "everyone",
      tags: ["React", "Next.js", "Tailwind"],

    },
  });


  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };

  return (
    <Form
      from={from}
      onSubmit={handleSubmit}
    >
      <div className='pb-10'>
        <ul className='flex justify-between my-4'>
          <li >
            <Link className='font-medium text-lg flex items-center' href={"/dashboard/my-videos"}><ArrowLeft size={18} className='mr-3 font-bold' />Video details</Link>
          </li>
          <li className='flex gap-x-2'>
            <Link href={"/dashboard/edit-video"}>
              <Button variant={"primary"} size={"lg"} className='rounded-full bg-transparent text-blacks border shadow-none text-base'> <Icon name="undoBlack" width={16} /> Undo changes</Button>
            </Link>
            <Button variant={"primary"} size={"lg"} className='rounded-full text-base'><Icon name="saveWhite" width={16} />Save changes</Button>
          </li>
        </ul>

        <div className="space-y-6 pt-4">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <div className='space-y-9'>
              <VideoPlayer />
              <FromInputs
                label="Title"
                name="title"
                placeholder="Enter your title"
              />
              <FromTextAreas
                label="Description"
                name="description"
                placeholder="Enter your Description"
                className='min-h-44 rounded-3xl'
              />
            </div>
            <div className='space-y-8 border px-3 py-5  rounded-md'>
              <FromInputs
                label='State'
                name="state"
                placeholder="State name here"
              />
              <FromInputs
                label='City'
                name="city"
                placeholder="City name here"
              />
              <InputSelectField
                items={[
                  { label: "Category 1", value: "category1" },
                  { label: "Category 2", value: "Category 2" },
                  { label: "Category 3", value: "Category 3" },
                  { label: "Category 4", value: "Category 4" },
                  { label: "Category 5", value: "Category 5" },
                  { label: "Category 6", value: "Category 6" },
                  { label: "Category 7", value: "Category 7" },
                  { label: "Category 8", value: "Category 8" },
                ]}
                label="Category"
                name="category"
                placeholder="Select category"
              ></InputSelectField>
              <InputSelectField
                items={[
                  { label: "Everyone", value: "everyone",icon:<Icon width={18} name="internetBlack"/> },
                  { label: "Only me", value: "only me",icon:<Icon  width={14} name="lockBack"/> }
                ]}
                label="Visibility"
                name="visibility"
                placeholder="Select category"
              ></InputSelectField>

              <FromTagInputs
                label='Tags'
                name="tags"
              />

              <div>
                <h1 className='font-semibold text-xl my-6'>Thumbnail</h1>
                <div className="w-full h-auto md:w-[600px] md:h-[300px]">
                  <Image
                    src={PlaceholderImg(400, 400)}
                    alt={"Thumbnail"}
                    width={400}
                    height={225}
                    className="w-full h-full rounded-md object-cover aspect-video"
                  />
                </div>
                <h1 className='text-reds flex items-center gap-2 mt-2'><Icon width={18} name="alertRed" />Image resolution should be minimum 1080x528 px </h1>
              </div>

            </div>
          </div>
        </div>

      </div>
    </Form>
  )
}
