import bienestarFinancieroImg from "@/assets/images/modules/bienestar_financiero.png";
import yoLlevoMisCuentasImg from "@/assets/images/modules/yo-llevo-mis-cuentas.png";
import yoAhorroImg from "@/assets/images/modules/yo-ahorro.png";
import tentacionesImg from "@/assets/images/modules/tentaciones.png";
import deudasSanasImg from "@/assets/images/modules/deudas-sanas.png";
import serviciosFinancierosImg from "@/assets/images/modules/servicios-financieros.png";
import cajeroAutomaticoImg from "@/assets/images/modules/cajero-automatico.png";
// import sistemaFinancieroImg from "@/assets/images/modules/sistema_financiero.png";
// import prevencionFraudesImg from "@/assets/images/modules/prevencion_de_fraudes_linea.png";
// import yoMeProtejoImg from "@/assets/images/modules/yo-me-protejo.png";
// import finanzasEnFamiliaImg from "@/assets/images/modules/finanzas_en_familia.png";

export interface ModulePath {
  id: string;
  name: string;
  path: string;
  image: string;
}

export const MODULES_PATH: ModulePath[] = [
  {
    id: "bienestar-financiero",
    name: "Bienestar financiero",
    path: "/modulos/bienestar-financiero",
    image: bienestarFinancieroImg,
  },
  {
    id: "yo-llevo-mis-cuentas",
    name: "Yo llevo mis cuentas",
    path: "/modulos/yo-llevo-mis-cuentas",
    image: yoLlevoMisCuentasImg,
  },
  {
    id: "yo-ahorro",
    name: "Yo ahorro",
    path: "/modulos/yo-ahorro",
    image: yoAhorroImg,
  },
  {
    id: "tentaciones",
    name: "Tentaciones",
    path: "/modulos/tentaciones",
    image: tentacionesImg,
  },
  {
    id: "deudas-sanas",
    name: "Deudas sanas",
    path: "/modulos/deudas-sanas",
    image: deudasSanasImg,
  },
  {
    id: "productos-y-servicios-financieros",
    name: "Productos y servicios financieros",
    path: "/modulos/productos-y-servicios-financieros",
    image: serviciosFinancierosImg,
  },
  {
    id: "cajero-automatico",
    name: "Simulador Cajero Automático",
    path: "/modulos/cajero-automatico",
    image: cajeroAutomaticoImg,
  },
  // {
  //   id: "sistema-financiero",
  //   name: "Sistema Financiero",
  //   path: "/modulos/sistema-financiero",
  //   image: sistemaFinancieroImg,
  // },
  // {
  //   id: "prevencion-de-fraudes-y-estafas-en-linea",
  //   name: "Prevención de fraudes y estafas en línea",
  //   path: "/modulos/prevencion-de-fraudes-y-estafas-en-linea",
  //   image: prevencionFraudesImg,
  // },
  // {
  //   id: "yo-me-protejo",
  //   name: "Yo me protejo",
  //   path: "/modulos/yo-me-protejo",
  //   image: yoMeProtejoImg,
  // },
  // {
  //   id: "finanzas-en-familia",
  //   name: "Finanzas en familia",
  //   path: "/modulos/finanzas-en-familia",
  //   image: finanzasEnFamiliaImg,
  // },
];
