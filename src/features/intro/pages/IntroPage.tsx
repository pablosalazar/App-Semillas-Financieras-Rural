import { VideoPlayer } from "@/shared/components/VideoPlayer";
import introVideo from "@/assets/videos/intro_app.mp4";

export default function IntroPage() {
  return <VideoPlayer src={introVideo} nextRoute="/login" />;
}
