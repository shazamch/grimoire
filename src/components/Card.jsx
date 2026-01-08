import { cn } from "../utils/cn";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={cn(
        "bg-background border border-gray-200 rounded-xl shadow-sm overflow-hidden w-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={cn("p-4 border-b border-gray-100", className)} 
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-900 leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p 
      className={cn("text-sm text-gray-500 mt-1", className)} 
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={cn(
        "p-4 bg-gray-50 border-t border-gray-100 flex items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };