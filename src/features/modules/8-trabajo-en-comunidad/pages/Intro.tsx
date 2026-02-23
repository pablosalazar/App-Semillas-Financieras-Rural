import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { TRABAJO_EN_COMUNIDAD_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Trabajo en Comunidad">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={TRABAJO_EN_COMUNIDAD_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
