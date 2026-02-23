export const ATM_BASE_PATH = "/modulos/cajero-automatico";

export const ATM_OPERATIONS = {
  CHECK_BALANCE: "Check balance",
  WITHDRAW_MONEY: "Withdraw money",
} as const;

export const ATM_ROUTES = {
  INTRO: "",
  START: "inicio",
  INSERT_CARD: "insertar-tarjeta",
  DONT_REMOVE_CARD: "no-retires-tu-tarjeta",
  CHOOSE_OPERATION: "elige-la-transaccion",
  SELECT_AMOUNT: "seleccionar-cantidad",
  CHECK_COST: "consultar-costo",
  ENTER_PIN: "ingresar-clave",
  WRONG_PASSWORD: "clave-incorrecta",
  WITHDRAW_MONEY: "retirar-dinero",
  SCREEN_OR_RECEIPT: "imprimir-recibo-o-ver-en-pantalla",
  PRINT_RECEIPT: "imprimir-recibo",
  CHECK_BALANCE: "ver-saldo",
  FINAL: "final",
} as const;
