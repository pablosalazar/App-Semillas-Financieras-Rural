import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import arrowForwardImg from "@/assets/images/controls/arrow-forward.png";
import replayImg from "@/assets/images/controls/replay.png";
import { ProgressLoader } from "@/shared/components/ProgressLoader";

interface VideoPlayerCardProps {
  src: string;
  nextRoute: string;
  showControls?: boolean;
  autoRedirect?: boolean;
}

export function VideoPlayerCard({
  src,
  nextRoute,
  showControls = false,
  autoRedirect = false,
}: VideoPlayerCardProps) {
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
    <>
      {/* Video Card - Centered */}
      <div className="flex justify-center items-center min-h-[60vh] px-4 py-8">
        <div className="bg-white/30 rounded-3xl shadow-2xl max-w-4xl w-full p-6 border border-gray-400">
          {/* Video Container with rounded corners */}
          <div className="rounded-2xl overflow-hidden shadow-md bg-black relative">
            {/* Loader - Show while video is loading */}
            {isLoading && <ProgressLoader />}

            <video
              ref={videoRef}
              src={src}
              controls={showControls}
              className="w-full h-auto"
              autoPlay
              onEnded={handleVideoEnd}
              onLoadedData={handleLoadedData}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Control Buttons - Fixed at Bottom Right of Screen - Only show when autoRedirect is false */}
      {!autoRedirect && (
        <div className="fixed bottom-8 right-8 flex gap-4 z-50">
          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="bg-white hover:bg-gray-50 rounded-full p-3 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-blue-500 cursor-pointer"
            aria-label="Replay video"
          >
            <img src={replayImg} alt="Replay" className="w-12 h-12" />
          </button>

          {/* Forward Button - Always visible for skipping */}
          <button
            onClick={handleForward}
            className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200 border-2 border-orange-600 cursor-pointer"
            aria-label="Skip video"
          >
            <img src={arrowForwardImg} alt="Skip" className="w-12 h-12" />
          </button>
        </div>
      )}
    </>
  );
}
