import { VideoPlayer } from "@/shared/components/VideoPlayer";
import printReceiptVideo from "../assets/videos/retirar_recibo.mp4";
import { ATM_BASE_PATH, ATM_ROUTES } from "../constants/atm";

export default function PrintReceipt() {
  return (
    <VideoPlayer
      src={printReceiptVideo}
      nextRoute={`${ATM_BASE_PATH}/${ATM_ROUTES.FINAL}`}
      autoRedirect={true}
    />
  );
}
