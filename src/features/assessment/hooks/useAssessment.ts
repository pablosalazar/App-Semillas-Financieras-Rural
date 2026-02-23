import { useQuery } from "@tanstack/react-query";
import { getUserAssessments } from "../services";

/**
 * Hook to fetch user's assessment data
 */
export const useAssessment = (userId: string) => {
  return useQuery({
    queryKey: ["assessments", userId],
    queryFn: () => getUserAssessments(userId),
    enabled: !!userId,
  });
};
