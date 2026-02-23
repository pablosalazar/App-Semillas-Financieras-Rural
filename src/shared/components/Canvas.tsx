import { useEffect, useRef } from "react";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
  commands?: {
    up?: { pressed: boolean };
    play?: boolean;
  };
}

export default function Canvas({ draw, width, height, commands }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      draw(ctx);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !commands) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (commands.up) {
          commands.up.pressed = true;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (commands.up) {
          commands.up.pressed = false;
        }
      }
    };

    const handleClick = () => {
      if (commands.up) {
        commands.up.pressed = true;
        // Release after a short delay to simulate key press
        setTimeout(() => {
          if (commands.up) {
            commands.up.pressed = false;
          }
        }, 100);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (commands.up) {
        commands.up.pressed = true;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      if (commands.up) {
        commands.up.pressed = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [commands]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-auto rounded-3xl border-3 border-(--blue)"
    />
  );
}
