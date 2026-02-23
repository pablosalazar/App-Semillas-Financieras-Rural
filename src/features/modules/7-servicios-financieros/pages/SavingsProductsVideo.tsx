import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import savingsProductsVideo from "../assets/videos/productos-ahorro.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function SavingsProductsVideo() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={savingsProductsVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.PRODUCTS_INSURANCE}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
