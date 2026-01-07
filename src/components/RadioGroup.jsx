const RadioGroup = ({
  label,
  options = [],
  value,
  onChange,
  disabled = false,
  direction = "col", // 'col' or 'row'
}) => {
  return (
    <div className="w-full">
      {label && <label className="block mb-2 font-medium text-gray-700">{label}</label>}
      
      <div className={`flex ${direction === "row" ? "gap-6" : "flex-col gap-3"}`}>
        {options.map((option) => {
          const isSelected = value === option.value;
          const optionDisabled = disabled || option.disabled;

          return (
            <label
              key={option.value}
              className={`
                flex items-center gap-3 cursor-pointer group
                ${optionDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name={label} // Groups them natively
                  value={option.value}
                  checked={isSelected}
                  onChange={() => !optionDisabled && onChange(option.value)}
                  disabled={optionDisabled}
                  className="peer sr-only"
                />
                <div
                  className={`
                    w-5 h-5 rounded-full border flex items-center justify-center transition-all
                    peer-focus:ring-2 peer-focus:ring-primary/20
                    ${
                      isSelected
                        ? "border-primary"
                        : "bg-background border-gray-300 group-hover:border-gray-400"
                    }
                  `}
                >
                  <div
                    className={`
                      w-2.5 h-2.5 rounded-full bg-primary transition-transform duration-200
                      ${isSelected ? "scale-100" : "scale-0"}
                    `}
                  />
                </div>
              </div>
              <span className={`text-sm ${isSelected ? "text-gray-900 font-medium" : "text-gray-700"}`}>
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;