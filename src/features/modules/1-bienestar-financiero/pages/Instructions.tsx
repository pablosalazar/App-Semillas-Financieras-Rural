import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <ModulePageLayout title="Bienestar Financiero">
      <div className="flex justify-center items-center min-h-[60vh] px-4 py-8">
        <div className="module-card max-w-2xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-(--blue) text-center">
            Actividad — Instrucciones
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lea cada pregunta y marque la opción que mejor describa su
            situación. Responda con sinceridad; no hay respuestas correctas o
            incorrectas.
          </p>
          <ul className="space-y-2 text-gray-600 text-base list-disc list-inside">
            <li>Son 5 preguntas en total.</li>
            <li>Cada respuesta tiene un puntaje asignado.</li>
            <li>Al final verás tu nivel de bienestar financiero.</li>
          </ul>
          <div className="flex justify-center pt-2">
            <button
              onClick={() => navigate(BIENESTAR_FINANCIERO_PATHS.QUESTIONS)}
              className="btn btn-orange text-xl px-8 py-3"
            >
              Empezar
            </button>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
