import { ATM } from "../components/atm/ATM";
import { useState } from "react";
import insertCardVideo from "../assets/videos/insertar_tarjeta.mp4";
import { VideoPlayer } from "@/shared/components/VideoPlayer";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function InsertCard() {
  const [showVideo, setShowVideo] = useState(false);

  const config = {
    title: "Inserta tu tarjeta",
    left: [],
    right: [],
    screen: (
      <button onClick={() => setShowVideo(true)} className="btn btn-orange">
        Click aquí para <br /> insertar tu tarjeta
      </button>
    ),
  };

  return (
    <>
      {showVideo ? (
        <VideoPlayer
          src={insertCardVideo}
          nextRoute={`${ATM_BASE_PATH}/${ATM_ROUTES.DONT_REMOVE_CARD}`}
          autoRedirect={true}
        />
      ) : (
        <ATM config={config} />
      )}
    </>
  );
}
