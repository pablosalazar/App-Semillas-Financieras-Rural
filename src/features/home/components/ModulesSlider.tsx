import { useState } from "react";
import { getModulesWithStatus } from "@/shared/utils/modulePath.helpers";
import { useLearningProgressContext } from "@/context";
import arrowLeftImg from "@/assets/images/controls/arrow-left.png";
import arrowRightImg from "@/assets/images/controls/arrow-right.png";
import { Link } from "react-router";
import { Lock } from "lucide-react";

export function ModulesSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { learningProgress } = useLearningProgressContext();

  // Get modules with their unlock status (all enabled)
  const modulesWithStatus = getModulesWithStatus(learningProgress ?? null).map(
    (m) => ({ ...m, isUnlocked: true })
  );

  // Split modules into slides: first 6, then remaining 5
  const slides = [
    modulesWithStatus.slice(0, 6), // Slide 1: modules 1-6
    modulesWithStatus.slice(6), // Slide 2: modules 7-11
  ];

  // Minimum swipe distance (in pixels) to trigger slide change
  const minSwipeDistance = 50;

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPrevSlide();
    }

    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="relative w-full">
      {/* Slider Container */}
      <div className="overflow-hidden max-w-4xl mx-auto -mt-[100px]">
        <div
          className="flex transition-transform duration-500 ease-in-out touch-pan-y "
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slideModules, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-3 gap-6 px-10"
            >
              {slideModules.map((module) => (
                <div key={module.id} className="relative">
                  {module.isUnlocked ? (
                    <Link to={module.path}>
                      <img
                        src={module.image}
                        alt={module.name}
                        title={module.name}
                      />
                    </Link>
                  ) : (
                    <div
                      className="relative cursor-not-allowed"
                      title="Completa el módulo anterior para desbloquear"
                    >
                      <img
                        src={module.image}
                        alt={module.name}
                        className="grayscale opacity-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/60 rounded-full p-4">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2  transition-all ${currentSlide === 0
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:scale-110"
          }`}
        aria-label="Previous slide"
      >
        <img
          src={arrowLeftImg}
          alt="Previous"
          className={`w-16 h-16 ${currentSlide === 0 ? "grayscale" : ""}`}
        />
      </button>

      <button
        onClick={goToNextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2  transition-all ${currentSlide === slides.length - 1
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:scale-110"
          }`}
        aria-label="Next slide"
      >
        <img
          src={arrowRightImg}
          alt="Next"
          className={`w-16 h-16 ${currentSlide === slides.length - 1 ? "grayscale" : ""
            }`}
        />
      </button>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index
              ? "bg-(--blue) w-8"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
