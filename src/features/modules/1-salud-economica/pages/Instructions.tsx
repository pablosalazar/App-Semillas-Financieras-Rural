import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { SALUD_ECONOMICA_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Salud Económica">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={SALUD_ECONOMICA_PATHS.QUESTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
