import type { z } from "zod";
import type { registerSchema, userSchema } from "../schemas/userSchema";

export type UserInput = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export type User = UserInput & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  acceptDataTreatmentAt?: Date;
  acceptPrivacyPolicyAt?: Date;
};
