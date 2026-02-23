import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { YO_AHORRO_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Yo Ahorro">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={YO_AHORRO_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
