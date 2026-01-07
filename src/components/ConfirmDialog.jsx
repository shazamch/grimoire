import { AlertTriangle, Info, X } from "lucide-react";
import Button from "./Button";
import { useEffect } from "react";
import { cn } from "../utils/cn";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
  className,
  ...props
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div 
        className={cn(
          "relative w-full max-w-md bg-background rounded-lg shadow-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200",
          className
        )}
        {...props}
      >
        
        {/* Close Icon (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X size={20} />
        </button>

        <div className="p-6 text-center">
          {/* Header Area */}
          <div
            className={cn(
              "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
              isDanger ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
            )}
          >
            {isDanger ? <AlertTriangle size={24} /> : <Info size={24} />}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button
              variant="outline"
              text={cancelText}
              onClick={onClose}
              disabled={isLoading}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            />
            
            <Button
              variant={isDanger ? "primary" : "primary"}
              text={isLoading ? "Processing..." : confirmText}
              onClick={onConfirm}
              disabled={isLoading}
              className={cn(
                isDanger && "bg-red-600 hover:bg-red-700 border-red-600 text-white"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;