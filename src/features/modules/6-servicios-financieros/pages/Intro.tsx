import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Servicios Financieros">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={SERVICIOS_FINANCIEROS_PATHS.VIDEO_1}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
