import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, Copy, Home, RefreshCw } from 'lucide-react';
import { genKey, makeKeyFromString } from '../utils/crypto';

export function KeyGenerator() {
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'generate' | 'string'>('generate');

  const generateKey = async () => {
    const newKey = await genKey('AES-256');
    setKey(newKey);
  };

  const generateFromString = async () => {
    if (!input) return;
    const newKey = await makeKeyFromString(input);
    setKey(newKey);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(key);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#c9d1d9] p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-[#238636]">
            <Key className="h-6 w-6" />
            <h1 className="text-xl font-bold text-[#c9d1d9]">Key Generator</h1>
          </div>
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>Back to Vault</span>
          </Link>
        </div>

        <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363d] space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setMode('generate')}
              className={`flex-1 p-3 rounded flex items-center justify-center space-x-2 ${
                mode === 'generate'
                  ? 'bg-[#238636] text-white'
                  : 'bg-[#21262d] text-[#8b949e]'
              }`}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Random Key</span>
            </button>
            <button
              onClick={() => setMode('string')}
              className={`flex-1 p-3 rounded flex items-center justify-center space-x-2 ${
                mode === 'string'
                  ? 'bg-[#238636] text-white'
                  : 'bg-[#21262d] text-[#8b949e]'
              }`}
            >
              <Key className="h-4 w-4" />
              <span>From String</span>
            </button>
          </div>

          {mode === 'string' ? (
            <div className="space-y-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your secret phrase..."
                className="w-full bg-[#0D1117] text-[#c9d1d9] p-3 rounded border border-[#30363d]"
              />
              <button
                onClick={generateFromString}
                disabled={!input}
                className="w-full bg-[#238636] text-white p-3 rounded hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Key from String
              </button>
              <p className="text-xs text-[#8b949e]">
                Your string will be transformed into a secure key using SHA-512 and AES-256
              </p>
            </div>
          ) : (
            <button
              onClick={generateKey}
              className="w-full bg-[#238636] text-white p-3 rounded hover:bg-[#2ea043] flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Generate Random Key</span>
            </button>
          )}

          {key && (
            <div className="space-y-2 mt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={key}
                  readOnly
                  className="flex-1 bg-[#0D1117] text-[#c9d1d9] p-3 rounded border border-[#30363d]"
                />
                <button
                  onClick={copyKey}
                  className="bg-[#1f6feb] text-white p-3 rounded hover:bg-[#388bfd]"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-[#8b949e]">
                This is your secure AES-256 key in Base64 format. Save it somewhere safe!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}