import { useQuery } from "@tanstack/react-query";
import { getLearningProgress } from "../services/learning-progress.service";

interface UseLearningProgressOptions {
  enabled?: boolean;
}

export const useLearningProgress = (
  userId: string,
  options?: UseLearningProgressOptions
) => {
  return useQuery({
    queryKey: ["learningProgress", userId],
    queryFn: () => getLearningProgress(userId),
    enabled: options?.enabled ?? !!userId,
  });
};
