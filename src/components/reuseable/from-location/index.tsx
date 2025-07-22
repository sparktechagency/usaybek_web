"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui";
import {
  Controller,
  useFormContext,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface formInputProps {
  stylelabel?: string;
  name?: string;
  label?: string;
  className?: string;
}

interface Location {
  id: number;
  name: string;
  type: string;
}

export default function FromLocation({
  name = "locations",
  label,
  stylelabel,
  className,
}: formInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[
        { id: 1, name: "Location 1", type: "Branch" },
      ]}
      render={({
        field,
        fieldState: { error },
      }: {
        field: ControllerRenderProps<FieldValues>;
        fieldState: ControllerFieldState;
      }) => {
        const locations: Location[] = field.value || [];

        const handleAddLocation = () => {
          const nextId = locations.length
            ? Math.max(...locations.map((l) => l.id)) + 1
            : 1;
          const updated = [
            ...locations,
            { id: nextId, name: `Location ${nextId}`, type: "Branch" },
          ];
          field.onChange(updated);
        };

        const handleLocationNameChange = (id: number, newName: string) => {
          const updated = locations.map((loc) =>
            loc.id === id ? { ...loc, name: newName } : loc
          );
          field.onChange(updated);
        };

        const handleLocationTypeChange = (id: number, newType: string) => {
          const updated = locations.map((loc) =>
            loc.id === id ? { ...loc, type: newType } : loc
          );
          field.onChange(updated);
        };

        return (
          <div className={cn("relative border rounded-3xl p-3", className)}>
            <Label
              className={cn(
                "text-blacks text-base font-medium absolute -top-3 left-7 bg-body px-3",
                stylelabel
              )}
            >
              {label ?? "Locations"}
            </Label>

            <div className="mt-2">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="flex flex-col sm:flex-row gap-2 mb-2"
                >
                  <Input
                    placeholder={`Location ${location.id}`}
                    value={location.name}
                    onChange={(e) =>
                      handleLocationNameChange(location.id, e.target.value)
                    }
                    className="flex-1 rounded-full"
                  />
                  <Select
                    value={location.type}
                    onValueChange={(value) =>
                      handleLocationTypeChange(location.id, value)
                    }
                  >
                    <SelectTrigger className="sm:w-[150px] rounded-full ring-0 shadow-none">
                      <SelectValue placeholder="Office type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="border-b py-3 pl-4 rounded-none"
                        value="Branch"
                      >
                        Branch
                      </SelectItem>
                      <SelectItem
                        className="border-b py-3 pl-4 rounded-none"
                        value="Head office"
                      >
                        Head office
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            <Button
              type="button"
              onClick={handleAddLocation}
              variant="primary"
              className="rounded-full h-8"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add more
            </Button>
          </div>
        );
      }}
    />
  );
}
