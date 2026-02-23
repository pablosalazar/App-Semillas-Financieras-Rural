import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveAssessment } from "../services";
import type { AssessmentType } from "../types";

interface SaveAssessmentParams {
  userId: string;
  type: AssessmentType;
  answers: Record<string, string>;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

/**
 * Hook to save assessment answers
 */
export const useSaveAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      type,
      answers,
      score,
      correctAnswers,
      totalQuestions,
    }: SaveAssessmentParams) =>
      saveAssessment(
        userId,
        type,
        answers,
        score,
        correctAnswers,
        totalQuestions
      ),
    onSuccess: (_, variables) => {
      // Invalidate and refetch assessments query
      queryClient.invalidateQueries({
        queryKey: ["assessments", variables.userId],
      });
    },
  });
};
