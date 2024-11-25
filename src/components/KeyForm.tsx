import { KeyProps } from '../types';
import { RefreshCw } from 'lucide-react';

export function KeyForm({ keyStr, onKey, onGen }: KeyProps) {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={keyStr}
          onChange={(e) => onKey(e.target.value)}
          placeholder="Enter or paste your key"
          className="flex-1 bg-[#0D1117] text-[#c9d1d9] p-3 rounded-l border border-[#30363d]"
        />
        <button
          onClick={onGen}
          className="bg-[#238636] text-white px-4 rounded-r hover:bg-[#2ea043] flex items-center"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-[#8b949e]">Tip: You can paste your own key or generate a secure one</p>
    </div>
  );
}