import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Bienestar Financiero">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={BIENESTAR_FINANCIERO_PATHS.QUESTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
