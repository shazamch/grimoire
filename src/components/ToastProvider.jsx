import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";

const ToastContext = createContext();

const DEFAULT_POSITION = "top-left";
const DEFAULT_DURATION = 3500;

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export const ToastProvider = ({ 
  children, 
  defaultPosition = DEFAULT_POSITION, 
  defaultDuration = DEFAULT_DURATION,
  className = ""
}) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", options = {}) => {
    const id = Date.now();
    const duration = options.duration || defaultDuration;
    const position = options.position || defaultPosition;

    const newToast = { id, message, type, position, duration };
    
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [defaultDuration, defaultPosition]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastsByPosition = useMemo(() => {
    return {
      "top-left": toasts.filter((t) => t.position === "top-left"),
      "top-right": toasts.filter((t) => t.position === "top-right"),
      "bottom-left": toasts.filter((t) => t.position === "bottom-left"),
      "bottom-right": toasts.filter((t) => t.position === "bottom-right"),
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer position="top-left" toasts={toastsByPosition["top-left"]} removeToast={removeToast} className={className} />
      <ToastContainer position="top-right" toasts={toastsByPosition["top-right"]} removeToast={removeToast} className={className} />
      <ToastContainer position="bottom-left" toasts={toastsByPosition["bottom-left"]} removeToast={removeToast} className={className} />
      <ToastContainer position="bottom-right" toasts={toastsByPosition["bottom-right"]} removeToast={removeToast} className={className} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ position, toasts, removeToast, className }) => {
  if (toasts.length === 0) return null;

  const positionClasses = {
    "top-left": "top-4 left-4 flex-col",
    "top-right": "top-4 right-4 flex-col",
    "bottom-left": "bottom-4 left-4 flex-col-reverse",
    "bottom-right": "bottom-4 right-4 flex-col-reverse",
  };

  return (
    <div className={cn("fixed z-1000 flex gap-3", positionClasses[position], className)}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem = ({ message, type, position, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };

  const icons = {
    success: <CheckCircle size={20} className="text-green-600 shrink-0" />,
    error: <AlertCircle size={20} className="text-red-600 shrink-0" />,
    info: <Info size={20} className="text-blue-600 shrink-0" />,
    warning: <AlertTriangle size={20} className="text-yellow-600 shrink-0" />,
  };

  const isLeft = position.includes("left");
  const translateHidden = isLeft ? "-translate-x-full" : "translate-x-full";

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm transition-all duration-300 ease-out transform",
        isVisible ? "translate-x-0 opacity-100" : `${translateHidden} opacity-0`,
        styles[type] || styles.info
      )}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <p className="text-sm font-medium flex-1 leading-tight mt-0.5">{message}</p>
      <button 
        onClick={onClose} 
        className="opacity-50 hover:opacity-100 transition-opacity p-0.5"
      >
        <X size={16} />
      </button>
    </div>
  );
};