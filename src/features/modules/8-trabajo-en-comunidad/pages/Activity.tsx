import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { Canvas } from "../game/Canvas";
import { createImage } from "../game/helpers";
import {
  Character,
  Worker,
  Platform,
  Pool,
  WaterMeter,
  Indicator,
  Clock,
} from "../game/models";
import {
  SCREEN,
  GAME_SPEED,
  WORKER_SWITCH_INTERVAL,
  CLOCK_TICK_INTERVAL,
  MAX_POOL_LEVEL,
  MAX_CLOCK_TICKS,
} from "../game/constants";
import { TRABAJO_EN_COMUNIDAD_PATHS } from "../constants/paths";

// Import assets
import backgroundImg from "../assets/images/background.png";
import personaje01Img from "../assets/images/personaje_01.png";
import personaje02Img from "../assets/images/personaje_02.png";
import personaje03Img from "../assets/images/personaje_03.png";
import personaje04Img from "../assets/images/personaje_04.png";
import personaje05Img from "../assets/images/personaje_05.png";
import piletaImg from "../assets/images/pileta.png";
import aguaImg from "../assets/images/agua.png";
import indicadorImg from "../assets/images/indicador.png";
import clockImg from "../assets/images/clock.png";

import successAudio from "../assets/sounds/success.ogg";
import gameAudio from "../assets/sounds/bg-audio-game.mpeg";
import clockAudio from "../assets/sounds/clock.mpeg";

interface GameAssets {
  images: HTMLImageElement[];
  audios: HTMLAudioElement[];
}

export default function Activity() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState<GameAssets | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const gameRef = useRef({
    currentWorker: 0,
    platform: null as Platform | null,
    character: null as Character | null,
    pool: null as Pool | null,
    waterMeter: null as WaterMeter | null,
    indicator: null as Indicator | null,
    clock: null as Clock | null,
    workers: [] as Worker[],
  });

  const intervalsRef = useRef({
    workerSwitch: null as NodeJS.Timeout | null,
    clockTick: null as NodeJS.Timeout | null,
  });

  const touchPosRef = useRef<{ x: number; y: number } | null>(null);

  // Load assets
  useEffect(() => {
    const loadAssets = async () => {
      const imagesPromises = [
        createImage(backgroundImg),
        createImage(personaje01Img),
        createImage(personaje02Img),
        createImage(personaje03Img),
        createImage(personaje04Img),
        createImage(personaje05Img),
        createImage(piletaImg),
        createImage(aguaImg),
        createImage(indicadorImg),
        createImage(clockImg),
      ];

      const audios = [
        new Audio(successAudio),
        new Audio(gameAudio),
        new Audio(clockAudio),
      ];

      const images = await Promise.all(imagesPromises);
      setAssets({ images, audios });
    };

    loadAssets();
  }, []);

  // Initialize game objects when assets are loaded
  useEffect(() => {
    if (!assets) return;

    const { images } = assets;

    gameRef.current.platform = new Platform({ x: 0, y: 0, image: images[0] });
    gameRef.current.character = new Character({
      x: 550,
      y: 220,
      image: images[1],
    });
    gameRef.current.pool = new Pool({ x: 580, y: 90, image: images[6] });
    gameRef.current.waterMeter = new WaterMeter({
      x: 1160,
      y: 100,
      image: images[7],
    });
    gameRef.current.indicator = new Indicator({
      x: -100,
      y: -100,
      image: images[8],
    });
    gameRef.current.clock = new Clock({ x: 20, y: 10, image: images[9] });

    gameRef.current.workers = [
      new Worker({
        x: 300,
        y: 100,
        image: images[2],
        workPositionX: 550,
        workPositionY: 100,
      }),
      new Worker({
        x: 230,
        y: 400,
        image: images[3],
        workPositionX: 550,
        workPositionY: 150,
      }),
      new Worker({
        x: 500,
        y: 450,
        image: images[4],
        workPositionX: 550,
        workPositionY: 300,
      }),
      new Worker({
        x: 550,
        y: 50,
        image: images[5],
        workPositionX: 550,
        workPositionY: 350,
      }),
    ];
  }, [assets]);

  // Start game intervals
  useEffect(() => {
    if (!isPlaying || !assets) return;

    const { audios } = assets;

    // Start background music
    if (audios[1].paused) {
      audios[1].volume = 0.4;
      audios[0].volume = 0.4;
      audios[1].loop = true;
      audios[1].play();
    }

    // Worker switch interval
    intervalsRef.current.workerSwitch = setInterval(() => {
      gameRef.current.currentWorker++;
      if (gameRef.current.currentWorker === 4) {
        gameRef.current.currentWorker = 0;
      }
    }, WORKER_SWITCH_INTERVAL);

    // Clock tick interval
    intervalsRef.current.clockTick = setInterval(() => {
      if (gameRef.current.clock) {
        gameRef.current.clock.frame++;
        audios[2].currentTime = 0;
        audios[2].play();
      }
    }, CLOCK_TICK_INTERVAL);

    return () => {
      if (intervalsRef.current.workerSwitch) {
        clearInterval(intervalsRef.current.workerSwitch);
      }
      if (intervalsRef.current.clockTick) {
        clearInterval(intervalsRef.current.clockTick);
      }
    };
  }, [isPlaying, assets]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (assets) {
        assets.audios.forEach((audio) => {
          audio.pause();
          audio.currentTime = 0;
        });
      }
    };
  }, [assets]);

  const handleTouch = useCallback((x: number, y: number) => {
    touchPosRef.current = { x, y };
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!assets) return;

      const { width, height } = ctx.canvas;
      const { audios } = assets;
      const {
        platform,
        character,
        pool,
        waterMeter,
        indicator,
        clock,
        workers,
        currentWorker,
      } = gameRef.current;

      if (
        !platform ||
        !character ||
        !pool ||
        !waterMeter ||
        !indicator ||
        !clock
      )
        return;

      // Clear canvas
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      // Always draw static background elements
      platform.draw(ctx);
      pool.draw(ctx);
      waterMeter.draw(ctx);
      clock.draw(ctx);

      // Draw workers in their initial positions
      workers.forEach((worker) => {
        worker.draw(ctx);
      });

      // Only run game logic when playing
      if (!isPlaying) {
        // Draw character in initial position when not playing
        character.draw(ctx);
        return;
      }

      // Draw character (will be animated when playing)
      character.draw(ctx);

      // Show indicator above current worker
      if (workers[currentWorker] && !workers[currentWorker].active) {
        indicator.draw(ctx);
      }

      // Move main character
      character.position.x += GAME_SPEED * character.direction;

      if (character.position.x < 200 || character.position.x > 620) {
        if (character.position.x > 620 && pool.frame < MAX_POOL_LEVEL) {
          audios[0].currentTime = 0;
          audios[0].play();
          if (platform.frame < 8) {
            platform.frame++;
          }
          pool.frame++;
        }
        character.direction = character.direction * -1;
      }

      // Handle workers
      workers.forEach((worker, i) => {
        worker.draw(ctx);

        // Check if worker should be activated (with expanded clickable area)
        if (touchPosRef.current && !worker.active) {
          const { x, y } = touchPosRef.current;
          const clickPadding = 20; // Extra pixels around worker for easier clicking

          if (
            x > worker.position.x - clickPadding &&
            x < worker.position.x + worker.width + clickPadding &&
            y > worker.position.y - clickPadding &&
            y < worker.position.y + worker.height + clickPadding &&
            currentWorker === i
          ) {
            worker.active = true;
            worker.position.x = worker.workPositionX;
            worker.position.y = worker.workPositionY;
          }
        }

        // Move active workers
        if (worker.active) {
          worker.position.x += GAME_SPEED * worker.direction;
          if (worker.position.x < 200 || worker.position.x > 620) {
            if (worker.position.x > 620 && pool.frame < MAX_POOL_LEVEL) {
              audios[0].currentTime = 0;
              audios[0].play();
              if (platform.frame < 8) {
                platform.frame++;
              }
              pool.frame++;
              worker.active = false;
              worker.resetPosition();
            }
            worker.direction = worker.direction * -1;
          }
        }

        waterMeter.frame = Math.floor(pool.frame / 2) + 1;
      });

      // Update indicator position
      if (currentWorker <= 3) {
        indicator.position = {
          x: workers[currentWorker].position.x + 20,
          y: workers[currentWorker].position.y - 30,
        };
      } else {
        indicator.position = { x: -100, y: -100 };
      }

      // Clear touch position
      touchPosRef.current = null;

      // Check win condition
      if (pool.frame >= MAX_POOL_LEVEL) {
        setIsPlaying(false);
        setHasWon(true);
        setTimeout(() => {
          navigate(TRABAJO_EN_COMUNIDAD_PATHS.FEEDBACK);
        }, 800);
      }

      // Check lose condition
      if (clock.frame >= MAX_CLOCK_TICKS) {
        setIsPlaying(false);
        setHasLost(true);

        // Pause all audio
        audios.forEach((audio) => {
          audio.pause();
        });

        if (intervalsRef.current.workerSwitch) {
          clearInterval(intervalsRef.current.workerSwitch);
        }
        if (intervalsRef.current.clockTick) {
          clearInterval(intervalsRef.current.clockTick);
        }
      }
    },
    [assets, isPlaying, navigate]
  );

  const handleStartGame = () => {
    // Reset game state
    if (gameRef.current.pool) gameRef.current.pool.frame = 0;
    if (gameRef.current.clock) gameRef.current.clock.frame = 0;
    if (gameRef.current.platform) gameRef.current.platform.frame = 0;
    gameRef.current.currentWorker = 0;
    gameRef.current.workers.forEach((worker) => {
      worker.active = false;
      worker.resetPosition();
    });

    setIsPlaying(true);
    setHasLost(false);
    setHasWon(false);
  };

  const handleRetry = () => {
    handleStartGame();
  };

  const handleContinue = () => {
    navigate(TRABAJO_EN_COMUNIDAD_PATHS.FEEDBACK);
  };

  if (!assets) {
    return (
      <ModulePageLayout title="Trabajo en Comunidad">
        <div className="flex items-center justify-center min-h-[600px]">
          <div className="text-xl font-semibold text-gray-600">
            Cargando juego...
          </div>
        </div>
      </ModulePageLayout>
    );
  }

  return (
    <ModulePageLayout title="Trabajo en Comunidad">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative rounded-4xl overflow-hidden border-4 border-(--blue) shadow-lg">
          {!isPlaying && !hasWon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-3xl">
              {!hasLost ? (
                <button
                  onClick={handleStartGame}
                  className="btn btn-orange text-xl px-8 py-4"
                >
                  Empezar juego
                </button>
              ) : (
                <div className="text-center space-y-6 px-8">
                  <p className="text-white text-lg leading-relaxed max-w-md">
                    Para lograr un bienestar social en la comunidad, se requiere
                    del trabajo en equipo coordinado para lograr alcanzar las
                    metas trazadas.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleRetry}
                      className="btn btn-orange text-lg px-6 py-3"
                    >
                      Reintentar
                    </button>
                    <button
                      onClick={handleContinue}
                      className="btn btn-blue text-lg px-6 py-3"
                    >
                      Avanzar
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
            onTouch={handleTouch}
          />
        </div>
      </div>
    </ModulePageLayout>
  );
}
