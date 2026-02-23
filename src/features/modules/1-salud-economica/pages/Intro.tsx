import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { SALUD_ECONOMICA_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Salud Económica">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={SALUD_ECONOMICA_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
