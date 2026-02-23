import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/Intro.mp4";

export default function Intro() {
  return (
    <ModulePageLayout title="Cajero Automático">
      <VideoPlayerCard
        src={introVideo}
        nextRoute="/modulos/cajero-automatico/inicio"
        showControls={true}
      />
    </ModulePageLayout>
  );
}
