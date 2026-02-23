export interface AssessmentResult {
  answers: Record<string, string>; // { questionId: selectedAnswerId }
  score: number; // Total score achieved
  correctAnswers: number; // Number of correct answers
  totalQuestions: number; // Total number of questions
  completedAt: Date;
}

export interface UserAssessments {
  userId: string;
  preAssessment?: AssessmentResult;
  postAssessment?: AssessmentResult;
  createdAt: Date;
  updatedAt: Date;
}

export type AssessmentType = "pre" | "post";
