import { useEffect } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { DEUDAS_SANAS_PATHS } from "../constants/paths";
import { useAuthenticatedUser } from "@/context/AuthContext";
import { useRegisterProgress } from "../../hooks/useRegisterProgress";
import { Loader } from "@/shared/components/ui/loader/Loader";
import feedbackVideo from "../assets/videos/feedback.mp4";

export default function Feedback() {
  const user = useAuthenticatedUser();
  const { mutate: registerProgress, isPending } = useRegisterProgress();

  // Register module progress when component mounts
  useEffect(() => {
    registerProgress({
      userId: user.id,
      moduleProgress: {
        moduleId: "deudas-sanas",
        progress: 100,
      },
    });
  }, [registerProgress, user.id]);

  return (
    <ModulePageLayout title="Deudas sanas">
      {isPending && <Loader message="Guardando progreso..." />}
      <VideoPlayerCard
        src={feedbackVideo}
        nextRoute={DEUDAS_SANAS_PATHS.REWARD}
        showControls={true}
        autoRedirect={false}
      />
    </ModulePageLayout>
  );
}
