import { useState, useMemo } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Modal } from "@/shared/components/ui/Modal";
import { useNavigate } from "react-router";
import { YO_AHORRO_PATHS } from "../constants/paths";

interface FormData {
  savingsGoal: string;
  goalValue: string;
  desiredTime: string;
  totalIncome: string;
  totalExpense: string;
}

interface FormErrors {
  savingsGoal?: string;
  goalValue?: string;
  desiredTime?: string;
  totalIncome?: string;
  totalExpense?: string;
}

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

const validate = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.savingsGoal.trim()) {
    errors.savingsGoal = "Ingresar el nombre de su meta";
  } else if (!/^[a-zA-ZÁ-ÿ\s]{1,40}$/.test(data.savingsGoal)) {
    errors.savingsGoal = "El nombre solo puede contener letras y espacios";
  }

  if (!data.goalValue || parseCurrency(data.goalValue) === 0) {
    errors.goalValue = "Ingresar el valor de su meta de ahorro";
  }

  if (!data.desiredTime || parseCurrency(data.desiredTime) === 0) {
    errors.desiredTime = "Ingresar el tiempo de cumplimiento en meses";
  }

  if (!data.totalIncome || parseCurrency(data.totalIncome) === 0) {
    errors.totalIncome = "Ingresar el valor de su total de ingresos";
  }

  if (!data.totalExpense || parseCurrency(data.totalExpense) === 0) {
    errors.totalExpense = "Ingresar el valor de su total de egresos";
  }

  return errors;
};

export default function Activity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    savingsGoal: "",
    goalValue: "",
    desiredTime: "",
    totalIncome: "",
    totalExpense: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showResultModal, setShowResultModal] = useState(false);

  // Calculate available for savings
  const availableForSavings = useMemo(() => {
    const income = parseCurrency(formData.totalIncome);
    const expense = parseCurrency(formData.totalExpense);
    if (income > 0 && expense >= 0) {
      return income - expense;
    }
    return 0;
  }, [formData.totalIncome, formData.totalExpense]);

  // Calculate monthly fee
  const monthlyFee = useMemo(() => {
    const goalValue = parseCurrency(formData.goalValue);
    const desiredTime = parseCurrency(formData.desiredTime);
    if (goalValue > 0 && desiredTime > 0) {
      return Math.round(goalValue / desiredTime);
    }
    return 0;
  }, [formData.goalValue, formData.desiredTime]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isCurrency = false
  ) => {
    const { name, value } = e.target;
    if (isCurrency) {
      // Remove non-digits for currency fields
      const numericValue = value.replace(/[^\d]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const formatInputCurrency = (value: string): string => {
    if (!value) return "";
    const numValue = parseInt(value);
    if (isNaN(numValue)) return "";
    return formatCurrency(numValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setShowResultModal(true);
  };

  const canAffordGoal = availableForSavings >= monthlyFee && monthlyFee > 0;

  return (
    <ModulePageLayout title="Yo ahorro">
      <div className="space-y-6 mt-10">
        <div className="max-w-4xl mx-auto w-full flex-1">
          <div className="module-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields in Two Columns */}
              <div className="space-y-6">
                {/* Savings Goal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Mi meta de ahorros
                      <span className="form-required">*</span>
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input
                      name="savingsGoal"
                      value={formData.savingsGoal}
                      onChange={(e) => handleInputChange(e, false)}
                      placeholder="Ej: Moto, Carro, Viaje..."
                      className={`form-input-base ${
                        errors.savingsGoal
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                      maxLength={40}
                    />
                    {errors.savingsGoal && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                        {errors.savingsGoal}
                      </p>
                    )}
                  </div>
                </div>

                {/* Goal Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Valor meta
                      <span className="form-required">*</span>
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input
                      name="goalValue"
                      type="text"
                      value={formatInputCurrency(formData.goalValue)}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="Valor total"
                      className={`form-input-base ${
                        errors.goalValue
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.goalValue && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                        {errors.goalValue}
                      </p>
                    )}
                  </div>
                </div>

                {/* Desired Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Tiempo deseado (en meses)
                      <span className="form-required">*</span>
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input
                      name="desiredTime"
                      type="text"
                      value={formData.desiredTime}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="¿En cuántos meses desea tenerla?"
                      className={`form-input-base ${
                        errors.desiredTime
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                      maxLength={3}
                    />
                    {errors.desiredTime && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                        {errors.desiredTime}
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Income */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Total ingresos (Mensual)
                      <span className="form-required">*</span>
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input
                      name="totalIncome"
                      type="text"
                      value={formatInputCurrency(formData.totalIncome)}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="Salario"
                      className={`form-input-base ${
                        errors.totalIncome
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.totalIncome && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                        {errors.totalIncome}
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Expenses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Total egresos (Mensual)
                      <span className="form-required">*</span>
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input
                      name="totalExpense"
                      type="text"
                      value={formatInputCurrency(formData.totalExpense)}
                      onChange={(e) => handleInputChange(e, true)}
                      placeholder="¿Cuánto son sus gastos mensuales?"
                      className={`form-input-base ${
                        errors.totalExpense
                          ? "form-input-error"
                          : "form-input-normal"
                      }`}
                    />
                    {errors.totalExpense && (
                      <p className="absolute -bottom-6 left-0 text-sm text-red-500 font-medium">
                        {errors.totalExpense}
                      </p>
                    )}
                  </div>
                </div>

                {/* Available for Savings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <div className="flex items-center h-full justify-end">
                    <label className="form-label mb-0 text-right">
                      Dinero disponible para ahorro (Mensual)
                    </label>
                  </div>
                  <div className="w-full">
                    {canAffordGoal ? (
                      <input
                        type="text"
                        className="form-input-base form-input-normal"
                        value={formatCurrency(availableForSavings)}
                        disabled
                        readOnly
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-input-base form-input-normal opacity-60"
                        value="No tiene dinero suficiente para ahorrar"
                        disabled
                        readOnly
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="btn btn-orange text-xl px-8 py-3"
                >
                  Mostrar resultado
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <Modal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        size="lg"
      >
        <div className="space-y-6 p-4">
          <h2 className="text-3xl font-bold text-(--blue) text-center">
            {canAffordGoal ? "¡Felicidades!" : "¡Lo sentimos!"}
          </h2>

          <div className="text-center space-y-4">
            {canAffordGoal ? (
              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  Usted tiene{" "}
                  <strong className="text-green-600 text-xl">
                    {formatCurrency(availableForSavings)}
                  </strong>{" "}
                  disponible para ahorrar, de los cuales si ahorra{" "}
                  <strong className="text-blue-600 text-xl">
                    {formatCurrency(monthlyFee)}
                  </strong>{" "}
                  durante{" "}
                  <strong>{parseCurrency(formData.desiredTime)} meses</strong>{" "}
                  podrá obtener su{" "}
                  <strong className="text-(--blue)">
                    {formData.savingsGoal}
                  </strong>
                  !
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  Usted no tiene dinero disponible para ahorrar, identifique
                  cuáles de sus gastos son innecesarios y analice alternativas
                  para aumentar sus ingresos.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              onClick={() => setShowResultModal(false)}
              className="btn btn-blue"
            >
              Volver
            </button>
            <button
              onClick={() => navigate(YO_AHORRO_PATHS.FEEDBACK)}
              className="btn btn-orange"
            >
              Finalizar
            </button>
          </div>
        </div>
      </Modal>
    </ModulePageLayout>
  );
}
