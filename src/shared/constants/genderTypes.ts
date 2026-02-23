export const GENDER_TYPES = [
    { value: "Masculino" as const, label: "Masculino" },
    { value: "Femenino" as const, label: "Femenino" },
];

export const GENDER_TYPES_VALUES = GENDER_TYPES.map((gender) => gender.value);