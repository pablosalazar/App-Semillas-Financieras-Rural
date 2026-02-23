import { createBrowserRouter } from "react-router";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

const router = createBrowserRouter([AuthRoutes, AppRoutes]);

export default router;
