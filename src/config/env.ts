import { envSchema } from "@/shared/schemas/env.schema";

// Detect environment: Vite (browser/build) uses import.meta.env, Node.js uses process.env
const getEnvVar = (key: string): string | undefined => {
  // Check if we're in Vite environment (browser/build)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key];
  }
  // Fall back to Node.js process.env (for scripts)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeProcess = (globalThis as any).process;
  if (nodeProcess && nodeProcess.env) {
    return nodeProcess.env[key];
  }
  return undefined;
};

const rawEnv = {
  firebase: {
    apiKey: getEnvVar("VITE_FIREBASE_API_KEY"),
    authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnvVar("VITE_FIREBASE_APP_ID"),
  },
};

export const env = envSchema.parse(rawEnv);
