"use client";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming Label is in /ui
import {
  Controller,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";

// --- Helper Functions ---

/**
 * Debounce function to delay execution of a function.
 * This prevents firing the API call on every keystroke.
 */
const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * Fetches place predictions from Google Maps API.
 * WARNING: For production, this should be an API route on your server
 * to protect your API key and handle CORS.
 */
const fetchGooglePlaces = async (query: string) => {
  if (!query || query.length < 3) return [];
  
  // IMPORTANT: Replace with your actual API key, preferably via a secure backend.
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    console.error("Google Maps API Key is missing.");
    return [];
  }
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`);
    console.log(response)
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching Google Places:", error);
    return [];
  }
};


// --- Component Definition ---

interface FormInputProps {
  stylelabel?: string;
  name?: string;
  label?: string;
  className?: string;
}

export default function FromLocation({
  name = "locations",
  label,
  stylelabel,
  className,
}: FormInputProps) {
  const { control, setValue } = useFormContext();
  const { fields, append} = useFieldArray({
    control,
    name,
  });



  // State to hold suggestions for each input, keyed by index
  const [suggestions, setSuggestions] = useState<{ [key: number]: any[] }>({});

  const handleSearch = useCallback(
    debounce(async (query: string, index: number) => {
      if (query) {
        const results = await fetchGooglePlaces(query);
        setSuggestions(prev => ({ ...prev, [index]: results }));
      } else {
        setSuggestions(prev => ({ ...prev, [index]: [] }));
      }
    }, 500), // 500ms debounce delay
    []
  );

  const handleSelectSuggestion = (suggestion: any, index: number) => {
    // Update multiple form fields using setValue
    setValue(`${name}.${index}.location`, suggestion.formatted_address, { shouldValidate: true });
    setValue(`${name}.${index}.lat`, suggestion.geometry.location.lat);
    setValue(`${name}.${index}.long`, suggestion.geometry.location.lng);

    // Clear suggestions for this input
    setSuggestions(prev => ({ ...prev, [index]: [] }));
  };

  const handleAddLocation = () => {
    // Append a new empty location object to the array
    append({ location: "", type: "branch", lat: "", long: "" });
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

      <div className="mt-2 space-y-3">
        {fields.map((item, index) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start gap-2">
            <div className="relative w-full">
               <Controller
                 name={`${name}.${index}.location`}
                 control={control}
                 rules={{ required: "Location is required" }}
                 render={({ field, fieldState: { error } }) => (
                   <>
                     <Input
                       {...field}
                       placeholder={`Location ${index + 1}`}
                       className="flex-1 rounded-full"
                       onChange={(e) => {
                         field.onChange(e); // Update form state
                         handleSearch(e.target.value, index); // Trigger search
                       }}
                       autoComplete="off"
                     />
                     {suggestions[index] && suggestions[index].length > 0 && (
                       <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                         {suggestions[index].map((sug) => (
                           <li
                             key={sug.place_id}
                             className="p-3 text-sm hover:bg-gray-100 cursor-pointer"
                             onClick={() => handleSelectSuggestion(sug, index)}
                           >
                             {sug.formatted_address}
                           </li>
                         ))}
                       </ul>
                     )}
                     {error && <p className="text-sm text-red-500 mt-1 ml-3">{error.message}</p>}
                   </>
                 )}
               />
            </div>

            <Controller
              name={`${name}.${index}.type`}
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full sm:w-[180px] rounded-full ring-0 shadow-none">
                    <SelectValue placeholder="Office type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="head-office">Head Office</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="primary"
        className="rounded-full h-8 mt-4"
        onClick={handleAddLocation}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add more
      </Button>
    </div>
  );
}