import { forwardRef } from "react";
import clsx from "clsx";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || (label
      ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
      : `input-${Math.random().toString(36).substr(2, 9)}`);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="form-label"
          >
            {label}
            {props.required && <span className="form-required">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "form-input-base",
            error ? "form-input-error" : "form-input-normal",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="form-error">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="form-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

