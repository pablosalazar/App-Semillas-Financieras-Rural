import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { useLearningProgress } from "@/features/modules/hooks";
import type { LearningProgress } from "@/features/modules/types/modules.type";

interface LearningProgressContextType {
  learningProgress: LearningProgress | null | undefined;
  isLoading: boolean;
}

const LearningProgressContext = createContext<
  LearningProgressContextType | undefined
>(undefined);

interface LearningProgressProviderProps {
  children: ReactNode;
}

export function LearningProgressProvider({
  children,
}: LearningProgressProviderProps) {
  const { user } = useAuth();

  const { data: learningProgress, isLoading } = useLearningProgress(
    user?.id || "",
    {
      enabled: !!user?.id,
    }
  );

  const value: LearningProgressContextType = {
    learningProgress,
    isLoading,
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLearningProgressContext() {
  const context = useContext(LearningProgressContext);
  if (context === undefined) {
    throw new Error(
      "useLearningProgressContext must be used within a LearningProgressProvider"
    );
  }
  return context;
}
