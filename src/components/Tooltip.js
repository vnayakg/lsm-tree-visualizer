import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          className="absolute z-50 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 text-sm font-medium rounded-lg shadow-sm whitespace-nowrap"
          style={{ 
            background: 'var(--tooltip-bg)',
            color: 'var(--tooltip-text)'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};
export default Tooltip;
