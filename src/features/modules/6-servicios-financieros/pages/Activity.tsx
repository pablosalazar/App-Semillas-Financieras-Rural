import { useState } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";
import successSound from "@/assets/sounds/success.ogg";
import failSound from "@/assets/sounds/fail.mp3";

const SCENARIOS = [
  {
    id: "maria",
    context:
      "En la mañana, María se encuentra trabajando en la finca y nota que la bomba de agua ya no funciona tan bien como antes. Por eso decide empezar a ahorrar para comprar una nueva dentro de 1 año. Necesita una forma de guardar su dinero mes a mes, sin gastarlo y con una meta clara.",
    question: "¿Qué producto financiero debería usar?",
    options: [
      {
        id: "cuenta-ahorro-programado",
        text: "Cuenta de ahorro programado",
        isCorrect: true,
      },
      { id: "credito-negocio", text: "Crédito para negocio", isCorrect: false },
      { id: "bolsillo-digital", text: "Bolsillo digital", isCorrect: false },
    ],
    feedbackCorrect:
      "La cuenta de ahorro programado le permite ahorrar cada mes según una meta y mantener el dinero separado para no gastarlo.",
    feedbackWrong:
      "Esta opción no es la más adecuada para el objetivo de María. Inténtelo de nuevo.",
  },
  {
    id: "don-jacinto",
    context:
      "Más tarde, al pasar por el camino hacia el cultivo de cacao, se encuentra con Don Jacinto. Él le cuenta que este mes necesita comprar fertilizantes, semillas y herramientas para mejorar su cultivo. No tiene el dinero completo para hacerlo, pero sabe que podrá pagarlo cuando llegue la próxima cosecha.",
    question: "¿Qué producto financiero debería usar?",
    options: [
      {
        id: "credito-agropecuario",
        text: "Crédito agropecuario",
        isCorrect: true,
      },
      { id: "cdt", text: "CDT (Certificado de Depósito a Término)", isCorrect: false },
      { id: "tarjeta-credito", text: "Tarjeta de crédito", isCorrect: false },
    ],
    feedbackCorrect:
      "El crédito agropecuario está diseñado para apoyar actividades del campo y se adapta a los tiempos y necesidades del productor.",
    feedbackWrong:
      "Esta opción no es la más adecuada para este objetivo. Inténtelo de nuevo.",
  },
  {
    id: "martha",
    context:
      "Al final de la tarde, cuando pasa por el parque principal, se encuentra con Martha, quien acaba de participar en una feria del pueblo vendiendo sus artesanías. Recibió un dinero extra y quiere ponerlo a trabajar para que le genere ganancias de forma segura, ya que no lo necesita hasta el próximo año.",
    question: "¿Qué producto financiero debería usar?",
    options: [
      { id: "cuenta-ahorros", text: "Cuenta de ahorros", isCorrect: false },
      { id: "credito-educativo", text: "Crédito educativo", isCorrect: false },
      {
        id: "cdt",
        text: "CDT (Certificado de Depósito a Término)",
        isCorrect: true,
      },
    ],
    feedbackCorrect:
      "El CDT es una inversión segura donde usted sabe desde el inicio cuánto va a ganar al finalizar el plazo.",
    feedbackWrong:
      "Esta opción no es la más adecuada para este objetivo. Inténtelo de nuevo.",
  },
];

export default function Activity() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(null);

  const scenario = SCENARIOS[currentIndex];

  const handleSelect = (option: (typeof scenario.options)[number]) => {
    if (showFeedback) return;

    if (option.isCorrect) {
      setShowFeedback("correct");
      new Audio(successSound).play().catch(() => {});

      setTimeout(() => {
        setShowFeedback(null);
        if (currentIndex < SCENARIOS.length - 1) {
          setCurrentIndex((i) => i + 1);
        } else {
          navigate(SERVICIOS_FINANCIEROS_PATHS.FEEDBACK);
        }
      }, 2000);
    } else {
      setShowFeedback("wrong");
      new Audio(failSound).play().catch(() => {});
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  return (
    <ModulePageLayout title="Productos y servicios financieros">
      <div className="space-y-8 mt-10 pb-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="module-card">
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Escenario {currentIndex + 1} de {SCENARIOS.length}
              </p>

              <p className="text-lg text-gray-800 leading-relaxed">
                Hoy, en la vereda El Roblal, varias personas están tomando
                decisiones importantes sobre su dinero. Acompáñelas a lo largo
                del día y ayúdeles a escoger el producto financiero que mejor se
                ajuste a cada una de sus necesidades.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  {scenario.context}
                </p>
                <p className="text-xl font-semibold text-(--blue)">
                  {scenario.question}
                </p>
              </div>

              {showFeedback === "correct" && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-green-800 font-medium">
                    {scenario.feedbackCorrect}
                  </p>
                </div>
              )}

              {showFeedback === "wrong" && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-800 font-medium">
                    {scenario.feedbackWrong}
                  </p>
                </div>
              )}

              {!showFeedback && (
                <div className="space-y-3">
                  {scenario.options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className="w-full p-4 rounded-xl border-2 border-(--blue) bg-white hover:bg-blue-50 hover:border-blue-400 transition-all text-left text-lg font-medium text-gray-800"
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
