import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { DEUDAS_SANAS_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Deudas Sanas">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={DEUDAS_SANAS_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
