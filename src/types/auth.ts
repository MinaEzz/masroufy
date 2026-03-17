import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email({ message: "validation.invalidEmail" }),
  password: z
    .string()
    .min(6, { message: "validation.passwordTooShort" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "validation.nameTooShort" }),
    email: z.string().email({ message: "validation.invalidEmail" }),
    password: z
      .string()
      .min(6, { message: "validation.passwordTooShort" }),
    confirmPassword: z
      .string()
      .min(6, { message: "validation.passwordTooShort" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  });

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
