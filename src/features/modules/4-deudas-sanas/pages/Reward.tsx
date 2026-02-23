import { useEffect, useRef } from "react";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { VideoPlayerCard } from "@/shared/components/VideoPlayerCard";
import goldVideo from "@/assets/videos/awards/gold.mp4";
import applauseSound from "@/assets/sounds/applause.mp3";

export default function Reward() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play applause sound when component mounts
  useEffect(() => {
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
  }, []);

  return (
    <ModulePageLayout title="Deudas sanas">
      <VideoPlayerCard
        src={goldVideo}
        nextRoute="/home"
        showControls={true}
        autoRedirect={false}
      />
    </ModulePageLayout>
  );
}
