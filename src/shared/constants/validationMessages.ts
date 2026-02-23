export const validationMessages = {
  required: "Este campo es requerido",
  selectOption: "Selecciona una opción",
  invalidEmail: "Formato de correo inválido",
  minLength: (min: number) => `Debe tener al menos ${min} caracteres`,
  maxLength: (max: number) => `Debe tener máximo ${max} caracteres`,
  numbersOnly: "Solo se permiten números",
  invalidFormat: "Formato inválido",
  passwordTooShort: "La contraseña debe tener al menos 8 caracteres",
  passwordsMustMatch: "Las contraseñas no coinciden",
  invalidDocumentNumber: "Número de documento inválido",
  invalidDate: "Fecha inválida",
} as const;
