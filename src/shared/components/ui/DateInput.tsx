import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import "react-day-picker/style.css";

export interface DateInputProps {
  value?: Date | null;
  label?: string;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
  clearable?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
}

export function DateInput({
  value,
  label,
  onChange,
  placeholder = "Selecciona una fecha",
  error,
  clearable = false,
  disabled = false,
  minDate,
  maxDate,
  required = false,
}: DateInputProps) {
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const inputId = label
    ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
    : `input-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <>
      {label && (
        <label
          htmlFor={inputId}
          className="form-label"
        >
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <Popover className="relative">
        <div className="relative">
          <PopoverButton
            className={clsx(
              "form-input-base pr-20 pl-3 text-left",
              error ? "form-input-error" : "form-input-normal",
              !value && "text-gray-400"
            )}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}

          >
            {value ? format(value, "PPP", { locale: es }) : placeholder}
          </PopoverButton>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            {clearable && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="form-clear-button"
                aria-label="Limpiar fecha"
              >
                <X className="text-gray-400" />
              </button>
            )}

            <div className="flex items-center px-2 pointer-events-auto">
              <Calendar className="text-gray-400" />
            </div>
          </div>
        </div>
        <PopoverPanel
          anchor="bottom start"
          transition
          className="mt-1 border border-gray-200 bg-white rounded-md shadow-lg z-50"
        >
          {({ close }) => (
            <div className="p-3">
              <DayPicker
                selected={value ?? undefined}
                defaultMonth={value ?? undefined}
                onSelect={(date) => {
                  onChange(date || null);
                  close();
                }}
                animate
                captionLayout="dropdown"
                hideWeekdays
                mode="single"
                navLayout="after"
                showOutsideDays
                className="rdp-custom"
                locale={es}
                startMonth={minDate}
                endMonth={maxDate}
                hidden={
                  [
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                  ]
                }
              />
            </div>
          )}
        </PopoverPanel>
      </Popover>
      {error && <p className="form-error">{error}</p>}
    </>
  );
}