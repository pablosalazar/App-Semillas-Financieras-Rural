import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import introVideo from "../assets/videos/intro.mp4";
import { YO_LLEVO_MIS_CUENTAS_PATHS } from "../constants/paths";

export default function Intro() {
  return (
    <ModulePageLayout title="Yo llevo mis cuentas">
      <VideoPlayerCard
        src={introVideo}
        nextRoute={YO_LLEVO_MIS_CUENTAS_PATHS.INSTRUCTIONS}
        showControls={true}
      />
    </ModulePageLayout>
  );
}
