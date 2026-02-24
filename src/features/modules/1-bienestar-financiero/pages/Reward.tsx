import { useEffect, useRef } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import { useBienestarFinanciero } from "../context/BienestarFinancieroContext";
import { BIENESTAR_FINANCIERO_PATHS } from "../constants/paths";
import { useNavigate } from "react-router";
import goldVideo from "@/assets/videos/awards/gold.mp4";
import silverVideo from "@/assets/videos/awards/silver.mp4";
import bronzeVideo from "@/assets/videos/awards/bronze.mp4";
import applauseSound from "@/assets/sounds/applause.mp3";

function getAwardVideo(score: number): string {
  if (score >= 15) return goldVideo;
  if (score >= 7) return silverVideo;
  return bronzeVideo;
}

export default function Reward() {
  const { score } = useBienestarFinanciero();
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Redirect to questions if score is null
  useEffect(() => {
    if (score === null) {
      navigate(BIENESTAR_FINANCIERO_PATHS.QUESTIONS);
    }
  }, [score, navigate]);

  // Play applause sound when component mounts
  useEffect(() => {
    if (score !== null) {
      const audio = new Audio(applauseSound);
      audioRef.current = audio;
      audio.play().catch((error) => {
        console.error("Error playing applause sound:", error);
      });

      // Cleanup: pause and reset audio when component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }
  }, [score]);

  if (score === null) {
    return null;
  }

  const awardVideo = getAwardVideo(score);

  return (
    <ModulePageLayout title="Bienestar Financiero">
      <VideoPlayerCard
        src={awardVideo}
        nextRoute="/home"
        showControls={true}
        autoRedirect={false}
      />
    </ModulePageLayout>
  );
}
