import Modal from "@/components/reuseable/modal";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib";
import { useGetCitiesQuery, useGetStatesQuery } from "@/redux/api/commonApi";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const intValue = {
  service: "",
  state: "",
  city: "",
};

export default function NavberSearchBox({ className }: any) {
  const [isLocation, setIsLocation] = useState(false);
  const [isValue, setIsValue] = useState(intValue);
  const [isSelect, setIsSelect] = useState({
    state: [] as { label: string; value: string }[],
    city: [] as { label: string; value: string }[],
  });

  // Fetch states only when location modal is open
  const { data: states } = useGetStatesQuery({}, { skip: !isLocation });
  const { data: citys } = useGetCitiesQuery(isValue.state, {
    skip: !isValue.state,
  });

  // Handle input change
  const handleChange = (name: keyof typeof intValue, value: string) => {
    setIsValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Populate states select
  useEffect(() => {
    if (!states?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      state: states.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [states]);

  // Populate cities select
  useEffect(() => {
    if (!citys?.length) return;
    setIsSelect((prev) => ({
      ...prev,
      city: citys.map(({ name, id }: any) => ({
        label: name,
        value: id?.toString(),
      })),
    }));
  }, [citys]);

  // Selected state & city name
  const state_name =
    states?.find((s: any) => String(s.id) === isValue.state)?.name || "";
  const city_name =
    citys?.find((c: any) => String(c.id) === isValue.city)?.name || "";

  //  handleSearch
  const handleSearch = () => {
    const value = {
      service: isValue.service,
      state: state_name,
      city: city_name,
    };

    // Only proceed with search if all fields are filled
    if (value.service === "" || value.state === "" || value.city === "") {
      return;
    }

    console.log(value);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-white px-2 shadow w-full md:max-w-5xl mx-auto",
        className
      )}
    >
      {/* Service Input */}
      <input
        type="text"
        placeholder="Service"
        className="flex-1 h-full px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676] text-base"
        aria-label="Service search input"
        value={isValue.service}
        onChange={(e: any) => handleChange("service", e.target.value)}
      />

      {/* Location Input (click to open modal) */}
      <input
        type="text"
        placeholder="Location"
        readOnly
        className={`flex-1 h-full text-base px-4 bg-transparent outline-none text-[#767676] placeholder:text-[#767676]  border-l border-[#A0A0A0] cursor-pointer`}
        aria-label="Location search input"
        value={
          isValue?.state
            ? `${state_name}${city_name ? `, ${city_name}` : ""}`
            : "Location"
        }
        onClick={(e) => {
          e.stopPropagation();
          setIsLocation(true);
        }}
      />

      {/* Search Button */}
      <Button
        variant="primary"
        className="w-[120px] px-0 h-11 my-1 rounded-full has-[>svg]:px-0"
        onClick={() => handleSearch()}
      >
        <Search className="w-5 h-5" />
        Search
      </Button>

      {/* Location Modal */}
      <Modal open={isLocation} setIsOpen={setIsLocation} title="Location">
        <div className="text-center">
          <FavIcon name="navlocation" className="mx-auto size-20" />
          <div className="py-3">
            <h1 className="text-2xl font-bold text-blacks">Choose location</h1>
            <h1 className="text-base max-w-xs text-center mx-auto">
              For show related videos depended on location
            </h1>
          </div>

          {/* State Dropdown */}
          <Select
            onValueChange={(value) => handleChange("state", value)}
            value={isValue.state}
          >
            <SelectTrigger className="w-full cursor-pointer rounded-full py-[20px] shadow-none">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isSelect.state.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* City Dropdown */}
          <Select
            onValueChange={(value) => {
              handleChange("city", value);
            }}
            value={isValue.city}
            disabled={!isValue.state}
          >
            <SelectTrigger className="w-full rounded-full cursor-pointer py-[20px] shadow-none mt-3">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isSelect.city.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 space-x-5">
            <Button
              size="lg"
              variant="primary"
              className="rounded-full bg-[#F0F0F0] text-blacks px-10"
              onClick={() => {
                setIsValue(intValue); // reset service, state, city
                setIsSelect((prev) => ({
                  ...prev,
                  city: [], // also clear cities when state is cleared
                }));
              }}
            >
              Clear
            </Button>
            <Button
              size="lg"
              variant="primary"
              className="rounded-full px-10"
              onClick={() => setIsLocation(false)}
            >
              Go
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
