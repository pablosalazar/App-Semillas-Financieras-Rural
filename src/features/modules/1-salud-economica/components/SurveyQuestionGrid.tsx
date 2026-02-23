import { useState, useEffect } from "react";

interface Option {
  id: string;
  text: string;
  value: number;
}

interface SurveyQuestionGridProps {
  question: string;
  options: Option[];
  onContinue?: (selectedValue: number) => void;
  isLastQuestion?: boolean;
}

export function SurveyQuestionGrid({
  question,
  options,
  onContinue,
  isLastQuestion = false,
}: SurveyQuestionGridProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [question]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (selectedOption) {
      const option = options.find((opt) => opt.id === selectedOption);
      if (option) {
        onContinue?.(option.value);
      }
    }
  };

  const getButtonClassName = (optionId: string) => {
    const baseClasses =
      "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-3 transition-all min-h-[120px] text-center";

    if (selectedOption === optionId) {
      return `${baseClasses} border-blue-500 bg-blue-50 shadow-lg scale-105 cursor-pointer`;
    }

    if (selectedOption !== null) {
      // Disabled state for non-selected options
      return `${baseClasses} border-gray-300 bg-gray-100 opacity-50 cursor-not-allowed`;
    }

    return `${baseClasses} border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50 hover:shadow-md hover:scale-102 cursor-pointer`;
  };

  const getOptionIcon = (optionId: string) => {
    return (
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
          selectedOption === optionId
            ? "border-blue-500 bg-blue-500"
            : "border-gray-400"
        }`}
      >
        {selectedOption === optionId && (
          <div className="w-3.5 h-3.5 rounded-full bg-white" />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <h2 className="text-2xl font-bold text-(--blue) leading-relaxed text-center">
        {question}
      </h2>

      {/* Options - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        {options.map((option) => (
          <button
            key={option.id}
            className={getButtonClassName(option.id)}
            onClick={() => handleOptionSelect(option.id)}
            disabled={selectedOption !== null && selectedOption !== option.id}
          >
            {getOptionIcon(option.id)}
            <span className="text-lg font-semibold text-gray-800">
              {option.text}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className="btn btn-orange text-xl px-8 py-3"
        >
          {isLastQuestion ? "Avanzar" : "Continuar"}
        </button>
      </div>
    </div>
  );
}
