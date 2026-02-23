import { useState } from "react";
import { Check, X } from "lucide-react";

interface Answer {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  question: string;
  answers: Answer[];
  correctAnswer: string;
  onAnswerSubmit?: (isCorrect: boolean, selectedAnswer: string) => void;
  onContinue?: () => void;
  isLastQuestion?: boolean;
}

export function AssessmentQuestion({
  question,
  answers,
  correctAnswer,
  onAnswerSubmit,
  onContinue,
  isLastQuestion = false,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true);
      const isCorrect = selectedAnswer === correctAnswer;
      onAnswerSubmit?.(isCorrect, selectedAnswer);
    }
  };

  const getAnswerClassName = (answerId: string) => {
    const baseClasses =
      "flex items-center gap-4 p-4 rounded-xl border-3 cursor-pointer transition-all";

    if (!isSubmitted) {
      // Before submission
      if (selectedAnswer === answerId) {
        return `${baseClasses} border-blue-500 bg-blue-50`;
      }
      return `${baseClasses} border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50`;
    }

    // After submission
    if (answerId === correctAnswer) {
      return `${baseClasses} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === answerId && answerId !== correctAnswer) {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
    return `${baseClasses} border-gray-300 bg-gray-100 opacity-60`;
  };

  const getAnswerIcon = (answerId: string) => {
    if (!isSubmitted) {
      // Radio button before submission
      return (
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            selectedAnswer === answerId
              ? "border-blue-500 bg-blue-500"
              : "border-gray-400"
          }`}
        >
          {selectedAnswer === answerId && (
            <div className="w-3 h-3 rounded-full bg-white" />
          )}
        </div>
      );
    }

    // Icons after submission
    if (answerId === correctAnswer) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      );
    }
    if (selectedAnswer === answerId && answerId !== correctAnswer) {
      return (
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <X className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      );
    }
    return <div className="w-6 h-6 rounded-full border-2 border-gray-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <h2 className="text-2xl font-bold text-(--blue) leading-relaxed">
        {question}
      </h2>

      {/* Answer Options */}
      <div className="space-y-3">
        {answers.map((answer) => (
          <label
            key={answer.id}
            className={getAnswerClassName(answer.id)}
            onClick={() => handleAnswerSelect(answer.id)}
          >
            {getAnswerIcon(answer.id)}
            <span className="flex-1 text-lg font-medium text-gray-800">
              {answer.text}
            </span>
          </label>
        ))}
      </div>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="btn btn-orange text-xl px-8 py-3"
          >
            Verificar Respuesta
          </button>
        </div>
      )}

      {/* Feedback Message */}
      {isSubmitted && (
        <div
          className={`p-4 rounded-xl text-center font-semibold text-lg ${
            selectedAnswer === correctAnswer
              ? "bg-green-100 text-green-800 border-2 border-green-500"
              : "bg-red-100 text-red-800 border-2 border-red-500"
          }`}
        >
          {selectedAnswer === correctAnswer ? (
            <div className="space-y-3">
              <p>¡Correcto! 🎉</p>
              {onContinue && (
                <button onClick={onContinue} className="btn btn-orange mx-auto">
                  {isLastQuestion ? "Ver Resultados" : "Continuar"}
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p>La respuesta correcta está marcada arriba.</p>
              {onContinue && (
                <button onClick={onContinue} className="btn btn-orange mx-auto">
                  {isLastQuestion ? "Ver Resultados" : "Continuar"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
