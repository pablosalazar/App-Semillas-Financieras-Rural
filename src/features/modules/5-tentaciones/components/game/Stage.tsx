import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { RotateCcw, ChevronRight } from "lucide-react";
import Canvas from "@/shared/components/Canvas";
import { GRAVITY, JUMP, SCREEN, SPEED } from "./constants/defaultValues";
import Board from "./models/Board";
import { getItems } from "./itemsData";
import Platform from "./models/Platform";
import Player from "./models/Player";
import { TENTACIONES_PATHS } from "../../pages/constants/paths";

interface Commands {
  up: { pressed: boolean };
  play: boolean;
}

interface Assets {
  images: HTMLImageElement[];
  audios: HTMLAudioElement[];
}

let score = {
  gustos: 0,
  gastos: 0,
  vidas: 3,
};

const commands: Commands = {
  up: {
    pressed: false,
  },
  play: false,
};

function collisionDetection(
  a: { position: { x: number; y: number }; width: number; height: number },
  b: { position: { x: number; y: number }; width: number; height: number }
) {
  return (
    a.position.x < b.position.x + b.width / 2 &&
    a.position.x + a.width / 2 > b.position.x &&
    a.position.y < b.position.y + b.height / 2 &&
    a.position.y + a.height / 2 > b.position.y
  );
}

interface StageProps {
  assets: Assets;
}

const Stage = ({ assets }: StageProps) => {
  const [play, setPlay] = useState(false);
  const [lost, setLost] = useState(false);
  const navigate = useNavigate();
  const audioStartedRef = useRef(false);
  const audioUnlockedRef = useRef(false);

  const { images, audios } = assets;
  let scrollOffset = 0;

  const platforms: Platform[] = [];
  for (let i = 0; i < 6; i++) {
    platforms.push(
      new Platform({
        x: i * 2664,
        y: 0,
        image: images[0],
      })
    );
  }

  const sky = new Platform({
    x: 0,
    y: 0,
    image: images[1],
  });

  const items = getItems(images);

  const player = new Player({ image: images[2] });

  const board = new Board({ score, images });

  // Helper function to safely play audio on tablets
  const playSound = async (audio: HTMLAudioElement) => {
    try {
      // Ensure audio is loaded before playing
      if (audio.readyState < 2) {
        // Audio not ready, try to load it
        audio.load();
        // Wait a bit for it to load
        await new Promise((resolve) => {
          const onCanPlay = () => {
            audio.removeEventListener("canplay", onCanPlay);
            resolve(undefined);
          };
          audio.addEventListener("canplay", onCanPlay);
          // Timeout after 1 second to prevent hanging
          setTimeout(() => {
            audio.removeEventListener("canplay", onCanPlay);
            resolve(undefined);
          }, 1000);
        });
      }

      // Reset audio to start
      audio.currentTime = 0;

      // Create a promise-based play to handle autoplay restrictions
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
      }
    } catch (error) {
      // Silently handle autoplay restrictions on tablets
      console.warn("Audio playback prevented:", error);
    }
  };

  // Unlock audio context on first user interaction (required for tablets)
  const unlockAudio = async () => {
    if (!audioUnlockedRef.current) {
      try {
        // Play and immediately pause all audio to unlock them
        for (const audio of audios) {
          audio.muted = true;
          await audio.play();
          audio.pause();
          audio.muted = false;
          audio.currentTime = 0;
        }
        audioUnlockedRef.current = true;
      } catch (error) {
        console.warn("Audio unlock failed:", error);
      }
    }
  };

  const resetGame = () => {
    score = {
      gustos: 0,
      gastos: 0,
      vidas: 3,
    };

    // Remove event listeners and stop audio
    const gameAudio = audios[0];
    gameAudio.pause();
    gameAudio.currentTime = 0;
    // Clone the audio to remove all event listeners
    const newGameAudio = gameAudio.cloneNode() as HTMLAudioElement;
    newGameAudio.src = gameAudio.src;
    newGameAudio.preload = "auto";
    audios[0] = newGameAudio;

    // Stop other audio
    audios[1].pause();
    audios[1].currentTime = 0;
    audios[2].pause();
    audios[2].currentTime = 0;

    // Reset audio started flag
    audioStartedRef.current = false;
  };

  const movePlayer = () => {
    player.frames++;
    if (player.frames >= player.totalFrames) {
      player.frames = 0;
    }

    player.position.x += player.velocity.x;
    player.position.y += player.velocity.y;

    if (
      player.position.y + player.height + player.velocity.y + 50 <
      SCREEN.height
    ) {
      player.velocity.y += GRAVITY;
      player.frames = 5;
      player.jump = 1;
    } else {
      player.velocity.y = 0;
      player.jump = 0;
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    sky.draw(ctx);
    platforms.forEach((platform) => {
      platform.draw(ctx);
    });

    items.forEach((item) => item.draw(ctx));

    player.draw(ctx);

    board.draw(ctx);

    if (commands.up.pressed && player.position.y > 0) {
      player.velocity.y = -JUMP;
    }

    if (commands.play) {
      // Audio is handled separately, not in draw loop

      if (scrollOffset < 13000) {
        if (player.position.x < (SCREEN.width - player.width) / 2) {
          player.velocity.x = SPEED;
        } else {
          player.velocity.x = 0;

          scrollOffset += SPEED;

          platforms.forEach((platform) => {
            platform.position.x -= SPEED;
          });

          items.forEach((item) => {
            item.position.x -= SPEED;
          });
        }
      } else {
        commands.play = false;
        setTimeout(() => {
          resetGame();
          setPlay(false);
          setLost(true);
        }, 1000);
      }
      movePlayer();

      // colision
      items.forEach((item) => {
        if (collisionDetection(player, item)) {
          if (item.recolected === false) {
            if (item.type === "gastos") {
              score.gastos++;
              // Use playSound helper for better tablet compatibility
              playSound(audios[1]);
            } else if (item.type === "gustos") {
              score.gustos++;
              if (score.gastos < 15) {
                score.vidas--;
              }
              // Use playSound helper for better tablet compatibility
              playSound(audios[2]);
            }
          }

          item.recolected = true;
        }
      });

      if (score.vidas <= 0) {
        commands.play = false;
        setTimeout(() => {
          resetGame();
          setPlay(false);
          setLost(true);
        }, 1000);
      }

      if (score.gustos + score.gastos >= 20) {
        commands.play = false;
        setTimeout(() => {
          navigate(TENTACIONES_PATHS.FEEDBACK);
        }, 1000);
      }
    }
  };

  // Handle game audio separately from draw loop
  useEffect(() => {
    if (play && !audioStartedRef.current) {
      const gameAudio = audios[0];
      gameAudio.volume = 0.5;
      gameAudio.loop = true;

      const playAudio = async () => {
        try {
          // Wait for audio to be fully buffered to prevent loop issues
          if (gameAudio.readyState < 3) {
            // Wait for HAVE_FUTURE_DATA (readyState 3) or HAVE_ENOUGH_DATA (readyState 4)
            await new Promise((resolve) => {
              const onCanPlayThrough = () => {
                gameAudio.removeEventListener(
                  "canplaythrough",
                  onCanPlayThrough
                );
                resolve(undefined);
              };
              gameAudio.addEventListener("canplaythrough", onCanPlayThrough);
              // Fallback timeout
              setTimeout(() => {
                gameAudio.removeEventListener(
                  "canplaythrough",
                  onCanPlayThrough
                );
                resolve(undefined);
              }, 2000);
            });
          }
          await gameAudio.play();
        } catch (error) {
          console.error("Error playing game audio:", error);
        }
      };

      // Always load the audio first to ensure it's ready
      gameAudio.load();
      playAudio();

      audioStartedRef.current = true;
    } else if (!play && audioStartedRef.current) {
      // Stop audio when game stops
      audios[0].pause();
      audios[0].currentTime = 0;
      audioStartedRef.current = false;
    }
  }, [play, audios]);

  useEffect(() => {
    return () => {
      commands.play = false;
      score = {
        gustos: 0,
        gastos: 0,
        vidas: 3,
      };
      audios.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
      audioStartedRef.current = false;
    };
  }, [audios]);

  return (
    <div className="relative">
      {play === false && (
        <div className="absolute inset-0 bg-black/50 flex justify-center items-center z-10 rounded-3xl">
          {!lost ? (
            <button
              className="btn btn-orange"
              onClick={async () => {
                // Unlock audio on first user interaction
                await unlockAudio();
                setPlay(true);
                commands.play = true;
              }}
            >
              Empezar juego
            </button>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-white text-xl">
                Recuerde, lo mas importante son los Gastos...
              </p>
              <p className="text-white text-xl">!Luego dese sus Gustos!</p>
              <div className="flex gap-4 justify-center">
                <button
                  className="btn btn-blue flex items-center gap-2"
                  onClick={async () => {
                    // Unlock audio on user interaction
                    await unlockAudio();
                    commands.play = true;
                    resetGame();
                    setPlay(true);
                    setLost(false);
                  }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Reintentar
                </button>
                <button
                  className="btn btn-orange flex items-center gap-2"
                  onClick={() => {
                    navigate(TENTACIONES_PATHS.FEEDBACK);
                  }}
                >
                  Avanzar
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <Canvas
        draw={draw}
        width={SCREEN.width}
        height={SCREEN.height}
        commands={commands}
      />
    </div>
  );
};

export default Stage;
