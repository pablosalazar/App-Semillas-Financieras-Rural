import { useState, useEffect, useRef } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Modal } from "@/shared/components/ui/Modal";
import { useNavigate } from "react-router";
import { YO_ME_ASEGURO_PATHS } from "../constants/paths";
import orejuelaImage from "../assets/images/orejuela.png";
import activityAudio from "../assets/audio/activity.ogg";

export default function Activity() {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showWrongAnswerModal, setShowWrongAnswerModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const question = (
    <>
      Teniendo en cuenta la historia de las familias y el incendio,
      <br /> ¿Qué recomendación le daría a la familia Orejuela,
      <br /> quienes tuvieron que pedir ayuda para reparar su casa?
    </>
  );

  const answers = [
    {
      id: "a",
      text: (
        <>
          Incluir en su presupuesto un seguro <br />
          para protegerse de una emergencia.
        </>
      ),
      isCorrect: true,
    },
    {
      id: "b",
      text: "Esperar la ayuda de los vecinos y familiares",
      isCorrect: false,
    },
  ];

  const handleAnswerSelect = (answerId: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerId);
      const answer = answers.find((a) => a.id === answerId);

      if (answer?.isCorrect) {
        // Correct answer - navigate to feedback
        navigate(YO_ME_ASEGURO_PATHS.FEEDBACK);
      } else {
        // Wrong answer - show modal and play audio
        setShowWrongAnswerModal(true);
      }
    }
  };

  const handleTryAgain = () => {
    setShowWrongAnswerModal(false);
    setSelectedAnswer(null);
    // Stop and reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Play activity audio when component mounts
  useEffect(() => {
    const audio = new Audio(activityAudio);
    audioRef.current = audio;
    audio.play().catch((error) => {
      console.error("Error playing activity audio:", error);
    });

    // Cleanup: pause and reset audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const getAnswerClassName = (answerId: string) => {
    const baseClasses =
      "flex items-center gap-4 p-4 rounded-xl border-3 cursor-pointer transition-all";

    if (!selectedAnswer) {
      // Before selection
      return `${baseClasses} border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50`;
    }

    // After selection
    const answer = answers.find((a) => a.id === answerId);
    if (answer?.isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === answerId && !answer?.isCorrect) {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
    return `${baseClasses} border-gray-300 bg-gray-100 opacity-60`;
  };

  const getAnswerIcon = (answerId: string) => {
    if (!selectedAnswer) {
      // Radio button before selection
      return (
        <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-600">
            {answerId.toUpperCase()}
          </span>
        </div>
      );
    }

    // Icons after selection
    const answer = answers.find((a) => a.id === answerId);
    if (answer?.isCorrect) {
      return (
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-sm font-bold text-white">✓</span>
        </div>
      );
    }
    if (selectedAnswer === answerId && !answer?.isCorrect) {
      return (
        <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-sm font-bold text-white">✗</span>
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-400">
          {answerId.toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <ModulePageLayout title="Yo me aseguro">
      <div className="space-y-6 mt-10">
        <div className="max-w-3xl mx-auto w-full flex-1">
          <div className="module-card relative min-h-[500px]">
            <div className="space-y-6">
              {/* Question Text */}
              <h2 className="text-2xl font-bold text-(--blue) leading-relaxed text-center">
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
            </div>

            {/* Orejuela Image - Positioned absolutely to the right, doesn't allocate space */}
            <div className="absolute right-4 bottom-4 hidden lg:block pointer-events-none">
              <img
                src={orejuelaImage}
                alt="Familia Orejuela"
                className="max-w-50 h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wrong Answer Modal */}
      <Modal isOpen={showWrongAnswerModal} onClose={handleTryAgain} size="lg">
        <div className="space-y-6 p-4">
          <h2 className="text-3xl font-bold text-(--blue) text-center">
            Piense un momento...
          </h2>

          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Recuerde que un seguro garantiza un respaldo ante cualquier
              emergencia.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <button onClick={handleTryAgain} className="btn btn-orange">
              Intentar de nuevo
            </button>
          </div>
        </div>
      </Modal>
    </ModulePageLayout>
  );
}
