import { useState, useCallback } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { TENTACIONES_PATHS } from "./constants/paths";

import img01 from "../assets/images/01_mercado.png";
import img02 from "../assets/images/02_cuaderno.png";
import img03 from "../assets/images/03_gaseosa.png";
import img04 from "../assets/images/04_transporte.png";
import img05 from "../assets/images/05_abono.png";
import img06 from "../assets/images/06_empanada.png";
import img07 from "../assets/images/07_botas.png";
import img08 from "../assets/images/08_chance.png";
import img09 from "../assets/images/09_cerveza.png";
import img10 from "../assets/images/10_helados.png";
import img11 from "../assets/images/11_servicios.png";
import img12 from "../assets/images/12_ropa.png";
import img13 from "../assets/images/13_cigarrillos.png";
import img14 from "../assets/images/14_vivienda.png";
import img15 from "../assets/images/15_aseo.png";
import canasta1 from "../assets/images/canasta_1.png";
import canasta2 from "../assets/images/canasta_2.png";

const IMAGE_MAP: Record<string, string> = {
  "01_mercado.png": img01,
  "02_cuaderno.png": img02,
  "03_gaseosa.png": img03,
  "04_transporte.png": img04,
  "05_abono.png": img05,
  "06_empanada.png": img06,
  "07_botas.png": img07,
  "08_chance.png": img08,
  "09_cerveza.png": img09,
  "10_helados.png": img10,
  "11_servicios.png": img11,
  "12_ropa.png": img12,
  "13_cigarrillos.png": img13,
  "14_vivienda.png": img14,
  "15_aseo.png": img15,
};

export type BasketType = "necesidades" | "deseos";

export interface DragItem {
  id: string;
  label: string;
  image: string;
  correctBasket: BasketType;
  feedbackNecesidad: string;
  feedbackDeseo: string;
}

const ITEMS: DragItem[] = [
  {
    id: "01",
    label: "Mercado",
    image: "01_mercado.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. El mercado es una necesidad para alimentar a la familia.",
    feedbackDeseo: "El mercado es una necesidad, no un deseo. Necesitamos alimentarnos.",
  },
  {
    id: "02",
    label: "Cuaderno para el colegio",
    image: "02_cuaderno.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. Los útiles escolares son necesarios para la educación.",
    feedbackDeseo: "El cuaderno es una necesidad para estudiar, no un capricho.",
  },
  {
    id: "03",
    label: "Gaseosa",
    image: "03_gaseosa.png",
    correctBasket: "deseos",
    feedbackNecesidad: "La gaseosa es un gusto, no una necesidad. El agua es suficiente para hidratarse.",
    feedbackDeseo: "Correcto. La gaseosa es un deseo que podemos evitar para ahorrar.",
  },
  {
    id: "04",
    label: "Transporte",
    image: "04_transporte.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. El transporte es necesario para movilizarse al trabajo o a comprar.",
    feedbackDeseo: "El transporte es una necesidad para llegar a donde necesitamos.",
  },
  {
    id: "05",
    label: "Abono para el cultivo",
    image: "05_abono.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. El abono es necesario para producir alimentos.",
    feedbackDeseo: "El abono es una necesidad para el cultivo y la producción.",
  },
  {
    id: "06",
    label: "Empanada diaria",
    image: "06_empanada.png",
    correctBasket: "deseos",
    feedbackNecesidad: "La empanada diaria es un gusto. Podemos comer en casa para ahorrar.",
    feedbackDeseo: "Correcto. Comprar empanada todos los días es un gasto hormiga.",
  },
  {
    id: "07",
    label: "Botas de trabajo",
    image: "07_botas.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. Las botas son necesarias para protegerse en el trabajo.",
    feedbackDeseo: "Las botas de trabajo son una necesidad para la seguridad.",
  },
  {
    id: "08",
    label: "Chance",
    image: "08_chance.png",
    correctBasket: "deseos",
    feedbackNecesidad: "El chance es un deseo, no una necesidad. Es un gasto que no genera beneficio.",
    feedbackDeseo: "Correcto. El chance es un gusto que conviene reducir.",
  },
  {
    id: "09",
    label: "Cerveza",
    image: "09_cerveza.png",
    correctBasket: "deseos",
    feedbackNecesidad: "La cerveza es un gusto, no una necesidad básica.",
    feedbackDeseo: "Correcto. La cerveza es un deseo que podemos moderar.",
  },
  {
    id: "10",
    label: "Helados",
    image: "10_helados.png",
    correctBasket: "deseos",
    feedbackNecesidad: "Los helados son un gusto, no una necesidad.",
    feedbackDeseo: "Correcto. Los helados son un deseo ocasional.",
  },
  {
    id: "11",
    label: "Servicios públicos",
    image: "11_servicios.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. Agua, luz y gas son necesidades del hogar.",
    feedbackDeseo: "Los servicios públicos son necesidades, no deseos.",
  },
  {
    id: "12",
    label: "Ropa",
    image: "12_ropa.png",
    correctBasket: "deseos",
    feedbackNecesidad: "En este contexto, la ropa nueva frecuente puede ser un deseo. La ropa básica sí es necesidad.",
    feedbackDeseo: "Correcto. Comprar ropa muy seguido puede ser un gasto hormiga.",
  },
  {
    id: "13",
    label: "Cigarrillos",
    image: "13_cigarrillos.png",
    correctBasket: "deseos",
    feedbackNecesidad: "Los cigarrillos no son una necesidad, son un gusto que afecta la salud y el bolsillo.",
    feedbackDeseo: "Correcto. Los cigarrillos son un gasto que conviene eliminar.",
  },
  {
    id: "14",
    label: "Reparaciones de vivienda",
    image: "14_vivienda.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. Mantener la vivienda en buen estado es una necesidad.",
    feedbackDeseo: "Las reparaciones de vivienda son una necesidad importante.",
  },
  {
    id: "15",
    label: "Productos de aseo",
    image: "15_aseo.png",
    correctBasket: "necesidades",
    feedbackNecesidad: "Correcto. La higiene es una necesidad para la salud.",
    feedbackDeseo: "Los productos de aseo son una necesidad básica.",
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

const SCORE_MESSAGES = {
  low: "Recuerde: las necesidades son lo que necesitamos para vivir bien (alimentación, educación, salud, vivienda). Los deseos podemos postergarlos o reducirlos para ahorrar.",
  medium:
    "Va bien. Revise los errores para aprender a diferenciar mejor entre necesidades y deseos. Los gastos hormiga son pequeños gastos frecuentes que suman mucho.",
  high: "¡Excelente! Sabe diferenciar bien entre necesidades y deseos. Esto le ayudará a priorizar gastos y evitar gastos hormiga.",
};

export default function Activity() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Record<string, BasketType>>({});
  const [showResult, setShowResult] = useState(false);
  const [shuffledItems] = useState(() => shuffleArray(ITEMS));

  const placedCount = Object.keys(assignments).length;
  const allPlaced = placedCount === ITEMS.length;

  // Solo mostramos un elemento a la vez: el siguiente por colocar (según el orden mezclado)
  const currentItem = shuffledItems.find((i) => !(i.id in assignments));

  const handleDrop = useCallback(
    (basket: BasketType) => (e: React.DragEvent) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("item-id");
      if (id) setAssignments((prev) => ({ ...prev, [id]: basket }));
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleVerResultado = () => {
    setShowResult(true);
  };

  const handleContinuar = () => {
    navigate(TENTACIONES_PATHS.FEEDBACK);
  };

  const correctCount = Object.entries(assignments).filter(
    ([id, basket]) => ITEMS.find((i) => i.id === id)?.correctBasket === basket
  ).length;

  const mistakes = Object.entries(assignments)
    .map(([id, basket]) => {
      const item = ITEMS.find((i) => i.id === id);
      if (!item || item.correctBasket === basket) return null;
      const feedback =
        basket === "necesidades" ? item.feedbackNecesidad : item.feedbackDeseo;
      return { item, feedback };
    })
    .filter((m): m is { item: DragItem; feedback: string } => m !== null);

  const scoreMessage =
    correctCount <= 5
      ? SCORE_MESSAGES.low
      : correctCount <= 10
        ? SCORE_MESSAGES.medium
        : SCORE_MESSAGES.high;

  if (showResult) {
    return (
      <ModulePageLayout title="Tentaciones">
        <div className="space-y-6 mt-6 pb-12 max-w-2xl mx-auto px-2">
          <div className="module-card">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-(--blue) text-center">
                Resultado
              </h2>
              <p className="text-center text-xl font-semibold">
                {correctCount} / 15 aciertos
              </p>
              <p className="text-gray-700 leading-relaxed">{scoreMessage}</p>

              {mistakes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Errores y retroalimentación:
                  </h3>
                  <ul className="space-y-3">
                    {mistakes.map(({ item, feedback }) => (
                      <li
                        key={item.id}
                        className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl"
                      >
                        <img
                          src={IMAGE_MAP[item.image]}
                          alt={item.label}
                          className="w-12 h-12 object-contain shrink-0"
                        />
                        <div>
                          <span className="font-medium text-gray-800">
                            {item.label}:
                          </span>{" "}
                          {feedback}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleContinuar}
                className="btn btn-orange text-xl px-8 py-3 w-full"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </ModulePageLayout>
    );
  }

  return (
    <ModulePageLayout title="Tentaciones">
      <div className="space-y-4 mt-4 pb-12 max-w-2xl mx-auto px-2">
        <p className="text-sm text-gray-600 text-center">
          Arrastre cada elemento a la canasta que corresponda: Necesidades o
          Deseos.
        </p>
        <p className="text-sm font-medium text-(--blue) text-center">
          Elemento {placedCount + 1} de {ITEMS.length}
        </p>

        {/* Un solo elemento a la vez: al posicionarlo aparece el siguiente */}
        <div className="flex justify-center min-h-[100px] p-4 bg-gray-50 rounded-xl">
          {currentItem ? (
            <div
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("item-id", currentItem.id);
                e.dataTransfer.effectAllowed = "move";
              }}
              className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing p-4 rounded-xl hover:bg-white/80 transition-colors touch-manipulation border-2 border-dashed border-(--blue)"
            >
              <img
                src={IMAGE_MAP[currentItem.image]}
                alt={currentItem.label}
                className="w-20 h-20 object-contain"
              />
              <span className="text-sm text-gray-700 text-center font-medium max-w-[120px] leading-tight">
                {currentItem.label}
              </span>
            </div>
          ) : (
            <p className="text-gray-500 flex items-center">
              ¡Todos clasificados!
            </p>
          )}
        </div>

        {/* Baskets */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onDrop={handleDrop("necesidades")}
            onDragOver={handleDragOver}
            className="relative min-h-[180px] rounded-2xl border-2 border-dashed border-(--blue) bg-blue-50/50 flex flex-col items-center justify-start pt-2 pb-4"
          >
            <img
              src={canasta1}
              alt="Necesidades"
              className="w-20 h-20 object-contain mb-1"
            />
            <span className="font-semibold text-(--blue) text-sm">
              Necesidades
            </span>
            <div className="flex flex-wrap justify-center gap-1 mt-2 px-2">
              {shuffledItems
                .filter((i) => assignments[i.id] === "necesidades")
                .map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("item-id", item.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() =>
                      setAssignments((prev) => {
                        const next = { ...prev };
                        delete next[item.id];
                        return next;
                      })
                    }
                    className="flex flex-col items-center cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/80"
                  >
                    <img
                      src={IMAGE_MAP[item.image]}
                      alt={item.label}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-[10px] text-gray-600 max-w-[50px] truncate">
                      {item.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div
            onDrop={handleDrop("deseos")}
            onDragOver={handleDragOver}
            className="relative min-h-[180px] rounded-2xl border-2 border-dashed border-orange-400 bg-orange-50/50 flex flex-col items-center justify-start pt-2 pb-4"
          >
            <img
              src={canasta2}
              alt="Deseos"
              className="w-20 h-20 object-contain mb-1"
            />
            <span className="font-semibold text-orange-700 text-sm">
              Deseos
            </span>
            <div className="flex flex-wrap justify-center gap-1 mt-2 px-2">
              {shuffledItems
                .filter((i) => assignments[i.id] === "deseos")
                .map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("item-id", item.id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onClick={() =>
                      setAssignments((prev) => {
                        const next = { ...prev };
                        delete next[item.id];
                        return next;
                      })
                    }
                    className="flex flex-col items-center cursor-grab active:cursor-grabbing p-1 rounded hover:bg-white/80"
                  >
                    <img
                      src={IMAGE_MAP[item.image]}
                      alt={item.label}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="text-[10px] text-gray-600 max-w-[50px] truncate">
                      {item.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleVerResultado}
          disabled={!allPlaced}
          className="btn btn-orange text-xl px-8 py-3 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ver resultado
        </button>
      </div>
    </ModulePageLayout>
  );
}
