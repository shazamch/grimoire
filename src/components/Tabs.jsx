const Tabs = ({ tabs = [], activeTab, onChange, className = "" }) => {
  return (
    <div className={`flex border-b border-gray-200 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200 whitespace-nowrap
              focus:outline-none
              ${isActive ? "text-primary" : "text-gray-500 hover:text-gray-700"}
            `}
          >
            {Icon && <Icon size={16} />}
            
            <span>{tab.label}</span>

            {/* Render Count if it exists */}
            {tab.count !== undefined && (
              <span 
                className={`
                  text-xs px-2 py-0.5 rounded-full transition-colors
                  ${isActive 
                    ? "bg-primary/10 text-primary" 
                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  }
                `}
              >
                {tab.count}
              </span>
            )}

            {/* Active Indicator Line (CSS Animation) */}
            <div
              className={`
                absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 ease-in-out origin-center
                ${isActive ? "scale-x-100" : "scale-x-0"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;