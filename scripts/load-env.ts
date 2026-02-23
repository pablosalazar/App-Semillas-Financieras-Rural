import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Load .env file using Node.js native modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env");

try {
  const envFile = readFileSync(envPath, "utf-8");
  const envLines = envFile.split("\n");

  for (const line of envLines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith("#")) {
      const [key, ...valueParts] = trimmedLine.split("=");
      if (key && valueParts.length > 0) {
        const value = valueParts
          .join("=")
          .trim()
          .replace(/^["']|["']$/g, "");
        process.env[key.trim()] = value;
      }
    }
  }
} catch {
  // .env file might not exist, that's okay if env vars are set in the system
  console.warn(
    "Warning: Could not load .env file, using system environment variables"
  );
}
