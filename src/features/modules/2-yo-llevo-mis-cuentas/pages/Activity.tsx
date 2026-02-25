import { useState } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { YO_LLEVO_MIS_CUENTAS_PATHS } from "../constants/paths";

interface TableRow {
  id: string;
  concept: string;
  value: string; // raw number string for input
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

const formatInputCurrency = (value: string): string => {
  if (!value) return "";
  const numValue = parseInt(value);
  if (isNaN(numValue)) return "";
  return formatCurrency(numValue);
};

// Pre-filled data from PDF
const INITIAL_FIXED_INCOME: TableRow[] = [
  { id: "1", concept: "Venta mensual de leche", value: "600000" },
  { id: "2", concept: "Sueldo fijo", value: "1000000" },
];

const INITIAL_VARIABLE_INCOME: TableRow[] = [
  { id: "3", concept: "Venta de cosechas ocasionales", value: "50000" },
  { id: "4", concept: "Trabajos por días", value: "60000" },
];

const INITIAL_FIXED_EXPENSES: TableRow[] = [
  { id: "5", concept: "Alimentación", value: "400000" },
  { id: "6", concept: "Servicios (agua, energía, gas)", value: "150000" },
];

const INITIAL_VARIABLE_EXPENSES: TableRow[] = [
  { id: "7", concept: "Medicinas", value: "30000" },
  { id: "8", concept: "Ropa", value: "50000" },
];

function IncomeExpenseTable({
  title,
  rows,
  onAddRow,
  onUpdateRow,
  onDeleteRow,
}: {
  title: string;
  rows: TableRow[];
  onAddRow: () => void;
  onUpdateRow: (id: string, field: "concept" | "value", value: string) => void;
  onDeleteRow: (id: string) => void;
}) {
  const subtotal = rows.reduce((sum, row) => sum + parseCurrency(row.value), 0);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 font-semibold">Concepto</th>
              <th className="text-right p-2 font-semibold w-28">Valor ($)</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="p-2">
                  <input
                    type="text"
                    value={row.concept}
                    onChange={(e) => onUpdateRow(row.id, "concept", e.target.value)}
                    className="w-full px-2 py-1 border border-gray-200 rounded text-gray-800"
                    placeholder="Concepto"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={formatInputCurrency(row.value)}
                    onChange={(e) => onUpdateRow(row.id, "value", e.target.value.replace(/[^\d]/g, ""))}
                    className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                    placeholder="$0"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => onDeleteRow(row.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                    aria-label="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-700">Subtotal {title.toLowerCase()}:</span>
        <span className="font-semibold">{formatCurrency(subtotal)}</span>
      </div>
      <button
        type="button"
        onClick={onAddRow}
        className="flex items-center gap-2 text-(--blue) hover:underline text-sm font-medium"
      >
        <Plus className="w-4 h-4" />
        Agregar fila
      </button>
    </div>
  );
}

export default function Activity() {
  const navigate = useNavigate();
  const [block, setBlock] = useState<1 | 2 | 3>(1);

  const [fixedIncome, setFixedIncome] = useState<TableRow[]>(() =>
    INITIAL_FIXED_INCOME.map((r) => ({ ...r }))
  );
  const [variableIncome, setVariableIncome] = useState<TableRow[]>(() =>
    INITIAL_VARIABLE_INCOME.map((r) => ({ ...r }))
  );
  const [fixedExpenses, setFixedExpenses] = useState<TableRow[]>(() =>
    INITIAL_FIXED_EXPENSES.map((r) => ({ ...r }))
  );
  const [variableExpenses, setVariableExpenses] = useState<TableRow[]>(() =>
    INITIAL_VARIABLE_EXPENSES.map((r) => ({ ...r }))
  );

  const addRow = (
    setter: React.Dispatch<React.SetStateAction<TableRow[]>>
  ) => {
    setter((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        concept: "",
        value: "0",
      },
    ]);
  };

  const updateRow = (
    setter: React.Dispatch<React.SetStateAction<TableRow[]>>,
    id: string,
    field: "concept" | "value",
    value: string
  ) => {
    setter((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const deleteRow = (
    setter: React.Dispatch<React.SetStateAction<TableRow[]>>,
    id: string
  ) => {
    setter((prev) => prev.filter((row) => row.id !== id));
  };

  const totalIncome =
    fixedIncome.reduce((s, r) => s + parseCurrency(r.value), 0) +
    variableIncome.reduce((s, r) => s + parseCurrency(r.value), 0);

  const totalExpenses =
    fixedExpenses.reduce((s, r) => s + parseCurrency(r.value), 0) +
    variableExpenses.reduce((s, r) => s + parseCurrency(r.value), 0);

  const dineroDisponible = totalIncome - totalExpenses;

  return (
    <ModulePageLayout title="Yo llevo mis cuentas">
      <div className="space-y-8 mt-10 pb-12">
        <div className="max-w-5xl mx-auto w-full">
          <div className="module-card">
            {block === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-(--blue)">
                  1. Registre sus ingresos del mes
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <IncomeExpenseTable
                    title="Ingresos fijos"
                    rows={fixedIncome}
                    onAddRow={() => addRow(setFixedIncome)}
                    onUpdateRow={(id, field, value) =>
                      updateRow(setFixedIncome, id, field, value)
                    }
                    onDeleteRow={(id) => deleteRow(setFixedIncome, id)}
                  />
                  <IncomeExpenseTable
                    title="Ingresos variables"
                    rows={variableIncome}
                    onAddRow={() => addRow(setVariableIncome)}
                    onUpdateRow={(id, field, value) =>
                      updateRow(setVariableIncome, id, field, value)
                    }
                    onDeleteRow={(id) => deleteRow(setVariableIncome, id)}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                  <span className="font-bold text-lg">Total ingresos</span>
                  <span className="font-bold text-xl text-(--blue)">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setBlock(2)}
                    className="btn btn-orange"
                  >
                    Continuar con los gastos
                  </button>
                </div>
              </div>
            )}

            {block === 2 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-(--blue)">
                  2. Registre sus gastos del mes
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <IncomeExpenseTable
                    title="Gastos fijos"
                    rows={fixedExpenses}
                    onAddRow={() => addRow(setFixedExpenses)}
                    onUpdateRow={(id, field, value) =>
                      updateRow(setFixedExpenses, id, field, value)
                    }
                    onDeleteRow={(id) => deleteRow(setFixedExpenses, id)}
                  />
                  <IncomeExpenseTable
                    title="Gastos variables"
                    rows={variableExpenses}
                    onAddRow={() => addRow(setVariableExpenses)}
                    onUpdateRow={(id, field, value) =>
                      updateRow(setVariableExpenses, id, field, value)
                    }
                    onDeleteRow={(id) => deleteRow(setVariableExpenses, id)}
                  />
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                  <span className="font-bold text-lg">Total gastos</span>
                  <span className="font-bold text-xl text-(--blue)">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setBlock(1)}
                    className="btn btn-blue"
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => setBlock(3)}
                    className="btn btn-orange"
                  >
                    Calcular dinero disponible
                  </button>
                </div>
              </div>
            )}

            {block === 3 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-(--blue)">
                  3. Su dinero disponible este mes
                </h2>
                <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Dinero disponible = Total ingresos − Total gastos
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-medium">Total ingresos:</span>{" "}
                    {formatCurrency(totalIncome)}
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="font-medium">Total gastos:</span>{" "}
                    {formatCurrency(totalExpenses)}
                  </p>
                  <p className="text-xl font-bold">
                    <span className="text-gray-700">Dinero disponible: </span>
                    <span
                      className={
                        dineroDisponible > 0
                          ? "text-green-600"
                          : dineroDisponible < 0
                            ? "text-red-600"
                            : "text-amber-600"
                      }
                    >
                      {formatCurrency(dineroDisponible)}
                    </span>
                  </p>
                </div>

                {/* Feedback según el resultado - PDF */}
                {dineroDisponible > 0 && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <p className="text-lg text-green-800 font-semibold mb-2">
                      ¡Muy bien!
                    </p>
                    <p className="text-gray-800">
                      Sus ingresos son mayores que sus gastos, lo que significa
                      que tiene dinero disponible.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Aproveche esta oportunidad para fijarse una meta de ahorro
                      mensual. Recuerde: el ahorro constante, por mínimo que
                      sea, es la base para cumplir sus metas y tener tranquilidad.
                    </p>
                  </div>
                )}
                {dineroDisponible === 0 && (
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                    <p className="text-lg text-amber-800 font-semibold mb-2">
                      ¡Cuidado!
                    </p>
                    <p className="text-gray-800">
                      Sus ingresos le alcanzan exactamente para cubrir sus gastos.
                      Esto indica que no tiene dinero disponible al mes.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Es importante que esté atento, pues cualquier gasto extra
                      podría afectar su estabilidad. Revise sus gastos y busque
                      formas de reducir los que sean innecesarios para mejorar su
                      situación financiera.
                    </p>
                  </div>
                )}
                {dineroDisponible < 0 && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <p className="text-lg text-red-800 font-semibold mb-2">
                      ¡Peligro!
                    </p>
                    <p className="text-gray-800">
                      Sus gastos son mayores que sus ingresos, lo que significa
                      que está gastando más de lo que gana.
                    </p>
                    <p className="text-gray-700 mt-2">
                      Es importante revisar en qué puede reducir gastos para
                      recuperar el equilibrio y evitar endeudarse. No se desanime:
                      este resultado es una oportunidad para revisar en qué puede
                      ajustar o reducir gastos innecesarios. Con un mejor control
                      y planeación, podrá equilibrar sus cuentas y mejorar su
                      situación mes a mes.
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setBlock(2)}
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
            )}
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
