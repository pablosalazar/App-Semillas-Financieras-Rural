import { Link } from "react-router";
import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function CheckBalance() {
  const config = {
    title: "El saldo de tu tarjeta es de:",

    left: [],
    right: [],
    screen: (
      <>
        <div className="text-white font-bold text-4xl text-shadow-lg mb-10">
          $1.000.000
        </div>
        <Link
          to={`${ATM_BASE_PATH}/${ATM_ROUTES.FINAL}`}
          className="btn btn-orange"
        >
          Finalizar
        </Link>
      </>
    ),
  };

  return <ATM config={config} />;
}
