import { z } from "zod";

// /passwordSchema
// export const passwordSchema = z
//   .object({
//     current_password: z.string().nonempty("Current Password is required"),
//     new_password: z.string().nonempty("New Password is required"),
//     confirm_password: z.string().nonempty("Confirm password is required"),
//   })
//   .refine((value) => value.new_password === value.confirm_password, {
//     path: ["confirm_password"],
//     message: "Passwords must be match.",
//   });

// updateSchema
// export const updateSchema = z
//   .object({
//     new_password: z.string().nonempty("New Password is required"),
//     confirm_password: z.string().nonempty("Confirm password is required"),
//   })
//   .refine((value) => value.new_password === value.confirm_password, {
//     path: ["confirm_password"],
//     message: "Passwords must be match.",
//   });


export const contactSchema = z
  .object({
   name: z.string().nonempty("Name is required"),
   email: z.string().nonempty("Email is required"),
   subject: z.string().nonempty("Subject is required"),
   messsage: z.string().nonempty("Message is required"),
  })


//   export const emailSchema = z.object({
//   email: z.string().nonempty("Email is required"),
// });