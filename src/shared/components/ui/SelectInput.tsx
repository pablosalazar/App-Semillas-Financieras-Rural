import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";
import clsx from "clsx";
import type { SelectOption } from "@/shared/types";

export interface SelectInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "type"
> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  clearable?: boolean;
  searchable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
}

export const SelectInput = forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      options,
      label,
      placeholder = "Selecciona una opción",
      error,
      helperText,
      clearable = false,
      searchable = true,
      disabled = false,
      required = false,
      onChange,
      onBlur,
      name,
      value,
      id,
      className,
      ...props
    },
    ref,
  ) => {
    const selectId =
      id ||
      (label
        ? `select-${label.toLowerCase().replace(/\s+/g, "-")}`
        : `select-${Math.random().toString(36).substr(2, 9)}`);

    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const [internalValue, setInternalValue] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Combine refs
    useEffect(() => {
      if (typeof ref === "function") {
        ref(hiddenInputRef.current);
      } else if (ref) {
        ref.current = hiddenInputRef.current;
      }
    }, [ref]);

    // Sync hidden input value (from react-hook-form) to Select UI
    const syncValueFromInput = useCallback(() => {
      if (hiddenInputRef.current) {
        const inputValue = hiddenInputRef.current.value;
        setInternalValue(inputValue || null);
      }
    }, []);

    // Initial sync on mount and when ref is attached
    useEffect(() => {
      // Small delay to ensure ref is attached by react-hook-form
      const timer = setTimeout(() => {
        syncValueFromInput();
      }, 0);

      // Listen to input changes (for programmatic updates from react-hook-form)
      const input = hiddenInputRef.current;
      if (input) {
        const handleInputChange = () => {
          syncValueFromInput();
        };
        input.addEventListener("input", handleInputChange);
        return () => {
          clearTimeout(timer);
          input.removeEventListener("input", handleInputChange);
        };
      }

      return () => {
        clearTimeout(timer);
      };
    }, [syncValueFromInput]);

    // Sync when value prop changes (if provided - for controlled mode)
    useEffect(() => {
      if (value !== undefined && hiddenInputRef.current) {
        syncValueFromInput();
      }
    }, [value, syncValueFromInput]);

    const selected = options.find((option) => option.value === internalValue);

    const filteredOptions =
      !searchable || query === ""
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(query.toLowerCase()),
          );

    const handleSelectChange = (newValue: string | null) => {
      setInternalValue(newValue);
      setQuery("");

      // Update hidden input and trigger onChange
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = newValue || "";
        if (onChange) {
          const syntheticEvent = {
            target: {
              value: newValue || "",
              name: name || "",
            },
            currentTarget: hiddenInputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelectChange(null);
    };

    const handleInputClick = () => {
      buttonRef.current?.click();
    };

    return (
      <div className={clsx("w-full", className)}>
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {label && (
          <label htmlFor={selectId} className="form-label">
            {label}
            {required && <span className="form-required">*</span>}
          </label>
        )}
        <Combobox
          value={internalValue}
          onChange={handleSelectChange}
          onClose={() => setQuery("")}
          disabled={disabled}
        >
          {() => (
            <div className="relative mt-1">
              <div className="relative">
                <ComboboxInput
                  id={selectId}
                  className={clsx(
                    "form-input-base pr-20 pl-3",
                    error ? "form-input-error" : "form-input-normal",
                    "cursor-pointer",
                  )}
                  displayValue={() => selected?.label || ""}
                  onChange={(event) =>
                    searchable && setQuery(event.target.value)
                  }
                  onClick={handleInputClick}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={!searchable}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={
                    error
                      ? `${selectId}-error`
                      : helperText
                        ? `${selectId}-helper`
                        : undefined
                  }
                />

                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  {clearable && internalValue && !disabled && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="form-clear-button"
                      aria-label="Limpiar selección"
                    >
                      <X className="text-gray-400" />
                    </button>
                  )}

                  <ComboboxButton
                    ref={buttonRef}
                    className="flex items-center px-2 touch-manipulation pointer-events-auto"
                  >
                    <ChevronDown className="text-gray-400" />
                  </ComboboxButton>
                </div>
              </div>

              <ComboboxOptions
                anchor="bottom start"
                className="w-(--input-width) mt-1 border border-gray-200 bg-white rounded-md shadow-lg empty:invisible max-h-52 overflow-y-auto py-1 z-50"
              >
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No hay opciones
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <ComboboxOption
                      key={option.value}
                      value={option.value}
                      className="group relative cursor-pointer select-none py-3 pl-10 pr-4 text-base data-focus:bg-blue-600 data-focus:text-white touch-manipulation"
                    >
                      <span className="block truncate group-data-selected:font-medium">
                        {option.label}
                      </span>
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 group-data-focus:text-white invisible group-data-selected:visible">
                        <Check className="h-5 w-5" />
                      </span>
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </div>
          )}
        </Combobox>
        {error && (
          <p id={`${selectId}-error`} className="form-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="form-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";
