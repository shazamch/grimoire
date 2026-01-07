import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Check } from "lucide-react";

const MultiSelectDropdown = ({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = "Select options",
  error,
  disabled = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Error handling logic matching your Input component
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

  const toggleOption = (optionValue) => {
    if (disabled) return;
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeValue = (e, valToRemove) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(value.filter((v) => v !== valToRemove));
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}

      <div className="relative w-full">
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`
            w-full border rounded-md py-2 px-3 min-h-10 flex justify-between items-center bg-background transition-colors cursor-pointer
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
            ${isOpen ? "ring ring-primary border-gray-300" : ""}
            ${
              visibleError
                ? "border-red-500 ring-red-200 bg-red-50"
                : "border-gray-300 hover:border-gray-400"
            }
          `}
          {...props}
        >
          <div className="flex flex-wrap gap-1.5 flex-1">
            {value.length > 0 ? (
              value.map((val) => {
                const opt = options.find((o) => o.value === val);
                if (!opt) return null;
                return (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2 py-0.5 rounded"
                  >
                    {opt.label}
                    <button
                      type="button"
                      onClick={(e) => removeValue(e, val)}
                      className="hover:text-red-500 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 px-1">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-400 ml-2 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-10 w-full mt-1 bg-background border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length > 0 ? (
              options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <div
                    key={option.value}
                    onClick={() => toggleOption(option.value)}
                    className={`
                      px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-50
                      ${isSelected ? "bg-gray-50 text-primary font-medium" : "text-gray-700"}
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check size={16} />}
                  </div>
                );
              })
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

export default MultiSelectDropdown;