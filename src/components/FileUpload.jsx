import { useState, useRef, useEffect } from "react";
import { UploadCloud, X, FileText, AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

const FileUpload = ({
  label,
  onChange,
  value, // Expecting a File object or null
  accept = "*", // e.g., ".pdf,.png,image/*"
  maxSizeMB = 5, // Default 5MB
  error,
  disabled = false,
  className = "",
  ...props
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  
  // Combine external errors and internal validation errors
  const [internalError, setInternalError] = useState(null);
  const activeError = error?.message || (typeof error === "string" ? error : null) || internalError;
  const [visibleError, setVisibleError] = useState(activeError);

  // Auto-dismiss error logic
  useEffect(() => {
    setVisibleError(activeError);
    if (activeError) {
      const timer = setTimeout(() => {
        setVisibleError(null);
        setInternalError(null); // Clear internal error too
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeError]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    // 1. Check Size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setInternalError(`File size exceeds ${maxSizeMB}MB limit.`);
      return false;
    }
    // 2. Check Type (Basic check based on accept prop if provided)
    if (accept !== "*" && !file.type.match(accept.replace(/,/g, "|").replace(/\*/g, ".*"))) {
       // Ideally we parse extensions here too, but for now we rely on the input's native accept
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onChange(file);
        setInternalError(null);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onChange(file);
        setInternalError(null);
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerSelect = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      {label && <label className="block mb-1 font-medium text-gray-700">{label}</label>}

      <div
        onClick={!value ? triggerSelect : undefined}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative w-full rounded-lg border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-6 text-center",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200" : "cursor-pointer border-gray-300 bg-background hover:bg-gray-50 hover:border-gray-400",
          dragActive && "border-primary bg-primary/5 scale-[1.01]",
          visibleError && "border-red-400 bg-red-50"
        )}
        {...props}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
        />

        {value ? (
          <div className="flex items-center justify-between w-full bg-background p-2 rounded border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-primary/10 text-primary rounded">
                <FileText size={24} />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 truncate max-w-50">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div 
              className={cn(
                "p-3 rounded-full",
                dragActive ? "bg-primary/20 text-primary" : "bg-gray-100 text-gray-500"
              )}
            >
              <UploadCloud size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                <span className="text-primary hover:underline">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                {accept === "*" ? "All files" : accept.replace(/,/g, ", ")} (Max {maxSizeMB}MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {visibleError && (
        <div className="mt-1 flex items-center gap-1.5 text-xs text-red-500 font-semibold animate-pulse">
          <AlertCircle size={12} />
          {visibleError}
        </div>
      )}
    </div>
  );
};

export default FileUpload;