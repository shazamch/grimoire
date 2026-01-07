import { useState, useEffect } from 'react';

function Input({ 
  label, 
  icon, 
  value, 
  onChange, 
  placeholder = "", 
  type = "text", 
  error,
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
      
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full border rounded-md py-2 focus:outline-none focus:ring disabled:opacity-50 transition-colors
            ${icon ? 'pl-10 pr-4' : 'px-4'} 
            ${visibleError 
              ? 'border-red-500 focus:ring-red-200 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400 focus:ring-primary bg-background'
            }
          `}
          {...props}
        />
      </div>

      {visibleError && (
        <p className="mt-1 text-xs text-red-500 font-semibold animate-pulse">
          {visibleError}
        </p>
      )}
    </div>
  );
}

export default Input;