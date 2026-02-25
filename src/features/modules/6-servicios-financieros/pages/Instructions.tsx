import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
