import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ATM } from "../components/atm/ATM";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";
import errorImg from "../assets/images/error.png";

export default function WrongPassword() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`${ATM_BASE_PATH}/${ATM_ROUTES.ENTER_PIN}`);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  const config = {
    title: "Clave incorrecta",
    left: [],
    right: [],
    screen: (
      <div style={{ textAlign: "center", color: "white", padding: "20px" }}>
        <img
          src={errorImg}
          alt="Error"
          style={{ width: "120px", height: "auto", marginBottom: "20px" }}
          className="mx-auto"
        />
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          La clave ingresada es incorrecta
        </p>
        <p style={{ fontSize: "16px", opacity: 0.8 }}>
          Por favor, intenta nuevamente
        </p>
      </div>
    ),
  };

  return <ATM config={config} />;
}
