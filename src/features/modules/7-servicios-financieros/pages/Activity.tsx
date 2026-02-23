import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ModulePageLayout } from "@/shared/components/ModulePageLayout";
import { ProgressBar } from "@/shared/components/ProgressBar";
import { MATCHING_TERMS } from "../constants/matching-terms";
import { SERVICIOS_FINANCIEROS_PATHS } from "../constants/paths";
import successSound from "@/assets/sounds/success.ogg";
import failSound from "@/assets/sounds/fail.mp3";
import "./Activity.css";

interface MatchingTerm {
  id: string;
  category: string;
  term: string;
  description: string;
}

export default function Activity() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableTerms, setAvailableTerms] = useState<MatchingTerm[]>([]);
  const [shuffledTerms, setShuffledTerms] = useState<MatchingTerm[]>([]);
  const [draggedTerm, setDraggedTerm] = useState<string | null>(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [showFeedback, setShowFeedback] = useState<"success" | "error" | null>(
    null,
  );

  // Touch drag state
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Audio instances
  const [successAudio] = useState(new Audio(successSound));
  const [failAudio] = useState(new Audio(failSound));

  // Initialize the activity
  useEffect(() => {
    const shuffledQuestions = [...MATCHING_TERMS].sort(
      () => Math.random() - 0.5,
    );
    const shuffledOptions = [...MATCHING_TERMS].sort(() => Math.random() - 0.5);
    setShuffledTerms(shuffledQuestions);
    setAvailableTerms(shuffledOptions);
  }, []);

  const currentQuestion = shuffledTerms[currentIndex];

  // ─── Mouse / Desktop drag handlers ───────────────────────────────────────────

  const handleDragStart = (termId: string) => {
    setDraggedTerm(termId);
  };

  const handleDragEnd = () => {
    setDraggedTerm(null);
    setIsDropZoneActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };

  const handleDragLeave = () => {
    setIsDropZoneActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(false);
    processAnswer(draggedTerm);
    setDraggedTerm(null);
  };

  // ─── Touch / Mobile drag handlers ────────────────────────────────────────────

  const createGhost = (label: string, x: number, y: number, width: number) => {
    const ghost = document.createElement("div");
    ghost.textContent = label;
    ghost.className = "term-card-compact touch-ghost";
    ghost.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${width}px;
      transform: translate(-50%, -50%) scale(1.05);
      z-index: 9999;
      pointer-events: none;
      opacity: 0.85;
    `;
    document.body.appendChild(ghost);
    ghostRef.current = ghost;
  };

  const removeGhost = () => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }
  };

  const isOverDropZone = (x: number, y: number): boolean => {
    if (!dropZoneRef.current) return false;
    const rect = dropZoneRef.current.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };

  const setDropZoneHighlight = (active: boolean) => {
    dropZoneRef.current?.classList.toggle("active", active);
  };

  const handleTouchStart = (
    termId: string,
    label: string,
    e: React.TouchEvent,
  ) => {
    const touch = e.touches[0];
    const cardEl = e.currentTarget as HTMLElement;
    setDraggedTerm(termId);
    createGhost(label, touch.clientX, touch.clientY, cardEl.offsetWidth);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    // Direct DOM updates — no React re-render, no lag
    if (ghostRef.current) {
      ghostRef.current.style.left = `${touch.clientX}px`;
      ghostRef.current.style.top = `${touch.clientY}px`;
    }
    setDropZoneHighlight(isOverDropZone(touch.clientX, touch.clientY));
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const overDropZone = isOverDropZone(touch.clientX, touch.clientY);

    removeGhost();
    setDropZoneHighlight(false);

    if (overDropZone) {
      processAnswer(draggedTerm);
    }

    setDraggedTerm(null);
  };

  // ─── Shared answer logic ──────────────────────────────────────────────────────

  const processAnswer = (termId: string | null) => {
    if (!termId || !currentQuestion) return;

    const isCorrect = termId === currentQuestion.id;

    if (isCorrect) {
      setShowFeedback("success");
      successAudio.play();
      setAvailableTerms((prev) => prev.filter((t) => t.id !== termId));

      setTimeout(() => {
        setShowFeedback(null);
        if (currentIndex < shuffledTerms.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          navigate(SERVICIOS_FINANCIEROS_PATHS.FEEDBACK);
        }
      }, 1500);
    } else {
      setShowFeedback("error");
      failAudio.play();
      setTimeout(() => setShowFeedback(null), 1500);
    }
  };

  if (!currentQuestion) {
    return (
      <ModulePageLayout title="Servicios Financieros">
        <div className="activity-loading">Cargando actividad...</div>
      </ModulePageLayout>
    );
  }

  return (
    <ModulePageLayout title="Servicios Financieros">
      <div className="activity-container-compact">
        <ProgressBar
          current={currentIndex + 1}
          total={shuffledTerms.length}
          showText={true}
          label="Pregunta"
          className="max-w-3xl mx-auto mb-6"
        />

        <div className="max-w-5xl mx-auto w-full flex-1">
          <div className="bg-white rounded-3xl shadow-xl p-8 border-3 border-(--blue)">
            {/* Drop Zone */}
            <div
              ref={dropZoneRef}
              className={`drop-zone-compact ${isDropZoneActive ? "active" : ""} ${
                showFeedback ? `feedback-${showFeedback}` : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {showFeedback === "success" && (
                <div className="feedback-icon-compact success w-5xl text-center">
                  ✓
                </div>
              )}
              {showFeedback === "error" && (
                <div className="feedback-icon-compact error w-5xl text-center">
                  ✗
                </div>
              )}
              {!showFeedback && (
                <p className="drop-zone-text w-5xl">
                  {currentQuestion.description}
                </p>
              )}
            </div>

            {/* Draggable Terms Grid */}
            <div className="terms-grid-compact">
              {availableTerms.map((term) => (
                <div
                  key={term.id}
                  draggable
                  onDragStart={() => handleDragStart(term.id)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(term.id, term.term, e)}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={`term-card-compact ${draggedTerm === term.id ? "dragging" : ""}`}
                >
                  {term.term}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModulePageLayout>
  );
}
