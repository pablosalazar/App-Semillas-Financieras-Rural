import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { TRABAJO_EN_COMUNIDAD_PATHS } from "../constants/paths";
import { Link } from "react-router";
import instructionsImg from "../assets/images/instructions.png";

export default function Instructions() {
  return (
    <ModulePageLayout title="Trabajo en Comunidad">
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              <div className="px-20">
                <img src={instructionsImg} alt="Instrucciones" />
              </div>
              <div className="flex justify-center pt-6">
                <Link
                  to={TRABAJO_EN_COMUNIDAD_PATHS.ACTIVITY}
                  className="btn btn-orange text-xl px-8 py-3"
                >
                  Continuar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
