import { DOCUMENT_TYPES_VALUES, GENDER_TYPES_VALUES } from "@/shared/constants";
import { validationMessages } from "@/shared/constants/validationMessages";
import { z } from "zod";

export const userSchema = z.object({
  firstname: z
    .string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50)),

  lastname: z
    .string()
    .min(1, validationMessages.required)
    .min(2, validationMessages.minLength(2))
    .max(50, validationMessages.maxLength(50)),

  documentType: z.enum(DOCUMENT_TYPES_VALUES, validationMessages.selectOption),

  documentNumber: z
    .string()
    .min(1, validationMessages.required)
    .min(5, validationMessages.minLength(5))
    .max(20, validationMessages.maxLength(20))
    .regex(/^[0-9]+$/, validationMessages.numbersOnly),
  gender: z.enum(GENDER_TYPES_VALUES, validationMessages.selectOption),
  birthdate: z.date(validationMessages.invalidDate),
  department: z.string().min(1, validationMessages.selectOption),
  municipality: z.string().min(1, validationMessages.selectOption),
  phone: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[0-9]+$/.test(value),
      validationMessages.numbersOnly,
    ),
  email: z
    .string()
    .optional()
    .refine(
      (value) => !value || z.string().email().safeParse(value).success,
      validationMessages.invalidEmail,
    ),
});

export const registerSchema = userSchema.extend({
  acceptDataTreatment: z.literal(true, {
    message: "Debes aceptar el uso y tratamiento de datos personales",
  }),
  acceptPrivacyPolicy: z.literal(true, {
    message: "Debes aceptar la política de datos personales",
  }),
});
