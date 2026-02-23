import { useEffect, useRef } from "react";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D) => void;
  width: number;
  height: number;
  onTouch: (x: number, y: number) => void;
}

export function Canvas({ draw, width, height, onTouch }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches[0].clientX - rect.left;
    const clientY = e.touches[0].clientY - rect.top;
    onTouch(clientX, clientY);
  };

  const handleClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    onTouch(clientX, clientY);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("click", handleClick);

    let animationFrameId: number;

    const render = () => {
      draw(ctx);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("click", handleClick);
    };
  }, [draw, onTouch]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
