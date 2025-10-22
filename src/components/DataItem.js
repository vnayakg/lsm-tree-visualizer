import React, { useState, useEffect } from "react";
import { TOMBSTONE } from "../constants";

const DataItem = ({ itemKey, itemValue, highlight }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10); // Small delay for transition
    return () => clearTimeout(timer);
  }, []);

  const isTombstone = itemValue === TOMBSTONE;

  return (
    <div
      className={`px-2 py-1 rounded-md text-xs transition-all duration-500 ease-in-out transform ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
      style={{
        border: isTombstone 
          ? '1px solid var(--dataitem-tombstone-border)' 
          : '1px solid var(--dataitem-border)',
        background: isTombstone 
          ? 'var(--dataitem-tombstone-bg)' 
          : 'var(--dataitem-bg)',
        boxShadow: highlight ? '0 0 0 2px var(--border-focus), var(--shadow-lg)' : 'none'
      }}
    >
      <span className="font-semibold break-all" style={{ color: 'var(--dataitem-key-text)' }}>{itemKey}:</span>
      <span
        className={`break-all ${isTombstone ? "italic" : ""}`}
        style={{ 
          color: isTombstone ? 'var(--dataitem-tombstone-text)' : 'var(--dataitem-value-text)'
        }}
      >
        {isTombstone ? " (TOMBSTONE)" : ` ${itemValue}`}
      </span>
    </div>
  );
};
export default DataItem;
