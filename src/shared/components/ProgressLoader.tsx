import coinsLoader from "@/assets/images/coins-loader.png";

export function ProgressLoader() {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#50defd] overflow-hidden flex items-center justify-center">
      <div className="w-4/5 max-w-[500px]">
        {/* Title */}
        <h2
          className="text-white text-4xl text-center mb-3 tracking-[4px] font-bold"
          style={{ textShadow: "3px 3px 1px #0367a6" }}
        >
          CARGANDO...
        </h2>

        {/* Progress Bar Container */}
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="bg-[#0367a6] rounded-full flex items-center justify-start relative px-[5px] h-[45px]">
            {/* Progress Bar Fill */}
            <div
              className="h-[35px] rounded-full bg-[#ffc105] animate-video-load"
              style={{ boxShadow: "0 10px 40px -10px #fff" }}
            />
          </div>

          {/* Coins Icon */}
          <img
            src={coinsLoader}
            alt="Loading"
            className="absolute -right-5 top-[29px] w-[100px] z-20"
          />
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes video-load {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        .animate-video-load {
          animation: video-load 3s normal forwards;
        }
      `}</style>
    </div>
  );
}
