export const DOCUMENT_TYPES = [
  { value: "CC" as const, label: "Cédula de Ciudadanía" },
  { value: "TI" as const, label: "Tarjeta de Identidad" },
  { value: "CE" as const, label: "Cédula de Extranjería" },
  { value: "PP" as const, label: "Pasaporte" },
];

export const DOCUMENT_TYPES_VALUES = DOCUMENT_TYPES.map((doc) => doc.value);
