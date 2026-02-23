import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function ScreenOrReceipt() {
  const config = {
    title: "Deseas imprimir el recibo o verlo en pantalla?",

    left: [
      {
        number: 4,
        label: "Imprimir recibo",
        href: `${ATM_BASE_PATH}/${ATM_ROUTES.PRINT_RECEIPT}`,
      },
    ],
    right: [
      {
        number: 4,
        label: "Ver en pantalla",
        href: `${ATM_BASE_PATH}/${ATM_ROUTES.CHECK_BALANCE}`,
      },
    ],
  };

  return <ATM config={config} />;
}
