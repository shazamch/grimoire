// The Main Container
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-background border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Header Section (Title + Description)
const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-6 py-4 border-b border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Bold Title
const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 leading-tight ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Gray helper text
const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-500 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
};

// Main Content Area
const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Footer (Actions)
const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };