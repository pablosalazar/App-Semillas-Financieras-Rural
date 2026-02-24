import type { ModuleRoutes } from "./types/modules.type";
import { bienestarFinancieroRoutes } from "./1-bienestar-financiero/routes";
import { yoLlevoMisCuentasRoutes } from "./2-yo-llevo-mis-cuentas/routes";
import { yoAhorroRoutes } from "./3-yo-ahorro/routes";
import { deudasSanasRoutes } from "./4-deudas-sanas/routes";
import { tentacionesRoutes } from "./5-tentaciones/routes";
import { yoMeAseguroRoutes } from "./6-yo-me-aseguro/routes";
import { serviciosFinancierosRoutes } from "./7-servicios-financieros/routes";
import { trabajoEnComunidadRoutes } from "./8-trabajo-en-comunidad/routes";
import { cajeroAutomaticoRoutes } from "./9-cajero-automatico/routes";
import { recomendacionesDeSeguridadRoutes } from "./10-recomendaciones-de-seguridad/routes";
import { miAprendizajeRoutes } from "./11-mi-aprendizaje/routes";

export const modules: ModuleRoutes[] = [
  bienestarFinancieroRoutes,
  yoLlevoMisCuentasRoutes,
  yoAhorroRoutes,
  deudasSanasRoutes,
  tentacionesRoutes,
  yoMeAseguroRoutes,
  serviciosFinancierosRoutes,
  trabajoEnComunidadRoutes,
  cajeroAutomaticoRoutes,
  recomendacionesDeSeguridadRoutes,
  miAprendizajeRoutes,
];

export function getModuleRoutes(): import("react-router").RouteObject[] {
  return modules.map((module) => ({
    path: `/modulos/${module.basePath}`,
    children: module.routes.map((route) => ({
      ...route,
      // Ensure paths are relative to the module base path
      path:
        route.path === ""
          ? ""
          : route.path?.startsWith("/")
            ? route.path.slice(1)
            : route.path,
    })),
  }));
}
