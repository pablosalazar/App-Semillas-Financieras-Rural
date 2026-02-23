import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { RECOMENDACIONES_DE_SEGURIDAD_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Recomendaciones de Seguridad">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={RECOMENDACIONES_DE_SEGURIDAD_PATHS.FEEDBACK}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
