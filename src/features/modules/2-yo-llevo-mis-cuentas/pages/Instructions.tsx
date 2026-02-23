import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import instructionsVideo from "../assets/videos/instrucciones.mp4";
import { YO_LLEVO_MIS_CUENTAS_PATHS } from "../constants/paths";

export default function Instructions() {
  return (
    <ModulePageLayout title="Yo Llevo Mis Cuentas">
      <VideoPlayerCard
        src={instructionsVideo}
        nextRoute={YO_LLEVO_MIS_CUENTAS_PATHS.ACTIVITY}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
