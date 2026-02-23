import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";

interface SaludEconomicaContextType {
  score: number | null;
  setScore: (score: number) => void;
  resetScore: () => void;
}

const SaludEconomicaContext = createContext<
  SaludEconomicaContextType | undefined
>(undefined);

export function SaludEconomicaProvider() {
  const [score, setScoreState] = useState<number | null>(null);

  const setScore = (newScore: number) => {
    setScoreState(newScore);
  };

  const resetScore = () => {
    setScoreState(null);
  };

  return (
    <SaludEconomicaContext.Provider value={{ score, setScore, resetScore }}>
      <Outlet />
    </SaludEconomicaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSaludEconomica() {
  const context = useContext(SaludEconomicaContext);
  if (context === undefined) {
    throw new Error(
      "useSaludEconomica must be used within a SaludEconomicaProvider"
    );
  }
  return context;
}
