import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { TENTACIONES_PATHS } from "./constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Tentaciones">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={TENTACIONES_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
