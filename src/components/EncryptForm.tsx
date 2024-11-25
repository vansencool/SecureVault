import { EncryptProps } from '../types';

export function EncryptForm({ text, algo, onText, onAlgo }: EncryptProps) {
  return (
    <div className="space-y-4">
      <select 
        value={algo} 
        onChange={(e) => onAlgo(e.target.value as any)}
        className="bg-[#0D1117] text-[#c9d1d9] p-2 rounded border border-[#30363d]"
      >
        <option value="AES-128">AES-128</option>
        <option value="AES-256">AES-256</option>
      </select>
      <textarea
        value={text}
        onChange={(e) => onText(e.target.value)}
        placeholder="Enter text to encrypt/decrypt..."
        className="w-full h-32 bg-[#0D1117] text-[#c9d1d9] p-4 rounded border border-[#30363d] resize-none"
      />
    </div>
  );
}