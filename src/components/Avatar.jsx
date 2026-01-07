import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "../utils/cn";

const Avatar = ({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
  variant = "circle",
  className = "",
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
  };

  const variantClasses = {
    circle: "rounded-full",
    square: "rounded-sm",
    rounded: "rounded-lg",
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden bg-gray-200 text-gray-600 font-bold uppercase shrink-0",
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.circle,
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      ) : fallback ? (
        <span>{fallback}</span>
      ) : (
        <User className="w-[50%] h-[50%]" strokeWidth={2.5} />
      )}
    </div>
  );
};

export default Avatar;