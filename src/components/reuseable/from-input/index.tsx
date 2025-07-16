"use client"
import { useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import {
    Controller,
    useFormContext,
    type FieldValues,
    type ControllerRenderProps,
    type ControllerFieldState,
} from "react-hook-form";
import { Input, Label } from "@/components/ui";
import { cn } from "@/lib/utils";




interface formInputProps {
    stylelabel?: string;
    name: string;
    type?: string;
    label?: string;
    eye?: boolean;
    placeholder?: string;
    className?: string;
}

export function FromInput({
    name,
    type = "text",
    eye = false,
    label,
    placeholder,
    stylelabel,
    className,
}: formInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
    const { control } = useFormContext();

    const inputType = eye ? (isPasswordVisible ? "text" : "password") : type;


    return (
        <Controller
            control={control}
            name={name}
            render={({
                field,
                fieldState: { error },
            }: {
                field: ControllerRenderProps<FieldValues>;
                fieldState: ControllerFieldState;
            }) => (
                <div>
                    {/* {label && <Label className={cn("mb-2 text-primary text-base", stylelabel)}>{label}</Label>} */}
                    <div className="relative">
                        <div className="relative">
                             <Input
                            className={cn("peer", className)}
                            {...field}
                            type={inputType}
                            placeholder={placeholder}
                        />
                        <label className="absolute cursor-text bg-body px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
                       Type Here...
                        </label>
                        </div>
                        {eye && (
                            <h1
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute cursor-pointer  top-[6px] right-2"
                            >
                                {isPasswordVisible ? (
                                    <EyeOff className="text-muted-foreground" size={20} />
                                ) : (
                                    <Eye className="text-muted-foreground" size={20} />
                                )}
                            </h1>
                        )}
                    </div>
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




 
// <div class="w-full max-w-sm min-w-[200px]">
//   <div class="relative">
//     <input
//       class="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
//     />
//     <label class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90">
//       Type Here...
//     </label>
//   </div>
// // </div> 