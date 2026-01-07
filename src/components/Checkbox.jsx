import { Check } from "lucide-react";
import { cn } from "../utils/cn";

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  description,
  className,
  ...props
}) => {
  return (
    <label
      className={cn(
        "flex items-start gap-3 cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border rounded flex items-center justify-center transition-all peer-focus:ring-2 peer-focus:ring-primary/20",
            checked
              ? "bg-primary border-primary text-white"
              : "bg-background border-gray-300 group-hover:border-gray-400"
          )}
        >
          <Check
            size={14}
            strokeWidth={3}
            className={cn(checked ? "opacity-100" : "opacity-0")}
          />
        </div>
      </div>

      <div className="text-sm">
        <span className="font-medium text-gray-700 select-none">{label}</span>
        {description && (
          <p className="text-gray-500 mt-0.5 font-normal leading-tight">
            {description}
          </p>
        )}
      </div>
    </label>
  );
};

export default Checkbox;