import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(/^[a-zA-Z0-9\s]*$/, "Name cannot contain special characters"),
    username: z
      .string()
      .min(1, "Username is required")
      .regex(/^[a-zA-Z0-9\s]*$/, "Username cannot contain special characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/^[a-zA-Z0-9\s]*$/, "Password cannot contain special characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .regex(
        /^[a-zA-Z0-9\s]*$/,
        "Confirm Password cannot contain special characters"
      ),
    gender: z.enum(["male", "female"], "Gender is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(/^[a-zA-Z0-9\s]*$/, "Username cannot contain special characters"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/^[a-zA-Z0-9\s]*$/, "Password cannot contain special characters"),
});
