import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import financialChannelsVideo from "../assets/videos/canales-financieros.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function FinancialChannelsVideo() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={financialChannelsVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.PRODUCTS_CREDIT}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
