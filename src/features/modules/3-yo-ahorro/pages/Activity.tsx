import { useState, useMemo } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { useNavigate } from "react-router";
import { YO_AHORRO_PATHS } from "../constants/paths";

// Format number as currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Parse currency string to number
const parseCurrency = (value: string): number => {
  return parseInt(value.replace(/[^\d]/g, "")) || 0;
};

const formatInputCurrency = (value: string): string => {
  if (!value) return "";
  const numValue = parseInt(value);
  if (isNaN(numValue)) return "";
  return formatCurrency(numValue);
};

export default function Activity() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [meta, setMeta] = useState("");
  const [costoTotal, setCostoTotal] = useState("");
  const [plazoMeses, setPlazoMeses] = useState("");

  const ahorroMensual = useMemo(() => {
    const costo = parseCurrency(costoTotal);
    const meses = parseCurrency(plazoMeses);
    if (costo > 0 && meses > 0) {
      return Math.round(costo / meses);
    }
    return 0;
  }, [costoTotal, plazoMeses]);

  const canProceedToStep2 = meta.trim().length > 0;
  const canCalculate = parseCurrency(costoTotal) > 0 && parseCurrency(plazoMeses) > 0;

  const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostoTotal(e.target.value.replace(/[^\d]/g, ""));
  };

  const handlePlazoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlazoMeses(e.target.value.replace(/[^\d]/g, ""));
  };

  return (
    <ModulePageLayout title="Yo ahorro">
      <div className="space-y-8 mt-10 pb-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="module-card">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-(--blue)">
                  Mi meta
                </h2>
                <p className="text-gray-700">
                  Piense en algo que quiera lograr con su ahorro. Puede ser una
                  meta personal o familiar.
                </p>
                <div>
                  <label htmlFor="meta" className="form-label">
                    Mi meta es:
                  </label>
                  <input
                    id="meta"
                    type="text"
                    value={meta}
                    onChange={(e) => setMeta(e.target.value)}
                    placeholder="Ej: Comprar una moto, mejorar el cultivo..."
                    className="form-input-base form-input-normal mt-2"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                    className="btn btn-orange"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-(--blue)">
                  Costo y plazo
                </h2>
                <p className="text-gray-700">
                  Escriba cuánto cuesta su meta y en cuántos meses quiere
                  alcanzarla.
                </p>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="costo" className="form-label">
                      Costo total de la meta:
                    </label>
                    <input
                      id="costo"
                      type="text"
                      value={formatInputCurrency(costoTotal)}
                      onChange={handleCostoChange}
                      placeholder="$0"
                      className="form-input-base form-input-normal mt-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="plazo" className="form-label">
                      Plazo en meses:
                    </label>
                    <input
                      id="plazo"
                      type="text"
                      inputMode="numeric"
                      value={plazoMeses}
                      onChange={handlePlazoChange}
                      placeholder="0"
                      className="form-input-base form-input-normal mt-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-blue"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!canCalculate}
                    className="btn btn-orange"
                  >
                    Calcular ahorro mensual
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-(--blue)">
                  Resultado
                </h2>
                <p className="text-lg text-gray-700">
                  Para lograr su meta, necesita ahorrar{" "}
                  <strong className="text-(--blue) text-xl">
                    {formatCurrency(ahorroMensual)}
                  </strong>{" "}
                  cada mes.
                </p>
                <p className="text-gray-600">
                  Revise si puede ahorrar esta cantidad cada mes, teniendo en
                  cuenta su dinero disponible. Si no le es posible, puede ajustar
                  el plazo o el costo de la meta.
                </p>
                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn btn-blue"
                  >
                    Ajustar mi plan
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(YO_AHORRO_PATHS.FEEDBACK)}
                    className="btn btn-orange"
                  >
                    Sí puedo ahorrar este monto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
