import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../utils/cn";

const SingleSelectDropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  error,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const errorText = error?.message || (typeof error === "string" ? error : null);
  const [visibleError, setVisibleError] = useState(errorText);

  useEffect(() => {
    setVisibleError(errorText);
    if (errorText) {
      const timer = setTimeout(() => {
        setVisibleError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (!disabled) {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}

      <div className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full border rounded-md py-2 px-4 flex justify-between items-center text-left bg-background transition-colors focus:outline-none focus:ring",
            disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer",
            visibleError
              ? "border-red-500 focus:ring-red-200 bg-red-50"
              : "border-gray-300 hover:border-gray-400 focus:ring-primary"
          )}
          {...props}
        >
          <span className={!selectedOption ? "text-gray-400" : "text-gray-900"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              "text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-background border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-50",
                    value === option.value ? "bg-gray-50 text-primary font-medium" : "text-gray-700"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check size={16} />}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">No options available</div>
            )}
          </div>
        )}
      </div>

      {visibleError && (
        <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">
          {visibleError}
        </p>
      )}
    </div>
  );
};

export default SingleSelectDropdown;