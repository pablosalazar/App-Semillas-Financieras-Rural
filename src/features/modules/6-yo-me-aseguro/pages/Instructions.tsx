import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { YO_ME_ASEGURO_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Yo Me Aseguro">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={YO_ME_ASEGURO_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
