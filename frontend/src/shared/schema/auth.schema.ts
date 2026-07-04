import { z } from "zod";
// regex
export const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// login
export const loginSchema = z.object({
  email: z.email("Email is not valid."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});
// register
export const registerSchema = z.object({
  fullname: z
    .string()
    .min(3, "fullname must be over 3 characters.")
    .max(20, "fullname must be at least 20 characters long."),
  username: z.string(),
  email: z.email("Email is not valid."),
  password: z.string().min(8, "fullname must be at least 20 characters long."),
  policy: z.literal(true, "please check policy"),
});

export const forgetPasswordSchema = z.object({
  email: z.email("Email is not valid."),
});
export const resetPasswordSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
  });
// create a type interface from the schema itself (DRY)
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
