import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { TENTACIONES_PATHS } from "./constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Tentaciones">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={TENTACIONES_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
