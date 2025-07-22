"use client";
import { CircleAlert } from "lucide-react";
import {
  Controller,
  useFormContext,
  FieldValues,
  ControllerRenderProps,
  ControllerFieldState,
} from "react-hook-form";
import { Label } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib/utils";

interface FormSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  items: { label: string, value: string,icon?:any }[]
  defaultValue?: string
  stylelabel?: string
}

export function InputSelectField({ name, label, placeholder, items, defaultValue, stylelabel }: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => (
        <div className="relative">
          <Select onValueChange={onChange} value={value || defaultValue || ""}>
            <SelectTrigger className="w-full rounded-full  py-[22px] cursor-pointer shadow-none">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-md p-0">
              <SelectGroup className="p-0 m-0">
                {items?.map((item, index) => (
                  <SelectItem
                    className="border-b last:border-b-0 py-3 pl-4 rounded-none"
                    key={index}
                    value={item.value}
                  >
                   {item.icon && item.icon} {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label className={cn("text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3", stylelabel)}>{label}</Label>
          {error?.message && (
            <h3 className="text-sm pt-[1px] text-end text-[#f73f4e] flex gap-1 items-center justify-end">
              {error.message}
              <CircleAlert size={14} />
            </h3>
          )}
        </div>
      )}
    />
  );
}