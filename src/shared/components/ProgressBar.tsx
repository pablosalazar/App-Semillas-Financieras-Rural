interface ProgressBarProps {
  /** Current progress value */
  current: number;
  /** Maximum/total value */
  total: number;
  /** Optional custom class name for the container */
  className?: string;
  /** Optional: Show percentage text above the bar */
  showText?: boolean;
  /** Optional: Custom label text (e.g., "Pregunta", "Módulo") */
  label?: string;
}

export function ProgressBar({
  current,
  total,
  className = "",
  showText = false,
  label,
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`w-full ${className}`}>
      {showText && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            {label
              ? `${label} ${current} de ${total}`
              : `${current} de ${total}`}
          </span>
          <span className="text-sm font-semibold text-gray-600">
            {percentage}%
          </span>
        </div>
      )}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-(--orange) to-(--orange-light) transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
