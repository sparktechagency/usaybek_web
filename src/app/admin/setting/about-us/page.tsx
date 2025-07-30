"use client"
import assets from "@/assets";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Img from "@/components/reuseable/img";
import Modal from "@/components/reuseable/modal";
import { Button, Card, CardText } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function AboutUs() {
  const [editOpen, setEditOpen] = useState(false);
    // edit  question
    const editfrom = useForm({
      defaultValues: {
        title: "",
        description:
          "",
      },
    });
  
    const editSubmit = async (values: FieldValues) => {
      console.log("Profile form:", values);
      editfrom.reset();
    };
  return (
    <div>
      <NavTitle
        title="About us"
        subTitle="You can manage the about us section of MyTSV from here."
      />
      <div className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Our Mission Card */}
          <div className="col-span-1 lg:col-span-2 space-y-2">
            <Card className="gap-3 relative">
              <div className="flex items-center gap-x-5">
                <Img
                  src={assets.basic.about.mission}
                  className="size-20"
                  imgStyle="object-left-top object-fill"
                  title="mission"
                />
                <h3 className="text-2xl font-semibold text-blacks">
                  Our Mission
                </h3>
              </div>
              <CardText>
                To empower individuals and businesses through a dynamic,
                user-focused platform that fosters growth, creativity, and
                meaningful connections across communities.Over the years,
                we&apos;ve expanded our offerings, refined our technology
              </CardText>
              <h1 onClick={()=>setEditOpen(!editOpen)} className="absolute top-3 right-5 size-10 rounded-md border grid place-items-center cursor-pointer">
                <FavIcon name="edit"  color="#000000"/>
              </h1>
            </Card>
            <Card className="gap-3">
              <div className="flex items-center gap-x-5">
                <Img
                  src={assets.basic.about.temp}
                  className="size-16"
                  imgStyle="object-left-top object-fill"
                  title="mission"
                />
                <h3 className="text-2xl font-semibold text-blacks">
                  Meet with the Team
                </h3>
              </div>
              <CardText>
                Behind MyTSV is a passionate team of creators, developers, and
                community builders. We come from diverse backgrounds, but
                we&apos;re united by one goal: to make mytsv.com a place where
                ideas come to life and connections lead to real impact.
              </CardText>
              <CardText>
                We&apos;re designers and storytellers, strategists and support
                heroes, all working together to make your experience seamless,
                enriching, and inspiring.
              </CardText>
            </Card>
          </div>
          <div className="col-span-1 lg:col-span-3 space-y-2">
            <Card className="gap-3">
              <div className="flex items-center gap-x-5">
                <Img
                  src={assets.basic.about.story}
                  className="size-16"
                  imgStyle="object-left-top object-fill"
                  title="Our Story"
                />
                <h3 className="text-2xl font-semibold text-blacks">
                  Our Story
                </h3>
              </div>
              <CardText>
                Founded with a vision to bring people and ideas together, MyTSV
                began as a local project with a big dream. What started as a
                small initiative to highlight community talent and services in
                Chicagoland has now grown into a multi-faceted platform serving
                users from all walks of life
              </CardText>
              <CardText>
                We&apos;re designers and storytellers, strategists and support
                heroes, all working together to make your experience seamless,
                enriching, and inspiring.
              </CardText>
              <CardText>
                Over the years, we&apos;ve expanded our offerings, refined our
                technology, and stayed committed to the needs of our growing
                user base—all while keeping our core values front and center.
              </CardText>
            </Card>
            <Card className="gap-3">
              <div className="flex items-center gap-x-5">
                <Img
                  src={assets.basic.about.choose}
                  className="size-16"
                  imgStyle="object-left-top object-fill"
                  title="Our Story"
                />
                <h3 className="text-2xl font-semibold text-blacks">
                  Why choose MyTsv ?
                </h3>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-semibold">User-First Design:</span>{" "}
                  We&apos;re constantly evolving to make sure your experience is
                  smooth and meaningful.
                </li>
                <li>
                  <span className="font-semibold">Community Focused:</span> We
                  highlight real people, real businesses, and real stories.
                </li>
                <li>
                  <span className="font-semibold">Versatility:</span> Whether
                  you&apos;re promoting a service, launching a project, or
                  exploring new trends, there&apos;s a place for you here.
                </li>
              </ul>
            </Card>
          </div>
        </div>
        <Card className="gap-3 mt-3">
          <div className="flex items-center justify-center gap-x-5">
            <Img
              src={assets.basic.about.join}
              className="size-16"
              imgStyle="object-left-top object-fill"
              title="Our Story"
            />
            <h3 className="text-2xl font-semibold text-blacks">Join Us</h3>
          </div>
          <CardText className="text-center">
            Whether you&apos;re a local business owner, a creative mind, or
            someone searching for inspiration—MyTSV is your stage. Explore,
            connect, grow. We&apos;re glad yo&apos;re here.
          </CardText>
        </Card>
      </div>

      {/*      {/*edit question*/}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit Blog"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <FromInputs
            label="Title"
            name="title"
            placeholder="Enter your title"
            stylelabel="bg-white"
          />
          <FromTextAreas
            label="Description"
            name="description"
            placeholder="Enter your Description"
            className="min-h-44 rounded-3xl"
            stylelabel="bg-white"
          />
          <Button variant="primary" className="rounded-full w-full" size="lg">
            Save changes
          </Button>
        </Form>
      </Modal> 
    </div>
  );
}
