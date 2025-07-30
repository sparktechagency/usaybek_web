"use client";

import React, { useState } from "react";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";

export default function Contacts() {
  const [contacts, setContacts] = useState({
    email: "example@gmail.com",
    phone: "+98562354785",
    location: "Dhaka, Bangladesh",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContacts((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", contacts);
    // Here you can call an API or dispatch Redux action
  };

  return (
    <div>
      <NavTitle
        title="Contacts"
        subTitle="You can manage the contacts section of MyTSV from here"
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto space-y-8 py-10"
      >
        <ul className="flex gap-2">
          <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
            <FavIcon name="mail" className="size-5" />
          </li>
          <li className="w-full">
            <Input
              placeholder="Type Here"
              name="email"
              value={contacts.email}
              onChange={handleChange}
              className="rounded-full h-11"
            />
          </li>
        </ul>

        <ul className="flex gap-2">
          <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
            <FavIcon name="phone" className="size-5" />
          </li>
          <li className="w-full">
            <Input
              placeholder="Type Here"
              name="phone"
              value={contacts.phone}
              onChange={handleChange}
              className="rounded-full h-11"
            />
          </li>
        </ul>

        <ul className="flex gap-2">
          <li className="bg-white rounded-full grid place-items-center h-[46px] w-12">
            <FavIcon name="location" className="size-5" />
          </li>
          <li className="w-full">
            <Input
              placeholder="Type Here"
              name="location"
              value={contacts.location}
              onChange={handleChange}
              className="rounded-full h-11"
            />
          </li>
        </ul>

        <Button
          type="submit"
          variant="primary"
          className="rounded-full float-right"
          size="lg"
        >
          Save changes
        </Button>
      </form>
    </div>
  );
}
