import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";
import { ATMProvider } from "./context/ATMContext";
import { ATM_ROUTES } from "./constants/atm";

const Intro = lazy(() => import("./pages/Intro"));
const ATMStart = lazy(() => import("./pages/ATMStart"));
const InsertCard = lazy(() => import("./pages/InsertCard"));
const DontRemoveYourCard = lazy(() => import("./pages/DontRemoveYourCard"));
const ChooseTransaction = lazy(() => import("./pages/ChooseTransaction"));
const SelectAmount = lazy(() => import("./pages/SelectAmount"));
const CheckCost = lazy(() => import("./pages/CheckCost"));
const EnterYourKey = lazy(() => import("./pages/EnterYourKey"));
const WrongPassword = lazy(() => import("./pages/WrongPassword"));
const WithdrawMoney = lazy(() => import("./pages/WithdrawMoney"));
const ScreenOrReceipt = lazy(() => import("./pages/ScreenOrReceipt"));
const PrintReceipt = lazy(() => import("./pages/PrintReceipt"));
const CheckBalance = lazy(() => import("./pages/CheckBalance"));
const Final = lazy(() => import("./pages/Final"));

export const cajeroAutomaticoRoutes: ModuleRoutes = {
  basePath: "cajero-automatico",
  routes: [
    {
      element: <ATMProvider />,
      children: [
        {
          path: ATM_ROUTES.INTRO,
          element: <Intro />,
        },
        {
          path: ATM_ROUTES.START,
          element: <ATMStart />,
        },
        {
          path: ATM_ROUTES.INSERT_CARD,
          element: <InsertCard />,
        },
        {
          path: ATM_ROUTES.DONT_REMOVE_CARD,
          element: <DontRemoveYourCard />,
        },
        {
          path: ATM_ROUTES.CHOOSE_OPERATION,
          element: <ChooseTransaction />,
        },
        {
          path: ATM_ROUTES.SELECT_AMOUNT,
          element: <SelectAmount />,
        },
        {
          path: ATM_ROUTES.CHECK_COST,
          element: <CheckCost />,
        },
        {
          path: ATM_ROUTES.ENTER_PIN,
          element: <EnterYourKey />,
        },
        {
          path: ATM_ROUTES.WRONG_PASSWORD,
          element: <WrongPassword />,
        },
        {
          path: ATM_ROUTES.WITHDRAW_MONEY,
          element: <WithdrawMoney />,
        },
        {
          path: ATM_ROUTES.SCREEN_OR_RECEIPT,
          element: <ScreenOrReceipt />,
        },
        {
          path: ATM_ROUTES.PRINT_RECEIPT,
          element: <PrintReceipt />,
        },
        {
          path: ATM_ROUTES.CHECK_BALANCE,
          element: <CheckBalance />,
        },
        {
          path: ATM_ROUTES.FINAL,
          element: <Final />,
        },
      ],
    },
  ],
};
