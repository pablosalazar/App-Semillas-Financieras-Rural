import { validationMessages } from "@/shared/constants/validationMessages";
import { z } from "zod";

export const loginSchema = z.object({
  documentNumber: z
    .string()
    .min(1, validationMessages.required)
    .min(5, validationMessages.minLength(5))
    .max(20, validationMessages.maxLength(20))
    .regex(/^[0-9]+$/, validationMessages.numbersOnly),
});

export type LoginInput = z.infer<typeof loginSchema>;
