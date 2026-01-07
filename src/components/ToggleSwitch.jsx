import { cn } from "../utils/cn";

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <label
      className={cn(
        "flex items-center gap-3 cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
          {...props}
        />
        <div
          className={cn(
            "w-11 h-6 rounded-full transition-colors duration-200 ease-in-out border",
            checked
              ? "bg-primary border-primary"
              : "bg-gray-200 border-gray-200 hover:bg-gray-300"
          )}
        ></div>
        <div
          className={cn(
            "absolute top-0.5 left-0.5 bg-background w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        ></div>
      </div>
      {label && <span className="text-sm font-medium text-gray-700 select-none">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;