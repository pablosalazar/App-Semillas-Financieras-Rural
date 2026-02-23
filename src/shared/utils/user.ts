import type { User } from "@/features/users/types";

export function displayName(
  user: Pick<User, "firstname" | "lastname">
): string {
  const firstName = user.firstname?.trim().split(/\s+/)[0] || "";

  const firstLastname = user.lastname?.trim().split(/\s+/)[0] || "";

  if (!firstName && !firstLastname) return "";
  if (!firstName) return firstLastname;
  if (!firstLastname) return firstName;

  return `${firstName} ${firstLastname}`;
}
