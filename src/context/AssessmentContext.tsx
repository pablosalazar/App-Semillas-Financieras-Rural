import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import type { UserAssessments } from "@/features/assessment/types";
import { getUserAssessments } from "@/features/assessment/services/assessment.service";

interface AssessmentContextType {
  assessments: UserAssessments | null | undefined;
  isLoading: boolean;
  hasPreAssessment: boolean;
  hasPostAssessment: boolean;
  refetch: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

interface AssessmentProviderProps {
  children: ReactNode;
}

export function AssessmentProvider({ children }: AssessmentProviderProps) {
  const { user } = useAuth();

  const {
    data: assessments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assessments", user?.id],
    queryFn: () => getUserAssessments(user?.id || ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const hasPreAssessment = useMemo(
    () => !!assessments?.preAssessment,
    [assessments]
  );

  const hasPostAssessment = useMemo(
    () => !!assessments?.postAssessment,
    [assessments]
  );

  const value: AssessmentContextType = {
    assessments,
    isLoading,
    hasPreAssessment,
    hasPostAssessment,
    refetch,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAssessmentContext() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error(
      "useAssessmentContext must be used within an AssessmentProvider"
    );
  }
  return context;
}
