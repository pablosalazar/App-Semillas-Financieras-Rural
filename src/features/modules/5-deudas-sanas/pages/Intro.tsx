import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { DEUDAS_SANAS_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Deudas Sanas">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={DEUDAS_SANAS_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
