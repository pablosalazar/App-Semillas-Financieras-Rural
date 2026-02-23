import { useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { TENTACIONES_PATHS } from "./constants/paths";
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
        moduleId: "tentaciones",
        progress: 100,
      },
    });
  }, [registerProgress, user.id]);

  return (
    <ModulePageLayout title="Tentaciones">
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
                <div className="text-center space-y-4 text-(--blue)">
                  <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                    ¡Logro alcanzado! Has aprendido a diferenciar entre las
                    tentaciones y las necesidades.
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={() => navigate(TENTACIONES_PATHS.REWARD)}
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
