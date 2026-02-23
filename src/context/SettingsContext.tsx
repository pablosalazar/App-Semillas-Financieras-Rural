import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAssessmentQuestions,
  type AssessmentQuestion,
} from "../services/settings.service";

interface SettingsContextType {
  assessmentQuestions: AssessmentQuestion[];
  isLoading: boolean;
  error: Error | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const {
    data: assessmentQuestions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings", "assessmentQuestions"],
    queryFn: getAssessmentQuestions,
    staleTime: 1000 * 60 * 60, // 1 hour - questions don't change often
  });

  return (
    <SettingsContext.Provider
      value={{
        assessmentQuestions,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
