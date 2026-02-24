const optionsInverse = [
  { id: "a", text: "Para nada", value: 4 },
  { id: "b", text: "Un poco", value: 3 },
  { id: "c", text: "Más o menos", value: 2 },
  { id: "d", text: "Bastante", value: 1 },
  { id: "e", text: "Totalmente", value: 0 },
];

const optionsDirect = [
  { id: "a", text: "Para nada", value: 0 },
  { id: "b", text: "Un poco", value: 1 },
  { id: "c", text: "Más o menos", value: 2 },
  { id: "d", text: "Bastante", value: 3 },
  { id: "e", text: "Totalmente", value: 4 },
];

export const QUESTIONS = [
  {
    question:
      "¿Siente que debido a su situación financiera nunca conseguirá las cosas que quiere en la vida?",
    options: optionsInverse,
  },
  {
    question:
      "¿Le preocupa que el dinero que tiene no le alcance hasta fin de mes?",
    options: optionsInverse,
  },
  {
    question:
      "¿Siente que el ingreso de su hogar apenas alcanza para sobrevivir?",
    options: optionsInverse,
  },
  {
    question: "¿Le sobra dinero al final del mes?",
    options: optionsDirect,
  },
  {
    question: "¿Siente que sus finanzas controlan su vida?",
    options: optionsInverse,
  },
];
