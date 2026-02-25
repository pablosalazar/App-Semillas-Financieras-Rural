import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import video from "../assets/videos/Modulo6-3.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function Video2() {
  return (
    <ModulePageLayout title="Productos y servicios financieros">
      <VideoPlayerCard
        src={video}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.VIDEO_3}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
