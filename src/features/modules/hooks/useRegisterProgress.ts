import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerLearningProgress } from "../services/learning-progress.service";
import type { ModuleProgress } from "../types/modules.type";

interface UseRegisterProgressOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useRegisterProgress = (options?: UseRegisterProgressOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      moduleProgress,
    }: {
      userId: string;
      moduleProgress: Omit<
        ModuleProgress,
        "startedAt" | "lastVisitedAt" | "attempts"
      > & {
        startedAt?: Date;
        lastVisitedAt?: Date;
        attempts?: number;
      };
    }) => registerLearningProgress(userId, moduleProgress),
    onSuccess: (_, variables) => {
      // Invalidate the learning progress query to refetch the data
      queryClient.invalidateQueries({
        queryKey: ["learningProgress", variables.userId],
      });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });
};
