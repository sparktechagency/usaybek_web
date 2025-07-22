"use client"
import NavItem from '@/components/common/dashboard/navber'
import CoverBox from '@/components/reuseable/cover-box'
import Form from '@/components/reuseable/from';
import { FromInputs } from '@/components/reuseable/from-inputs';
import FromLocation from '@/components/reuseable/from-location';
import { FromTagInputs } from '@/components/reuseable/from-tag-inputs';
import { FromTextAreas } from '@/components/reuseable/from-textareas';
import { Button } from '@/components/ui';
import Icon from '@/icon';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';

export default function Settings() {
  const from = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      channel_name: "Haircut Pro",
      email: "example@gmail.com",
      services: ["Haircut Pro1", "Haircut Pro2", "Haircut Pro3"],
      full_name: "Julfieker Islam",
      contact: "79454095409",
      bio: "Lorem ipsum dolor sit amet consectetur. Pretium gravida risus enim suspendisse. Id id molestie dictum mauris tincidunt. Molestie posuere quam sapien luctus. Consectetur tincidunt tincidunt fermentum ut risus quam. Suspendisse vivamus laoreet ornare molestie iaculis vitae urna. Diam augue sed rhoncus nec egestas praesent sit orci. Dui ut morbi nulla ipsum eget semper quis non. Fames nullam aliquam pellentesque tortor nulla. Id eget dolor sagittis aenean proin.",
      locations:[
        { id: 1, name: "Location 1", type: "Branch" }
      ],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log("Login form:", values);
  };
  return (
    <div>
      <NavItem title='Settings' />
      <div className='mt-10'>
        <CoverBox edit={true} />
      </div>
      <Form
        className="mt-20"
        from={from}
        onSubmit={handleSubmit}
      >
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 [&>div]:space-y-6'>
          <div>
            <FromInputs
              label="Channel name"
              name="channel_name"
              placeholder="Enter your Channel name"
            />
            <FromInputs
              label="Email"
              name="email"
              placeholder="Enter your Email"
            />
            <FromTagInputs
              label="Services"
              name="services"
              placeholder="Enter your Services"
            />
            <FromLocation
             label="Business locations"
             name="locations"
            />

          </div>
          <div>
            <FromInputs
              label="Your full name"
              name="full_name"
              placeholder="Enter your Full name"
            />
            <FromInputs
              type='number'
              label="Contact"
              name="contact"
              placeholder="Enter your Contact"
            />
            <FromTextAreas
              label="Bio"
              name="bio"
              placeholder="Enter your Bio"
              className='min-h-44 rounded-3xl'
            />
           <div className='flex justify-end'>
           <Button variant={"primary"} size={"lg"} className='rounded-full text-base'><Icon name="saveWhite" width={16} />Save changes</Button>
           </div>
          </div>

        </div>
      </Form>
    </div>
  )
}
