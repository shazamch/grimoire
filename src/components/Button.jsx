import { cn } from "../utils/cn";

const Button = ({
  text,
  icon,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  tooltip,
  ...props
}) => {
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "bg-background border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:underline p-0",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative flex items-center justify-center gap-2 lg:px-8 md:px-4 px-2 py-2 rounded-md transition",
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed group",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="flex items-center justify-center w-5 h-5 shrink-0">
          {icon}
        </span>
      )}
      
      <span className="text-center">{text}</span>

      {disabled && tooltip && (
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition pointer-events-none">
          {tooltip}
        </span>
      )}
    </button>
  );
};

export default Button;