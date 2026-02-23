import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ATM } from "../components/atm/ATM";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";

export default function Final() {
  const user = useAuthenticatedUser();
  const [isRegistered, setIsRegistered] = useState(false);

  const { mutate: registerProgress, isPending } = useRegisterProgress({
    onSuccess: () => {
      setIsRegistered(true);
    },
  });

  // Register module progress when component mounts
  useEffect(() => {
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "cajero-automatico",
        progress: 100,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const config = {
    title: "Gracias por usar nuestro cajero automático",
    left: [],
    right: [],
    screen: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          padding: "20px",
        }}
      >
        {isPending && <Loader message="Guardando progreso..." />}

        {isRegistered && (
          <>
            <div
              style={{
                fontSize: "80px",
                marginBottom: "10px",
              }}
            >
              ✅
            </div>

            <div
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "15px",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                Transacción completada exitosamente
              </p>
              <p
                style={{
                  fontSize: "18px",
                  opacity: 0.9,
                  marginBottom: "10px",
                }}
              >
                No olvides retirar tu tarjeta
              </p>
              <p
                style={{
                  fontSize: "16px",
                  opacity: 0.8,
                }}
              >
                ¡Que tengas un excelente día!
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <Link to="/modulos/cajero-automatico" className="btn btn-blue">
                Reiniciar
              </Link>

              <Link to="/home" className="btn btn-orange">
                Volver al inicio
              </Link>
            </div>
          </>
        )}
      </div>
    ),
  };

  return <ATM config={config} />;
}
