import { z } from "zod";

// --- Body ---
export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const RegisterUserSchema = z.object({
  fullName: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  age: z.number().int().min(18).max(120).optional(),
  role: z.enum(["admin", "user", "guest"]).default("user"),
  address: z
    .object({
      city: z.string(),
      postalCode: z
        .string()
        .regex(/^\d{10}$/, "postal code must at least 10 digits"),
    })
    .optional(),
});
// --- Headers ---
export const AuthHeaderSchema = z.object({
  authorization: z
    .string({ required_error: "هدر Authorization اجباری است" })
    .startsWith("Bearer ", "فرمت باید Bearer <token> باشد"),
});
