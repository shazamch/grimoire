const Badge = ({ 
  text, 
  variant = "neutral", 
  icon: Icon, 
  className = "" 
}) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${variants[variant] || variants.neutral}
        ${className}
      `}
    >
      {Icon && <Icon size={12} strokeWidth={3} />}
      {text}
    </span>
  );
};

export default Badge;