import { useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useBienestarFinanciero } from "../context/BienestarFinancieroContext";
import { FEEDBACK_MESSAGES } from "../constants/feedback-messages";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";

function getFeedbackMessage(score: number) {
  if (score <= 6) return { ...FEEDBACK_MESSAGES[0], emoji: "🎯" };
  if (score <= 14) return { ...FEEDBACK_MESSAGES[1], emoji: "💡" };
  return { ...FEEDBACK_MESSAGES[2], emoji: "🎉" };
}

export default function Feedback() {
  const { score } = useBienestarFinanciero();
  const user = useAuthenticatedUser();
  const navigate = useNavigate();
  const { mutate: registerProgress, isPending } = useRegisterProgress();

  // Register module progress when the page loads
  useEffect(() => {
    // Redirect to questions if no score
    if (score === null) {
      navigate(BIENESTAR_FINANCIERO_PATHS.QUESTIONS);
      return;
    }

    // Register progress with completion
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "bienestar-financiero",
        progress: 100,
      },
    });
  }, [score, navigate, registerProgress, user.id]);

  // Show nothing while redirecting
  if (score === null) {
    return null;
  }

  const feedback = getFeedbackMessage(score);

  return (
    <ModulePageLayout title="Bienestar Financiero">
      {isPending && <Loader message="Guardando progreso..." />}
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              {/* Score display */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-5xl">{feedback.emoji}</span>
                <div className="text-center">
                  <p className="text-lg text-gray-500 font-medium">
                    Su puntaje
                  </p>
                  <p className="text-6xl font-bold text-(--blue)">
                    {score}
                    <span className="text-2xl text-gray-400 font-normal">
                      /20
                    </span>
                  </p>
                </div>
                <h2 className="text-2xl font-bold text-(--blue) text-center mt-2">
                  {feedback.title}
                </h2>
              </div>

              <div className="space-y-4">
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
                  onClick={() => navigate(BIENESTAR_FINANCIERO_PATHS.REWARD)}
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
