import { useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useSaludEconomica } from "../context/SaludEconomicaContext";
import { FEEDBACK_MESSAGES } from "../constants/feedback-messages";
import { SALUD_ECONOMICA_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";

function getFeedbackMessage(score: number) {
  if (score > 4.5) return { ...FEEDBACK_MESSAGES[0], emoji: "🎉" };
  if (score > 4) return { ...FEEDBACK_MESSAGES[1], emoji: "👍" };
  if (score > 3) return { ...FEEDBACK_MESSAGES[2], emoji: "💡" };
  return { ...FEEDBACK_MESSAGES[3], emoji: "🎯" };
}

export default function Feedback() {
  const { score } = useSaludEconomica();
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const { mutate: registerProgress, isPending } = useRegisterProgress();

  // Register module progress when the page loads
  useEffect(() => {
    // Redirect to questions if no score
    if (score === null || score === 0) {
      navigate(SALUD_ECONOMICA_PATHS.QUESTIONS);
      return;
    }

    // Register progress with completion
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "salud-economica",
        progress: 100,
      },
    });
  }, [score, navigate, registerProgress, user.id]);

  // Show nothing while redirecting
  if (score === null || score === 0) {
    return null;
  }

  const feedback = getFeedbackMessage(score);

  return (
    <ModulePageLayout title="Salud Económica">
      {isPending && <Loader message="Guardando progreso..." />}
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              {/* Title with Icon and Emoji */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{feedback.emoji}</span>
                </div>
                <h2 className="text-3xl font-bold text-(--blue) text-center">
                  {feedback.title}
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span>📋</span>
                  <span>Observaciones:</span>
                </h3>
                <ul className="space-y-3">
                  {feedback.observations.map((observation, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="text-(--blue) font-bold mt-1 text-xl">
                        ✓
                      </span>
                      <span className="text-lg leading-relaxed">
                        {observation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={() => navigate(SALUD_ECONOMICA_PATHS.REWARD)}
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
