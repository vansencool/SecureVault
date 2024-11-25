import React, { useState, useRef } from 'react';
import { Upload, Download } from 'lucide-react';
import { bytesToSize } from '../utils/format';

interface FileProps {
  onFile: (file: File) => void;
  result?: Blob;
  filename?: string;
  isEncrypting: boolean;
}

export function FileHandler({ onFile, result, filename, isEncrypting }: FileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<{ original: number, processed: number }>({ original: 0, processed: 0 });
  const [hasChanged, setHasChanged] = useState(false);

  const handleFile = (file: File) => {
    onFile(file);
    setFileInfo({ original: file.size, processed: 0 });
  };

  const handleDownload = () => {
    if (result && filename) {
      const url = URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      const prefix = isEncrypting ? 'encrypted' : 'decrypted';
      a.download = `${prefix}-${filename.replace(/^(encrypted-|decrypted-)/, '')}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  React.useEffect(() => {
    if (result) {
      setFileInfo(prev => ({ ...prev, processed: result.size }));
      setHasChanged(true);
      setTimeout(() => setHasChanged(false), 1000);
    }
  }, [result]);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => inputRef.current?.click()}
          className="bg-[#238636] text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-[#2ea043] transition-colors"
        >
          <Upload className="h-4 w-4" />
          <span>Choose File</span>
        </button>
        {result && (
          <button
            onClick={handleDownload}
            className={`bg-[#1f6feb] text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-[#388bfd] transition-all ${
              hasChanged ? 'scale-110' : ''
            }`}
          >
            <Download className="h-4 w-4" />
            <span>Download Result</span>
          </button>
        )}
      </div>
      
      {fileInfo.original > 0 && (
        <div className="text-sm text-[#8b949e] space-y-1">
          <p>Original size: {bytesToSize(fileInfo.original)}</p>
          {fileInfo.processed > 0 && (
            <p className={`transition-opacity ${hasChanged ? 'opacity-100' : 'opacity-80'}`}>
              {isEncrypting ? 'Encrypted' : 'Decrypted'} size: {bytesToSize(fileInfo.processed)}
            </p>
          )}
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}