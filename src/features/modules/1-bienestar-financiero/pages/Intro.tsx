import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <ModulePageLayout title="Bienestar Financiero">
      <div className="flex justify-center items-center min-h-[60vh] px-4 py-8">
        <div className="module-card max-w-2xl w-full text-center space-y-6">
          <h2 className="text-3xl font-bold text-(--blue)">
            Bienestar Financiero
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            En este módulo evaluaremos tu nivel de bienestar financiero mediante
            una breve actividad.
          </p>
          <button
            onClick={() => navigate(BIENESTAR_FINANCIERO_PATHS.INSTRUCTIONS)}
            className="btn btn-orange text-xl px-8 py-3"
          >
            Comenzar
          </button>
        </div>
      </div>
    </ModulePageLayout>
  );
}
