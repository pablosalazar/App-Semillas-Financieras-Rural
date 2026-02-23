import { useState } from "react";
import { SurveyQuestionGrid } from "../components/SurveyQuestionGrid";
import { QUESTIONS } from "../constants/questions";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { useSaludEconomica } from "../context/SaludEconomicaContext";
import { SALUD_ECONOMICA_PATHS } from "../constants/paths";

export default function Questions() {
  const navigate = useNavigate();
  const { setScore } = useSaludEconomica();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreSum, setScoreSum] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

  const handleContinue = (selectedValue: number) => {
    const newSum = scoreSum + selectedValue;
    setScoreSum(newSum);

    if (isLastQuestion) {
      const score = newSum / QUESTIONS.length;

      setScore(score);
      navigate(SALUD_ECONOMICA_PATHS.FEEDBACK);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <ModulePageLayout title="Salud Económica">
      <div className="space-y-6">
        {/* Progress Bar */}
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={QUESTIONS.length}
          showText={true}
          label="Pregunta"
          className="max-w-3xl mx-auto mb-6"
        />

        <div className="max-w-3xl mx-auto w-full flex-1">
          <div
            className={`module-card ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <SurveyQuestionGrid
              question={currentQuestion.question}
              options={currentQuestion.options}
              onContinue={handleContinue}
              isLastQuestion={isLastQuestion}
            />
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
