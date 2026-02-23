import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_OPERATIONS, ATM_ROUTES } from "../constants/atm";
import { useATM } from "../context/ATMContext";

export default function ChooseTransaction() {
  const { operationType } = useATM();

  const config = {
    title: "Selecciona la transacción",
    left: [
      {
        number: 1,
        label: "Retiro cuenta corriente",
        href: null,
      },
      {
        number: 2,
        label: "Retiro cuenta de ahorro",
        href:
          operationType === ATM_OPERATIONS.WITHDRAW_MONEY
            ? `${ATM_BASE_PATH}/${ATM_ROUTES.SELECT_AMOUNT}`
            : null,
      },
      {
        number: 3,
        label: "Transferencia entre cuentas",
        href: null,
      },
      {
        number: 4,
        label: "Cambio de clave",
        href: null,
      },
    ],
    right: [
      {
        number: 1,
        label: "Saldo cuenta corriente",
        href: null,
      },
      {
        number: 2,
        label: "Saldo cuenta de ahorro",
        href:
          operationType === ATM_OPERATIONS.CHECK_BALANCE
            ? `${ATM_BASE_PATH}/${ATM_ROUTES.ENTER_PIN}`
            : null,
      },
      {
        number: 3,
        label: "Retiro ahorro a la mano",
        href: null,
      },
      {
        number: 4,
        label: "Otras transacciones",
        href: null,
      },
    ],
  };

  return <ATM config={config} />;
}
