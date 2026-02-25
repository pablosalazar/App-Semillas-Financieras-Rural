import { useState, useMemo, useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { DEUDAS_SANAS_PATHS } from "../constants/paths";
import failSound from "@/assets/sounds/fail.mp3";

const DEFINITIONS: { word: string; definition: string }[] = [
  {
    word: "Deuda",
    definition:
      "Dinero que se pide prestado y que debe devolverse en un tiempo acordado.",
  },
  {
    word: "Interés",
    definition:
      "Costo que se paga por usar el dinero prestado, calculado como un porcentaje del valor total del préstamo.",
  },
  {
    word: "Plazo",
    definition:
      "Tiempo que se acuerda para terminar de pagar la deuda, normalmente expresado en meses.",
  },
  {
    word: "Cuota",
    definition:
      "Valor que se paga periódicamente (por lo general cada mes) para ir cancelando el préstamo hasta completarlo.",
  },
  {
    word: "Capacidad de pago",
    definition:
      "Cantidad de dinero que una persona puede destinar al pago de deudas sin afectar sus gastos básicos ni su ahorro.",
  },
  {
    word: "Entidad formal",
    definition:
      "Institución reconocida y vigilada por el Estado, como un banco o una cooperativa, que presta dinero de manera legal y segura.",
  },
  {
    word: "Deuda sana",
    definition:
      "Préstamo tomado para mejorar la economía o alcanzar una meta, planeando su pago sin poner en riesgo el bienestar financiero.",
  },
  {
    word: "Endeudamiento excesivo",
    definition:
      "Situación en la que el dinero disponible no alcanza para cubrir todas las deudas sin dejar de atender los gastos esenciales.",
  },
  {
    word: "Mora",
    definition:
      "Retraso en el pago de una cuota o compromiso financiero, que puede generar cobros adicionales o afectar el historial crediticio.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Activity() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWrong, setShowWrong] = useState(false);

  const current = DEFINITIONS[currentIndex];
  const options = useMemo(() => {
    const correct = current.word;
    const others = DEFINITIONS.filter((d) => d.word !== correct).map((d) => d.word);
    const wrongOptions = shuffleArray(others).slice(0, 3);
    return shuffleArray([correct, ...wrongOptions]);
  }, [currentIndex]);

  const handleSelect = (word: string) => {
    if (word === current.word) {
      if (currentIndex < DEFINITIONS.length - 1) {
        setCurrentIndex((i) => i + 1);
        setShowWrong(false);
      } else {
        navigate(DEUDAS_SANAS_PATHS.FEEDBACK);
      }
    } else {
      setShowWrong(true);
      new Audio(failSound).play().catch(() => {});
    }
  };

  useEffect(() => {
    setShowWrong(false);
  }, [currentIndex]);

  return (
    <ModulePageLayout title="Deudas sanas">
      <div className="space-y-8 mt-10 pb-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="module-card min-h-[400px]">
            <div className="space-y-8">
              <p className="text-sm text-gray-600">
                Relacione la definición con la palabra correcta. Tema{" "}
                {currentIndex + 1} de {DEFINITIONS.length}
              </p>

              <div className="bg-gray-50 rounded-xl p-6 border-2 border-(--blue)">
                <p className="text-xl font-medium text-gray-800 text-center">
                  {current.definition}
                </p>
              </div>

              <p className="text-gray-600">
                Seleccione la palabra que corresponde:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => handleSelect(word)}
                    className="p-4 rounded-xl border-2 border-(--blue) bg-white hover:bg-blue-50 hover:border-blue-400 transition-all text-lg font-medium text-gray-800 text-center"
                  >
                    {word}
                  </button>
                ))}
              </div>

              {showWrong && (
                <p className="text-red-600 font-medium text-center">
                  No corresponde. Intente de nuevo.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
