import { useState, useRef } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Modal } from "@/shared/components/ui/Modal";
import { TextInput } from "@/shared/components/ui/TextInput";
import { SelectInput } from "@/shared/components/ui/SelectInput";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { YO_LLEVO_MIS_CUENTAS_PATHS } from "../constants/paths";

interface Expense {
  id: string;
  name: string;
  amount: string;
}

const MONTHS = [
  { value: "enero", label: "Enero" },
  { value: "febrero", label: "Febrero" },
  { value: "marzo", label: "Marzo" },
  { value: "abril", label: "Abril" },
  { value: "mayo", label: "Mayo" },
  { value: "junio", label: "Junio" },
  { value: "julio", label: "Julio" },
  { value: "agosto", label: "Agosto" },
  { value: "septiembre", label: "Septiembre" },
  { value: "octubre", label: "Octubre" },
  { value: "noviembre", label: "Noviembre" },
  { value: "diciembre", label: "Diciembre" },
];

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

export default function Activity() {
  const navigate = useNavigate();
  const [month, setMonth] = useState("enero");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [savings, setSavings] = useState<number | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState("");
  const expenseNameRef = useRef<HTMLInputElement>(null);

  const handleAddExpense = () => {
    const name = expenseNameRef.current?.value.trim() || "";
    const amount = expenseAmount;

    if (name && amount && parseCurrency(amount) > 0) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        name,
        amount, // Store as raw number string
      };
      setExpenses((prev) => [...prev, newExpense]);

      // Clear inputs
      if (expenseNameRef.current) expenseNameRef.current.value = "";
      setExpenseAmount("");

      setShowExpenseModal(false);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleCalculateSavings = () => {
    const incomeValue = parseCurrency(income);

    if (incomeValue > 0 && expenses.length > 0) {
      const totalExpenses = expenses.reduce((sum, expense) => {
        return sum + parseCurrency(expense.amount);
      }, 0);

      const calculatedSavings = incomeValue - totalExpenses;
      setSavings(calculatedSavings);
      setShowSavingsModal(true);
    }
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setIncome(value);
  };

  const handleExpenseAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setExpenseAmount(value);
  };

  const formatInputCurrency = (value: string): string => {
    if (!value) return "";
    const numValue = parseInt(value);
    if (isNaN(numValue)) return "";
    return formatCurrency(numValue);
  };

  return (
    <ModulePageLayout title="Yo llevo mis cuentas">
      <div className="space-y-6 mt-10">
        <div className="max-w-4xl mx-auto w-full flex-1">
          <div className="module-card">
            <div className="space-y-6">
              {/* Month and Income Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  label="Mes"
                  options={MONTHS}
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Selecciona un mes"
                />

                <div className="w-full">
                  <TextInput
                    label="Ingreso"
                    type="text"
                    value={income ? formatInputCurrency(income) : ""}
                    onChange={handleIncomeChange}
                    placeholder="$0"
                    helperText="*Ingrese el total de ingresos"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="btn btn-blue"
                >
                  Agregar gastos
                </button>
                <button
                  onClick={handleCalculateSavings}
                  className="btn btn-orange"
                  disabled={!income || expenses.length === 0}
                >
                  Calcular
                </button>
              </div>

              {/* Expenses List */}
              {expenses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Gastos registrados:
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {expense.name}
                          </p>
                          <p className="text-lg text-gray-600">
                            {formatInputCurrency(expense.amount)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Eliminar gasto"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expenses.length === 0 && (
                <div className="text-center bg-blue-50 border-2 border-blue-200 rounded-xl py-8 text-blue-500">
                  <p className="text-2xl font-semibold">
                    No hay gastos registrados
                  </p>
                  <p className="text-sm mt-2">
                    Haz clic en{" "}
                    <span className="text-blue-500 font-semibold">
                      Agregar gastos
                    </span>{" "}
                    para comenzar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <Modal
        isOpen={showExpenseModal}
        onClose={() => setShowExpenseModal(false)}
        size="lg"
      >
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold text-(--blue) text-center">
            Agregar gastos
          </h2>

          <div className="space-y-4">
            <TextInput
              ref={expenseNameRef}
              label="Nombre del gasto"
              placeholder="Ej: Arriendo, mercado..."
              required
            />

            <div className="w-full">
              <TextInput
                label="Valor"
                type="text"
                value={expenseAmount ? formatInputCurrency(expenseAmount) : ""}
                onChange={handleExpenseAmountChange}
                placeholder="$0"
                helperText="Ingrese el valor en números"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              onClick={() => setShowExpenseModal(false)}
              className="btn btn-blue"
            >
              Volver
            </button>
            <button onClick={handleAddExpense} className="btn btn-orange">
              Agregar
            </button>
          </div>
        </div>
      </Modal>

      {/* Savings Result Modal */}
      <Modal
        isOpen={showSavingsModal}
        onClose={() => setShowSavingsModal(false)}
        size="lg"
      >
        <div className="space-y-6 p-4">
          <h2 className="text-2xl font-bold text-(--blue) text-center">
            Resultado del cálculo
          </h2>

          <div className="text-center space-y-4">
            {savings !== null && savings > 0 ? (
              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  Usted tiene{" "}
                  <strong className="text-green-600 text-xl">
                    {formatCurrency(savings)}
                  </strong>{" "}
                  disponibles para ahorrar en{" "}
                  <strong>
                    {MONTHS.find((m) => m.value === month)?.label}
                  </strong>
                  .
                </p>
                <p className="text-gray-600 italic">
                  Fíjese una meta real de ahorro que pueda mantener mensualmente
                  y hágalo cada mes.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-lg text-gray-700">
                  Atención: realice ajustes a sus gastos e identifique los
                  gastos innecesarios que puede eliminar.
                </p>
                <p className="text-gray-600 italic">
                  ¡Esto le ayuda a cumplir su meta de ahorro!
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              onClick={() => setShowSavingsModal(false)}
              className="btn btn-blue"
            >
              Volver
            </button>
            <button
              onClick={() => navigate(YO_LLEVO_MIS_CUENTAS_PATHS.FEEDBACK)}
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
