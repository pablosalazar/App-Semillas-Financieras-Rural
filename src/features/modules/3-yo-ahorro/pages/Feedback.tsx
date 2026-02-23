import { useEffect, useRef, useState } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { YO_AHORRO_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";
import feedbackSound from "../assets/audio/feedback.mp3";

export default function Feedback() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const { mutate: registerProgress, isPending } = useRegisterProgress({
    onSuccess: () => {
      // Mark as registered
      setIsRegistered(true);

      // Only play audio if not already playing
      if (!audioRef.current || audioRef.current.paused) {
        const audio = new Audio(feedbackSound);
        audioRef.current = audio;
        audio.play().catch((error) => {
          console.error("Error playing feedback sound:", error);
        });
      }
    },
  });

  // Register module progress when component mounts
  useEffect(() => {
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "yo-ahorro",
        progress: 100,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup: pause and reset audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <ModulePageLayout title="Yo ahorro">
      {isPending && <Loader message="Guardando progreso..." />}

      {isRegistered && (
        <div className="space-y-6 mt-10">
          <div className="max-w-3xl mx-auto w-full flex-1">
            <div className="module-card">
              <div className="space-y-6">
                {/* Title with Emoji */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">🎉</span>
                  </div>
                  <h1 className="text-3xl font-bold text-(--blue) text-center">
                    ¡Felicitaciones!
                  </h1>
                </div>

                {/* Message */}
                <div className="space-y-4">
                  <div className="text-center space-y-4 text-(--blue)">
                    <p className="text-lg leading-relaxed max-w-2xl mx-auto">
                      Logro alcanzado, usted aprendió la importancia del ahorro.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <button
                    onClick={() => {
                      // Stop audio before navigating
                      if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                      navigate(YO_AHORRO_PATHS.REWARD);
                    }}
                    className="btn btn-orange text-xl px-8 py-3"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModulePageLayout>
  );
}
