import pinkLoader from "@/assets/images/pink.png";
import bgLoader from "@/assets/images/bg-loader.png";

export function ProgressLoader() {
  return (
    <div
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgLoader})` }}
    >
      <div className="w-4/5 max-w-[420px] flex flex-col items-center gap-6">
        {/* Piggy bank icon */}
        <img
          src={pinkLoader}
          alt=""
          className="w-28 h-auto drop-shadow-lg"
        />

        {/* Title */}
        <h2 className="text-white text-3xl font-bold tracking-wide text-center drop-shadow-lg">
          Cargando....
        </h2>

        {/* Progress Bar - light blue container */}
        <div className="w-full rounded-2xl p-1.5 bg-sky-200/80 border-2 border-white/90 shadow-md">
          {/* Dark brown track */}
          <div className="h-10 rounded-xl bg-[#5c3d1e] border-2 border-[#8b5a00] p-1 overflow-hidden">
            {/* Golden-yellow fill */}
            <div
              className="h-full rounded-lg bg-[#f0b429] border border-[#d89d1c] animate-video-load shadow-sm"
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes video-load {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-video-load {
          animation: video-load 3s normal forwards;
        }
      `}</style>
    </div>
  );
}
