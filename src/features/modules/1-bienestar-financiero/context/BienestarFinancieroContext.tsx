import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";

interface BienestarFinancieroContextType {
  score: number | null;
  setScore: (score: number) => void;
  resetScore: () => void;
}

const BienestarFinancieroContext = createContext<
  BienestarFinancieroContextType | undefined
>(undefined);

export function BienestarFinancieroProvider() {
  const [score, setScoreState] = useState<number | null>(null);

  const setScore = (newScore: number) => {
    setScoreState(newScore);
  };

  const resetScore = () => {
    setScoreState(null);
  };

  return (
    <BienestarFinancieroContext.Provider
      value={{ score, setScore, resetScore }}
    >
      <Outlet />
    </BienestarFinancieroContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBienestarFinanciero() {
  const context = useContext(BienestarFinancieroContext);
  if (context === undefined) {
    throw new Error(
      "useBienestarFinanciero must be used within a BienestarFinancieroProvider",
    );
  }
  return context;
}
