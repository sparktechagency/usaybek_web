import { z } from "zod";



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

// contactSchema
export const contactSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required"),
    subject: z.string().nonempty("Subject is required"),
    message: z.string().nonempty("Message is required"),
  })

// loginSchema
export const ForgotSchema = z
  .object({
    email: z.string().nonempty("Email is required"),
  })
// loginSchema
export const loginSchema = ForgotSchema.extend({
  password: z.string().nonempty("Password is required"),
})
// signUp
export const SignUpSchema = loginSchema.extend({
  channel_name: z.string().nonempty("Channel is required"),
  full_name: z.string().nonempty("Full Name is required"),
  confirm_password: z.string().nonempty("Confirm password is required"),
}).refine((value) => value.password === value.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords must be match.",
});


// onSide account
export const onSideSchema=SignUpSchema.extend({
  secret: z.string().nonempty("Representative secret is required"),
})

// /passwordSchema
export const passwordChangeSchema = z
  .object({
    current_password: z.string().nonempty("Current Password is required"),
    new_password: z.string().nonempty("New Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
.refine((value) => value.new_password === value.confirm_password, {
  path: ["confirm_password"],
  message: "Passwords must be match.",
});