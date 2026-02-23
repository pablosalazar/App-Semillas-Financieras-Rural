import { useNavigate } from "react-router";
import { ATM } from "../components/atm/ATM";
import { KeyPad } from "../components/key-pad/KeyPad";
import { ATM_BASE_PATH, ATM_OPERATIONS, ATM_ROUTES } from "../constants/atm";
import { useATM } from "../context/ATMContext";

export default function EnterYourKey() {
  const navigate = useNavigate();
  const { operationType } = useATM();

  const handlePinComplete = (pin: string) => {
    console.log("PIN entered:", pin);

    // Check if PIN is correct
    if (pin === "1234") {
      if (operationType === ATM_OPERATIONS.CHECK_BALANCE) {
        navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.SCREEN_OR_RECEIPT}`);
      } else if (operationType === ATM_OPERATIONS.WITHDRAW_MONEY) {
        navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.WITHDRAW_MONEY}`);
      }
    } else {
      // Navigate to wrong password page
      navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.WRONG_PASSWORD}`);
    }
  };

  const config = {
    title: "Por favor ingresa tu clave",
    left: [],
    right: [],
    screen: <KeyPad onComplete={handlePinComplete} maxLength={4} />,
  };

  return <ATM config={config} />;
}
