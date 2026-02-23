import { useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { TRABAJO_EN_COMUNIDAD_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";

export default function Feedback() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const { mutate: registerProgress, isPending } = useRegisterProgress();

  // Register module progress when component mounts
  useEffect(() => {
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "trabajo-en-comunidad",
        progress: 100,
      },
    });
  }, [registerProgress, user.id]);

  return (
    <ModulePageLayout title="Trabajo en Comunidad">
      {isPending && <Loader message="Guardando progreso..." />}
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">🎉</span>
                </div>
                <h1 className="text-3xl font-bold text-(--blue) text-center">
                  ¡Felicitaciones!
                </h1>
              </div>

              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <p className="text-lg leading-relaxed text-(--blue) max-w-2xl mx-auto">
                    ¡Excelente trabajo! Ha demostrado que con coordinación y
                    trabajo en equipo se pueden alcanzar las metas trazadas.
                  </p>
                  <p className="text-lg leading-relaxed text-(--blue) max-w-2xl mx-auto">
                    Recuerde que el bienestar social en la comunidad se logra
                    cuando todos trabajamos juntos de manera organizada.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={() => navigate(TRABAJO_EN_COMUNIDAD_PATHS.REWARD)}
                  className="btn btn-orange text-xl px-8 py-3"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
