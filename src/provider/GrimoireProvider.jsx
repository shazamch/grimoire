import React from 'react';

export const GrimoireProvider = ({ 
  children, 
  theme = {} 
}) => {
  const dynamicStyles = {};
  
  if (theme.primary) dynamicStyles['--primary'] = theme.primary;
  if (theme.secondary) dynamicStyles['--secondary'] = theme.secondary;
  if (theme.background) dynamicStyles['--background'] = theme.background;

  return (
    <div 
      style={dynamicStyles} 
      className="contents bg-background text-primary font-sans antialiased"
    >
      {children}
    </div>
  );
};