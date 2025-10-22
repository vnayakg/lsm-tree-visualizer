import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Activity } from "lucide-react";

const LogPanel = ({ logs }) => {
  const [isOpen, setIsOpen] = useState(true);
  const logContainerRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to top (most recent log) on new log
    if (isOpen && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs, isOpen]); // Rerun when logs or isOpen state changes

  return (
    <div className="p-4 rounded-lg" style={{ 
      background: 'var(--log-bg)', 
      color: 'var(--log-text)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left font-semibold mb-2 flex items-center"
        style={{ color: 'var(--log-text)' }}
      >
        {isOpen ? (
          <ChevronDown size={20} className="mr-1" />
        ) : (
          <ChevronRight size={20} className="mr-1" />
        )}
        <Activity size={18} className="mr-2" /> Activity Log
      </button>
      {isOpen && (
        <div
          ref={logContainerRef}
          className="h-60 overflow-y-auto space-y-1 text-sm font-mono pt-2"
          style={{ borderTop: '1px solid var(--log-border)' }}
        >
          {logs.length === 0 && (
            <p className="italic" style={{ color: 'var(--log-text-secondary)' }}>No activities yet.</p>
          )}
          {logs.map((log, index) => (
            <div
              key={index}
              className="whitespace-pre-wrap px-1 rounded transition-colors"
              style={{ cursor: 'default' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--log-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span className="select-none" style={{ color: 'var(--log-text-secondary)' }}>{log.time}</span>:{" "}
              <span style={{ color: 'var(--log-text)' }}>{log.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default LogPanel;
