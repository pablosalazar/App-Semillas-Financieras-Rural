import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import arrowForwardImg from "@/assets/images/controls/arrow-forward.png";
import replayImg from "@/assets/images/controls/replay.png";
import { ProgressLoader } from "@/shared/components/ProgressLoader";

interface VideoPlayerProps {
  src: string;
  nextRoute: string;
  showControls?: boolean;
  autoRedirect?: boolean;
}

export function VideoPlayer({
  src,
  nextRoute,
  showControls = false,
  autoRedirect = false,
}: VideoPlayerProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleForward = () => {
    navigate(nextRoute);
  };

  const handleVideoEnd = () => {
    if (autoRedirect) {
      navigate(nextRoute);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-50 bg-linear-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Loader - Show while video is loading */}
      {isLoading && <ProgressLoader />}

      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        controls={showControls}
        className="w-full h-full object-contain"
        autoPlay
        onEnded={handleVideoEnd}
        onLoadedData={handleLoadedData}
      >
        Your browser does not support the video tag.
      </video>

      {/* Control Buttons - Bottom Right - Only show when autoRedirect is false */}
      {!autoRedirect && (
        <div className="absolute bottom-6 right-6 flex gap-8">
          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="bg-white hover:bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-all border-2 border-(--blue) cursor-pointer"
            aria-label="Replay video"
          >
            <img src={replayImg} alt="Replay" className="w-12 h-12" />
          </button>

          {/* Forward Button - Always visible for skipping */}
          <button
            onClick={handleForward}
            className="bg-orange-500 hover:bg-orange-600 rounded-full p-2 shadow-lg hover:scale-110 transition-all border-2 border-orange-500 cursor-pointer"
            aria-label="Skip video"
          >
            <img src={arrowForwardImg} alt="Skip" className="w-12 h-12" />
          </button>
        </div>
      )}
    </div>
  );
}
