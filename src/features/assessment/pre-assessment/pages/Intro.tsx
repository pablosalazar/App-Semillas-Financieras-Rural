import { useAuthenticatedUser } from "@/context/AuthContext";
import { displayName } from "@/shared/utils/user";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

export default function PreIntro() {
  const user = useAuthenticatedUser();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("preguntas");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8">
      <div className="bg-white/80 -mt-50 rounded-4xl text-(--blue) shadow-2xl p-8 sm:p-12 max-w-2xl w-full border-4 border-(--blue)">
        {/* Welcome Header */}
        <div className="text-center space-y-6 mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-(--blue) leading-tight">
            ¡Bienvenid@ {displayName(user)}!
          </h1>

          <div className="space-y-4">
            <p className="text-xl sm:text-2xl ">
              A la aplicación de{" "}
              <span className="font-bold">Semillas Financieras.</span>
            </p>

            <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
              <p className="text-lg sm:text-xl leading-relaxed ">
                Antes de comenzar, le invitamos a responder unas breves
                preguntas que nos ayudarán a identificar qué tanto sabe sobre el
                manejo del dinero.
              </p>
              <p className="text-lg sm:text-xl leading-relaxed mt-3">
                Recuerde que este no es un examen. Lo importante es que responda
                lo que usted considere correcto, sin ayuda de nadie.
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="btn btn-orange text-xl px-8 py-4 flex items-center gap-3 group"
          >
            Avanzar
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
