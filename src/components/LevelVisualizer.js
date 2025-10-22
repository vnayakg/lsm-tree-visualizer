import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import SSTableVisualizer from "./SSTableVisualizer";

const LevelVisualizer = ({ level, levelIdx, readPath }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Get level-specific colors from CSS variables
  const getLevelStyle = () => {
    return {
      background: `var(--level-${levelIdx}-bg)`,
      border: `1px solid var(--level-${levelIdx}-border)`,
      boxShadow: 'var(--shadow-sm)'
    };
  };

  return (
    <div 
      className="p-3 rounded-lg mb-3"
      style={getLevelStyle()}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-md font-semibold mb-2 flex items-center"
        style={{ color: 'var(--text-primary)' }}
      >
        {isOpen ? (
          <ChevronDown size={20} className="mr-1" />
        ) : (
          <ChevronRight size={20} className="mr-1" />
        )}
        Level {levelIdx} ({level.length} SSTables)
      </button>
      {isOpen &&
        (level.length === 0 ? (
          <p className="text-sm italic ml-5" style={{ color: 'var(--text-tertiary)' }}>Empty</p>
        ) : (
          <div className="space-y-2">
            {level.map((sstable) => (
              <SSTableVisualizer
                key={sstable.id}
                sstable={sstable}
                readPathItem={readPath?.find((p) => p.id === sstable.id)}
              />
            ))}
          </div>
        ))}
    </div>
  );
};
export default LevelVisualizer;
