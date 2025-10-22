import React, { useState } from "react";
import { Trash2, Search, Edit3, Zap, RotateCcw } from "lucide-react";

const Controls = ({
  onWrite,
  onRead,
  onDelete,
  onCompact,
  onResetTree,
  isCompacting,
}) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [readKey, setReadKey] = useState("");

  const handleWrite = () => {
    if (key.trim()) {
      onWrite(key.trim(), value); // Trim key
      setKey("");
      setValue("");
    } else {
      alert("Key cannot be empty for write.");
    }
  };

  const handleDelete = () => {
    if (key.trim()) {
      onDelete(key.trim()); // Trim key
      setKey("");
      setValue("");
    } else {
      alert("Key cannot be empty for delete.");
    }
  };

  const handleRead = () => {
    if (readKey.trim()) {
      onRead(readKey.trim()); // Trim key
    } else {
      alert("Key cannot be empty for read.");
    }
  };

  return (
    <div className="p-4 shadow-md rounded-lg mb-6" style={{ 
      background: 'var(--bg-card)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        {/* Write/Delete Section */}
        <div className="space-y-3 p-3 rounded-md" style={{ 
          border: '1px solid var(--border-secondary)',
          background: 'var(--bg-card-secondary)'
        }}>
          <h3 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Write / Delete Data</h3>
          <div>
            <label
              htmlFor="key"
              className="block text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Key:
            </label>
            <input
              type="text"
              id="key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              className="mt-1 block w-full p-2 rounded-md shadow-sm"
              style={{ 
                border: '1px solid var(--border-primary)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Value (optional for Delete):
            </label>
            <input
              type="text"
              id="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="mt-1 block w-full p-2 rounded-md shadow-sm"
              style={{ 
                border: '1px solid var(--border-primary)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleWrite}
              className="flex-1 px-4 py-2 rounded-md flex items-center justify-center transition-colors"
              style={{ 
                background: 'var(--btn-blue-bg)',
                color: 'var(--text-inverse)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--btn-blue-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--btn-blue-bg)'}
            >
              <Edit3 size={18} className="mr-2" /> Write
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-2 rounded-md flex items-center justify-center transition-colors"
              style={{ 
                background: 'var(--btn-red-bg)',
                color: 'var(--text-inverse)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--btn-red-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--btn-red-bg)'}
            >
              <Trash2 size={18} className="mr-2" /> Delete
            </button>
          </div>
        </div>

        {/* Read Section */}
        <div className="space-y-3 p-3 rounded-md" style={{ 
          border: '1px solid var(--border-secondary)',
          background: 'var(--bg-card-secondary)'
        }}>
          <h3 className="font-medium" style={{ color: 'var(--text-secondary)' }}>Read Data</h3>
          <div>
            <label
              htmlFor="readKey"
              className="block text-sm font-medium"
              style={{ color: 'var(--text-primary)' }}
            >
              Key to Read:
            </label>
            <input
              type="text"
              id="readKey"
              value={readKey}
              onChange={(e) => setReadKey(e.target.value)}
              placeholder="Enter key to read"
              className="mt-1 block w-full p-2 rounded-md shadow-sm"
              style={{ 
                border: '1px solid var(--border-primary)',
                background: 'var(--bg-input)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          <button
            onClick={handleRead}
            className="w-full px-4 py-2 rounded-md flex items-center justify-center transition-colors"
            style={{ 
              background: 'var(--btn-green-bg)',
              color: 'var(--text-inverse)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--btn-green-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--btn-green-bg)'}
          >
            <Search size={18} className="mr-2" /> Read
          </button>
        </div>
      </div>
      {/* Actions Section */}
      <div className="mt-4 pt-4 flex flex-wrap gap-2" style={{ borderTop: '1px solid var(--border-secondary)' }}>
        {" "}
        {/* Use flex-wrap and gap for better responsiveness */}
        <button
          onClick={() => onCompact(0)}
          disabled={isCompacting}
          className="px-4 py-2 rounded-md flex items-center justify-center transition-colors"
          style={{ 
            background: isCompacting ? 'var(--btn-gray-bg)' : 'var(--btn-purple-bg)',
            color: 'var(--text-inverse)',
            cursor: isCompacting ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => !isCompacting && (e.currentTarget.style.background = 'var(--btn-purple-hover)')}
          onMouseLeave={(e) => !isCompacting && (e.currentTarget.style.background = 'var(--btn-purple-bg)')}
        >
          <Zap size={18} className="mr-2" /> Trigger L0 Compaction
        </button>
        {/* Add button to compact any level later if needed */}
        <button
          onClick={onResetTree}
          className="px-4 py-2 rounded-md flex items-center justify-center transition-colors"
          style={{ 
            background: 'var(--btn-gray-bg)',
            color: 'var(--text-inverse)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--btn-gray-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--btn-gray-bg)'}
        >
          <RotateCcw size={18} className="mr-2" /> Reset Tree
        </button>
      </div>
    </div>
  );
};
export default Controls;
