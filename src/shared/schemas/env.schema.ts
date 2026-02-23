import { z } from "zod";

export const envSchema = z.object({
  firebase: z.object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
  }),
});

export type Env = z.infer<typeof envSchema>;
