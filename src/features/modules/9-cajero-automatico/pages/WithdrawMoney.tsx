import { VideoPlayer } from "@/shared/components/VideoPlayer";
import withdrawVideo from "../assets/videos/retirar_dinero_sin_recibo.mp4";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";
import { useEffect, useState } from "react";
import { ATM } from "../components/atm/ATM";

export default function WithdrawMoney() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  }, []);

  const config = {
    title: "TRANSICIÓN EN PROCESO ESPERE UN MOMENTO POR FAVOR...",

    left: [],
    right: [],
  };
  return (
    <>
      {showVideo ? (
        <VideoPlayer
          src={withdrawVideo}
          nextRoute={`${ATM_BASE_PATH}/${ATM_ROUTES.SCREEN_OR_RECEIPT}`}
          autoRedirect
        />
      ) : (
        <ATM config={config} />
      )}
    </>
  );
}
