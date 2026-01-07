const Tooltip = ({ content, children, position = "top", className = "" }) => {
  if (!content) return children;

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  // Small triangle arrow positioning
  const arrows = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-black border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-black border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-black border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-black border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div className="relative flex items-center group w-fit">
      {children}
      
      {/* Tooltip Body */}
      <div
        className={`
          absolute whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 
          group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50
          ${positions[position]}
          ${className}
        `}
      >
        {content}
        
        {/* Triangle Arrow */}
        <div 
            className={`absolute border-[5px] ${arrows[position]}`} 
        />
      </div>
    </div>
  );
};

export default Tooltip;