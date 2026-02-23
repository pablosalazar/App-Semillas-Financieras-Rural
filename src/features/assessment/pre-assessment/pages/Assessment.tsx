import { useState } from "react";
import { AssessmentQuestion } from "../../shared/components/AssessmentQuestion";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { ChevronRight } from "lucide-react";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useSaveAssessment } from "../../hooks";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useSettings, useAssessmentContext } from "@/context";

export default function PreQuestions() {
  const navigate = useNavigate();
  const user = useAuthenticatedUser();
  const { mutate: saveAssessment, isPending } = useSaveAssessment();
  const { assessmentQuestions, isLoading: isLoadingQuestions } = useSettings();
  const { refetch: refetchAssessments } = useAssessmentContext();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { selected: string; isCorrect: boolean }>
  >({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSubmit = (isCorrect: boolean, selectedAnswer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedAnswer, isCorrect },
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const calculateScore = () => {
    const correctAnswers = Object.values(answers).filter(
      (answer) => answer.isCorrect,
    ).length;
    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
    };
  };

  const score = calculateScore();

  const handleForward = async () => {
    // Transform answers to save only the selected answer ID
    const rawAnswers = Object.entries(answers).reduce(
      (acc, [questionId, answerData]) => {
        acc[questionId] = answerData.selected;
        return acc;
      },
      {} as Record<string, string>,
    );

    saveAssessment(
      {
        userId: user.id,
        type: "pre",
        answers: rawAnswers,
        score: score.percentage,
        correctAnswers: score.correct,
        totalQuestions: score.total,
      },
      {
        onSuccess: async () => {
          // Wait for assessment context to refresh before navigating
          await refetchAssessments();
          navigate("/home");
        },
        onError: (error) => {
          console.error("Error al guardar evaluación:", error);
          toast.error(
            "Hubo un error al guardar tu evaluación. Por favor, intenta de nuevo.",
          );
        },
      },
    );
  };

  if (isLoadingQuestions) {
    return <Loader message="Cargando preguntas..." />;
  }

  if (!assessmentQuestions || assessmentQuestions.length === 0) {
    return (
      <ModulePageLayout title="Evaluación Inicial">
        <div className="text-center text-red-500">
          No se pudieron cargar las preguntas. Por favor, intenta de nuevo.
        </div>
      </ModulePageLayout>
    );
  }

  return (
    <ModulePageLayout title="Evaluación Inicial">
      {isPending && <Loader message="Guardando progreso..." />}
      {!showResults && (
        <>
          {/* Progress Bar */}
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={totalQuestions}
            showText={true}
            label="Pregunta"
            className="max-w-3xl mx-auto mb-6"
          />

          {/* Question Card */}
          <div className="max-w-3xl mx-auto w-full flex-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border-3 border-(--blue)">
              <AssessmentQuestion
                key={currentQuestion.id}
                question={currentQuestion.question}
                answers={currentQuestion.answers}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswerSubmit={handleAnswerSubmit}
                onContinue={handleNext}
                isLastQuestion={isLastQuestion}
              />
            </div>
          </div>
        </>
      )}

      {/* Score Summary */}
      {showResults && (
        <div className="max-w-3xl mx-auto w-full flex-1 flex items-center justify-center -mt-50">
          <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-3xl shadow-xl p-12 text-white text-center">
            <h3 className="text-4xl font-bold mb-6">
              ¡Evaluación Completada! 🎉
            </h3>
            <div className="text-8xl font-bold mb-4">{score.percentage}%</div>
            <p className="text-2xl mb-3">
              {score.correct} de {score.total} respuestas correctas
            </p>
            {score.percentage >= 80 && (
              <p className="bg-green-50 text-green-700 italic font-semibold p-6 rounded-2xl mb-6 text-2xl border-2 border-green-700">
                Usted ya sabe las bases de la educación financiera, siga
                aprendiendo para enriquecer su conocimiento.
              </p>
            )}
            {score.percentage < 80 && (
              <p className="bg-white italic text-amber-500 font-medium p-6 rounded-2xl mb-6 text-2xl border-2 border-amber-500">
                Recuerda que solo queremos saber tus conocimientos previos,
                juega con nosotros para mejorar tu conocimiento.
              </p>
            )}
            <button className="btn btn-orange" onClick={handleForward}>
              Avanzar <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </ModulePageLayout>
  );
}
