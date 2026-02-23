import { useEffect, useRef, useState } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { useAssessmentContext, useLearningProgressContext } from "@/context";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";
import certificateImg from "../assets/images/certificate.png";
import diplomaAudio from "../assets/audio/diploma.mp3";

export default function Reward() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { hasPostAssessment, isLoading } = useAssessmentContext();
  const { learningProgress, isLoading: isLoadingProgress } =
    useLearningProgressContext();
  const [isRegistered, setIsRegistered] = useState(false);

  const { mutate: registerProgress, isPending } = useRegisterProgress({
    onSuccess: () => {
      setIsRegistered(true);
    },
  });

  // Check if module progress already exists
  const hasModuleProgress =
    learningProgress?.modules?.some(
      (module) => module.moduleId === "mi-aprendizaje",
    ) || false;

  // Check if user has completed post-assessment
  // If not completed, redirect to post-assessment
  useEffect(() => {
    if (!isLoading && !hasPostAssessment) {
      // Redirect to post-assessment if not completed
      navigate("/evaluaciones/final");
    }
  }, [hasPostAssessment, isLoading, navigate]);

  // Register module progress when post-assessment is completed (only on first visit)
  useEffect(() => {
    if (hasPostAssessment && !hasModuleProgress && !isRegistered) {
      registerProgress({
        userId: user.id,
        moduleProgress: {
          moduleId: "mi-aprendizaje",
          progress: 100,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPostAssessment, hasModuleProgress]);

  // Play diploma audio when component mounts (only if post-assessment is completed and ready to show)
  useEffect(() => {
    const shouldShowContent =
      hasPostAssessment && (hasModuleProgress || isRegistered);

    if (shouldShowContent) {
      const audio = new Audio(diplomaAudio);
      audioRef.current = audio;
      audio.volume = 0.7;
      audio.play().catch((error) => {
        console.error("Error playing diploma audio:", error);
      });

      // Cleanup: pause and reset audio when component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [hasPostAssessment, hasModuleProgress, isRegistered]);

  // Show loader while checking assessment status, progress, or saving progress
  if (isLoading || isLoadingProgress || isPending) {
    return <Loader message="Cargando..." />;
  }

  // Don't render anything if redirecting to post-assessment
  if (!hasPostAssessment) {
    return null;
  }

  // Don't render certificate until progress is registered (only if it's the first visit)
  if (!hasModuleProgress && !isRegistered) {
    return null;
  }

  return (
    <ModulePageLayout title="Mi Aprendizaje">
      <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
        <div className="space-y-6 mt-10 pb-10">
          <div className="max-w-4xl mx-auto w-full flex-1">
            <div className="module-card">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">🎓</span>
                  </div>
                  <h1 className="text-3xl font-bold text-(--blue) text-center">
                    ¡Felicitaciones!
                  </h1>
                  <p className="text-lg text-(--blue) text-center max-w-2xl">
                    Ha completado exitosamente el programa de educación
                    financiera
                  </p>
                </div>

                {/* Certificate Display */}
                <div className="flex justify-center py-6">
                  <div className="relative max-w-3xl w-full">
                    <img
                      src={certificateImg}
                      alt="Certificado de Finalización"
                      className="w-full h-auto rounded-lg shadow-2xl"
                    />
                    {/* User full name — sits on the name line (~43% from top) */}
                    <div
                      className="absolute w-full text-center"
                      style={{ top: "47%", left: 0 }}
                    >
                      <span
                        className="font-bold text-[--blue]"
                        style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.4rem)" }}
                      >
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                    {/* Completion date — sits after "Fecha" (~67% from top) */}
                    <div
                      className="absolute"
                      style={{ top: "68%", left: "45%" }}
                    >
                      <span
                        className="text-[--blue]"
                        style={{ fontSize: "clamp(0.75rem, 1.6vw, 1rem)" }}
                      >
                        {new Date().toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => navigate("/home")}
                    className="btn btn-orange text-xl px-8 py-3"
                  >
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
