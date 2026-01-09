import { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from "../utils/cn";

const Tooltip = ({ 
  content, 
  children, 
  position = "right", 
  variant = "primary", // Added variant prop with default 'primary'
  className = "" 
}) => {
  if (!content) return children;

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Define styling variants
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    dark: "bg-gray-900 text-white",
    light: "bg-white text-gray-900 border border-gray-200 shadow-md",
    outline: "bg-white/90 backdrop-blur-sm border border-gray-200 text-gray-800 shadow-sm",
  };

  useLayoutEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const offset = 10;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - offset;
        break;
      case 'right':
      default:
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + scrollX + offset;
        break;
    }

    setCoords({ top, left });
  }, [isVisible, position]);

  const tooltipElement = (
    <div
      ref={tooltipRef}
      style={{ top: coords.top, left: coords.left, position: 'absolute' }}
      className={cn(
        "z-10000 whitespace-nowrap text-xs px-2.5 py-1.5 rounded-md shadow-lg pointer-events-none transition-opacity duration-150 font-medium",
        variants[variant] || variants.primary,
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {content}
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="w-full" // Ensure the wrapper fills the sidebar width
      >
        {children}
      </div>
      {/* Render the tooltip outside the main DOM hierarchy */}
      {createPortal(tooltipElement, document.body)}
    </>
  );
};

export default Tooltip;