import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_OPERATIONS, ATM_ROUTES } from "../constants/atm";
import { useATM } from "../context/ATMContext";
import { useNavigate } from "react-router";

export default function ATMStart() {
  const navigate = useNavigate();
  const { setOperationType } = useATM();

  const config = {
    title: "Selecciona tu transacción",

    left: [
      {
        number: 3,
        label: "Consulta saldo",
        onClick: () => {
          setOperationType(ATM_OPERATIONS.CHECK_BALANCE);
          navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.INSERT_CARD}`);
        },
      },
      {
        number: 4,
        label: "Retirar dinero",
        onClick: () => {
          setOperationType(ATM_OPERATIONS.WITHDRAW_MONEY);
          navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.INSERT_CARD}`);
        },
      },
    ],
    right: [],
  };

  return <ATM config={config} />;
}
