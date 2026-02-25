import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import video from "../assets/videos/Modulo6-4.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function Video3() {
  return (
    <ModulePageLayout title="Productos y servicios financieros">
      <VideoPlayerCard
        src={video}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
