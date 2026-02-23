import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function CheckCost() {
  const config = {
    title: "Esta operación puede tener un costo, ¿desea continuar?",

    left: [],
    right: [
      {
        number: 3,
        label: "Continuar operación",
        href: `${ATM_BASE_PATH}/${ATM_ROUTES.ENTER_PIN}`,
      },
      {
        number: 4,
        label: "Consultar costo",
      },
    ],
  };

  return <ATM config={config} />;
}
