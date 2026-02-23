import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { YO_ME_ASEGURO_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Yo me aseguro">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={YO_ME_ASEGURO_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
