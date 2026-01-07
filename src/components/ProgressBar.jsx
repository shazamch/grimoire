import { cn } from "../utils/cn";

const ProgressBar = ({
  progress = 0,
  label,
  showPercentage = false,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const validProgress = Math.min(100, Math.max(0, progress));

  const variants = {
    primary: "bg-primary",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-700">{validProgress}%</span>}
        </div>
      )}

      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizes[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variants[variant] || variants.primary
          )}
          style={{ width: `${validProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;