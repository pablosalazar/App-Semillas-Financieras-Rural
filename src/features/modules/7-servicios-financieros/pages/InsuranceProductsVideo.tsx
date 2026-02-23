import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import insuranceProductsVideo from "../assets/videos/productos-de-seguro.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function InsuranceProductsVideo() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={insuranceProductsVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.FINANCIAL_CHANNELS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
