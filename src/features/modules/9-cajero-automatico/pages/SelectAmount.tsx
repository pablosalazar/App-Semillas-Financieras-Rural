import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function SelectAmount() {
  const config = {
    title: "¿Cuanto desea retirar?",

    left: [
      {
        number: 1,
        label: "$20.000",
      },
      {
        number: 2,
        label: "$100.000",
        href: `${ATM_BASE_PATH}/${ATM_ROUTES.CHECK_COST}`,
      },
      {
        number: 3,
        label: "$300.000",
      },
      {
        number: 4,
        label: "$600.000",
      },
    ],
    right: [
      {
        number: 1,
        label: "$50.000",
      },
      {
        number: 2,
        label: "$200.000",
      },
      {
        number: 3,
        label: "$300.000",
      },
      {
        number: 4,
        label: "Retirar un valor diferente",
      },
    ],
  };

  return <ATM config={config} />;
}
