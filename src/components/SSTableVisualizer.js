import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import DataItem from "./DataItem";

const SSTableVisualizer = ({ sstable, readPathItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10); // Stagger animation slightly
    return () => clearTimeout(timer);
  }, []);
  
  const getRingStyle = () => {
    if (readPathItem?.status === "Checking") {
      return { boxShadow: '0 0 0 2px var(--status-checking-ring)' };
    } else if (readPathItem?.status?.startsWith("Found")) {
      return { boxShadow: '0 0 0 2px var(--status-found-ring)' };
    }
    return { boxShadow: 'var(--shadow-sm)' };
  };

  return (
    <div
      className={`p-3 rounded-lg mb-2 relative transition-all duration-500 ease-in-out transform ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
      } ${readPathItem?.status === "Checking" ? "animate-pulse" : ""}`}
      style={{
        border: '1px solid var(--sstable-border)',
        background: 'var(--sstable-bg)',
        ...getRingStyle()
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-sm font-medium mb-1 flex items-center"
        style={{ color: 'var(--text-primary)' }}
      >
        {isOpen ? (
          <ChevronDown size={18} className="mr-1" />
        ) : (
          <ChevronRight size={18} className="mr-1" />
        )}
        SSTable:{" "}
        <span className="font-mono text-xs ml-1 mr-1 px-1 rounded" style={{ background: 'var(--sstable-id-bg)' }}>
          {sstable.id.substring(sstable.id.length - 5)}
        </span>{" "}
        ({sstable.data.length} items)
        {readPathItem && (
          <span
            className="ml-2 text-xs px-1.5 py-0.5 rounded"
            style={{
              background: readPathItem.status === "Found"
                ? "var(--status-found-bg)"
                : readPathItem.status === "Found (Tombstone)"
                ? "var(--status-tombstone-bg)"
                : readPathItem.status === "Checking"
                ? "var(--status-checking-bg)"
                : "var(--bg-card-secondary)",
              color: readPathItem.status === "Found"
                ? "var(--status-found-text)"
                : readPathItem.status === "Found (Tombstone)"
                ? "var(--status-tombstone-text)"
                : readPathItem.status === "Checking"
                ? "var(--status-checking-text)"
                : "var(--text-secondary)"
            }}
          >
            {readPathItem.status}
          </span>
        )}
      </button>
      {sstable.minKey && sstable.maxKey && (
        <div className="text-xs mb-1 ml-5" style={{ color: 'var(--text-tertiary)' }}>
          Range: [{sstable.minKey} - {sstable.maxKey}]
        </div>
      )}
      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 pl-2">
          {sstable.data.length === 0 && (
            <p className="text-xs italic col-span-full" style={{ color: 'var(--text-tertiary)' }}>Empty</p>
          )}
          {sstable.data.map(([key, value]) => (
            <DataItem
              key={`${sstable.id}-${key}`}
              itemKey={key}
              itemValue={value}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default SSTableVisualizer;
