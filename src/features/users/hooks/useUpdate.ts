import { updateUser } from "@/features/users/services/user.service";
import type { User } from "@/features/users/types";
import { useMutation } from "@tanstack/react-query";

interface UseUpdateOptions {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export const useUpdate = (options?: UseUpdateOptions) => {
  return useMutation({
    mutationFn: (userData: User) => updateUser(userData),
    onSuccess: (user) => {
      options?.onSuccess?.(user);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
