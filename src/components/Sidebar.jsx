import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";
import Tooltip from "./Tooltip"; 
import { MoreHorizontal } from "lucide-react";

/**
 * Sidebar Component with Internal State & Persistence
 * @param {string} storageKey - Key used to save active state in localStorage
 */
const Sidebar = ({
  items = [],
  logo,
  collapsedLogo,
  footer,
  collapsible = true,
  defaultExpanded = true, 
  storageKey = "sidebar-state", // Default local storage key
  className = "",
  variant = "primary",
  onItemClick, // Global click handler
  ...props
}) => {
  
  // --- Helper to safely parse JSON from localStorage ---
  const getStorageState = () => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch (e) {
      console.warn("Sidebar storage parse error", e);
      return null;
    }
  };

  // 1. Initialize Active State from LocalStorage Object
  const [activeKey, setActiveKey] = useState(() => {
    const state = getStorageState();
    if (state && state.activeItemKey !== undefined) return state.activeItemKey;
    return items[0]?.key;
  });

  // 2. Initialize Expanded State from LocalStorage Object
  const [isExpanded, setIsExpanded] = useState(() => {
    const state = getStorageState();
    if (state && state.behaviour) {
      return state.behaviour === "expanded";
    }
    return defaultExpanded;
  });

  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const footerRef = useRef(null);

  // --- Persistence Effect: Saves state whenever it changes ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stateToSave = {
        activeItemKey: activeKey,
        behaviour: isExpanded ? "expanded" : "collapsed"
      };
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    }
  }, [activeKey, isExpanded, storageKey]);

  // --- Variant Styling Logic ---
  const variants = {
    primary: {
      active: "bg-primary text-white font-medium shadow-sm",
      inactive: "text-gray-600 hover:bg-primary/20 hover:text-primary",
      iconActive: "text-white",
      iconInactive: "text-gray-500 group-hover:text-primary"
    },
    secondary: {
      active: "bg-secondary text-white font-medium shadow-sm",
      inactive: "text-gray-600 hover:bg-secondary/20 hover:text-secondary",
      iconActive: "text-white",
      iconInactive: "text-gray-500 group-hover:text-secondary"
    },
    outline: {
      active: "border border-primary text-primary bg-primary/5 font-medium",
      inactive: "text-gray-600 hover:bg-gray-100 border border-transparent",
      iconActive: "text-primary",
      iconInactive: "text-gray-500 group-hover:text-gray-900"
    },
    ghost: {
      active: "bg-transparent text-primary font-bold underline decoration-2 underline-offset-4",
      inactive: "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50",
      iconActive: "text-primary",
      iconInactive: "text-gray-500 group-hover:text-gray-900"
    }
  };

  const currentVariant = variants[variant] || variants.primary;

  // Sync state if defaultExpanded changes OR collapsible mode changes
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [defaultExpanded, collapsible]);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  // 3. The Smart Click Handler
  const handleItemClick = (item, e) => {
    // A. Update Internal State (Effect will handle saving)
    setActiveKey(item.key);
    
    // B. Fire the item's specific onClick (if passed)
    if (item.onClick) item.onClick(e);

    // C. Fire the global onItemClick (if passed)
    if (onItemClick) onItemClick(item);
  };

  return (
    <aside
      className={cn(
        "bg-background border-r border-gray-200 h-screen flex flex-col transition-all duration-300 ease-in-out relative z-40",
        isExpanded ? "w-64" : "w-20",
        // Removed all mobile-specific logic (w-0, absolute positioning, etc.)
        className
      )}
      {...props}
    >
      {/* --- Header --- */}
      <div className={cn(
        "h-16 flex items-center border-b border-gray-100 shrink-0",
        isExpanded ? "justify-between px-4" : "justify-center"
      )}>
        {/* Always show the logo container (expanded or collapsed) */}
        <div className="transition-opacity duration-200 flex items-center justify-center">
          {isExpanded ? logo : (collapsedLogo || logo)}
        </div>

        {collapsible && (
          <button
            onClick={toggleSidebar}
            // Removed hidden md:flex logic, button is always available if collapsible is true
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors flex"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={cn("transition-transform duration-300", !isExpanded && "rotate-180")}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item, index) => {
          const itemKey = item.key || index;
          
          // 3. Determine Active State: Compare internal state vs item key
          const isActive = activeKey === itemKey;
          
          const ButtonContent = (
            <button
              // 4. Use the wrapper handler
              onClick={(e) => handleItemClick(item, e)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive ? currentVariant.active : currentVariant.inactive,
                !isExpanded && "justify-center px-0"
              )}
            >
              {item?.icon && (
                <span className={cn(
                  "shrink-0 w-5 h-5 flex items-center justify-center transition-colors",
                  isActive ? currentVariant.iconActive : currentVariant.iconInactive
                )}>
                  {item.icon}
                </span>
              )}

              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-300 origin-left",
                  isExpanded ? "opacity-100 translate-x-0" : "opacity-0 w-0 overflow-hidden translate-x-2.5 absolute"
                )}
              >
                {item.label}
              </span>
            </button>
          );

          // Always wrap in Tooltip if collapsed (removed !isMobile check)
          if (!isExpanded) {
            return (
              <Tooltip 
                key={itemKey} 
                content={item.label} 
                position="right"
                variant={variant}
              >
                {ButtonContent}
              </Tooltip>
            );
          }

          return <div key={itemKey}>{ButtonContent}</div>;
        })}
      </nav>

      {/* --- Footer --- */}
      {footer && (
        <div 
          ref={footerRef}
          className={cn(
            "p-4 border-t border-gray-100 bg-gray-50/50 shrink-0",
            !isExpanded && "flex justify-center p-2"
          )}
        >
          {isExpanded ? (
            footer
          ) : (
            <button 
              onClick={() => setIsFooterOpen(!isFooterOpen)}
              className="w-8 h-8 rounded-md hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
              <MoreHorizontal size={20} />
            </button>
          )}

          {!isExpanded && isFooterOpen && (
             <FooterPopover 
               triggerRef={footerRef} 
               onClose={() => setIsFooterOpen(false)}
             >
               {footer}
             </FooterPopover>
          )}
        </div>
      )}
    </aside>
  );
};

// ... FooterPopover ...
const FooterPopover = ({ children, triggerRef, onClose }) => {
  if (!triggerRef.current) return null;
  const rect = triggerRef.current.getBoundingClientRect();
  const top = rect.top - 10;
  const left = rect.right + 12;

  return createPortal(
    <>
      <div className="fixed inset-0 z-9998" onClick={onClose} />
      <div 
        style={{ top, left, position: 'absolute' }}
        className="z-9999 bg-white border border-gray-200 p-3 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-200 min-w-48"
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default Sidebar;