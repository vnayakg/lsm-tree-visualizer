import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import DataItem from "./DataItem";

const MemTableVisualizer = ({ memtableData, maxSize, readPathItem }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const getRingStyle = () => {
    if (readPathItem?.status === "Checking") {
      return { boxShadow: '0 0 0 2px var(--status-checking-ring)' };
    } else if (readPathItem?.status?.startsWith("Found")) {
      return { boxShadow: '0 0 0 2px var(--status-found-ring)' };
    }
    return {};
  };
  
  return (
    <div
      className={`p-4 rounded-lg shadow-sm mb-4 transition-all duration-300 ease-in-out ${
        readPathItem?.status === "Checking" ? "animate-pulse" : ""
      }`}
      style={{
        border: '1px solid var(--memtable-border)',
        background: 'var(--memtable-bg)',
        ...getRingStyle()
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold mb-2 flex items-center"
        style={{ color: 'var(--memtable-text)' }}
      >
        {isOpen ? (
          <ChevronDown size={20} className="mr-1" />
        ) : (
          <ChevronRight size={20} className="mr-1" />
        )}
        MemTable (Size: {memtableData.length} / {maxSize})
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
      {isOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {memtableData.length === 0 && (
            <p className="text-sm italic col-span-full" style={{ color: 'var(--text-tertiary)' }}>Empty</p>
          )}
          {memtableData.map(([key, value]) => (
            <DataItem key={`mem-${key}`} itemKey={key} itemValue={value} />
          ))}
        </div>
      )}
    </div>
  );
};
export default MemTableVisualizer;
