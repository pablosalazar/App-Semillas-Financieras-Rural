import { createUser } from "@/features/users/services/user.service";
import type { RegisterInput, User } from "@/features/users/types";
import { useMutation } from "@tanstack/react-query";

interface UseRegisterOptions {
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

export const useRegister = (options?: UseRegisterOptions) => {
  return useMutation({
    mutationFn: (userData: RegisterInput) => createUser(userData),
    onSuccess: (user) => {
      options?.onSuccess?.(user);
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
