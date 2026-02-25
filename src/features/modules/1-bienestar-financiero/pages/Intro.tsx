import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Bienestar Financiero">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={BIENESTAR_FINANCIERO_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
