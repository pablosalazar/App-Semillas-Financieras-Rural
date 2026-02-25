import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import creditProductsVideo from "../assets/videos/productos-de-creditos.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function CreditProductsVideo() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={creditProductsVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
