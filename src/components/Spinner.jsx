import { Loader2 } from "lucide-react";
import { cn } from "../utils/cn";

const Spinner = ({ size = "md", className = "", variant = "primary" }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const variants = {
    primary: "text-primary",
    white: "text-white",
    neutral: "text-gray-400",
  };

  const strokeWidths = {
    sm: 2.5,
    md: 2,
    lg: 2,
    xl: 2,
  };

  return (
    <Loader2
      strokeWidth={strokeWidths[size]}
      className={cn(
        "animate-spin shrink-0",
        sizes[size],
        variants[variant],
        className
      )}
    />
  );
};

export default Spinner;