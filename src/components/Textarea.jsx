import { useState, useEffect } from 'react';

function Textarea({ 
  label, 
  value, 
  onChange, 
  placeholder = "", 
  rows = 4,
  error,
  disabled = false,
  className = "",
  ...props 
}) {
  const errorText = error?.message || (typeof error === 'string' ? error : null);
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

  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}
      
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full border rounded-md py-2 px-4 focus:outline-none focus:ring transition-colors resize-y
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'bg-background'}
          ${visibleError 
            ? 'border-red-500 focus:ring-red-200 bg-red-50' 
            : 'border-gray-300 hover:border-gray-400 focus:ring-primary'
          }
          ${className}
        `}
        {...props}
      />

      {visibleError && (
        <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">
          {visibleError}
        </p>
      )}
    </div>
  );
}

export default Textarea;