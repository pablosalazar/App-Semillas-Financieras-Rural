import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";
import type { ATM_OPERATIONS } from "../constants/atm";

export type ATMOperationType =
  (typeof ATM_OPERATIONS)[keyof typeof ATM_OPERATIONS];

interface ATMContextType {
  operationType?: ATMOperationType;
  setOperationType: (type: ATMOperationType) => void;
}

const ATMContext = createContext<ATMContextType | undefined>(undefined);

export function ATMProvider() {
  const [operationType, setOperationType] = useState<ATMOperationType>();

  return (
    <ATMContext.Provider value={{ operationType, setOperationType }}>
      <Outlet />
    </ATMContext.Provider>
  );
}

export function useATM() {
  const context = useContext(ATMContext);
  if (context === undefined) {
    throw new Error("useATM must be used within an ATMProvider");
  }
  return context;
}
