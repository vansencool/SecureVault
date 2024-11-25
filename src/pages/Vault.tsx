import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, Lock, Unlock, AlertCircle } from 'lucide-react';
import { EncryptForm } from '../components/EncryptForm';
import { FileHandler } from '../components/FileHandler';
import { KeyForm } from '../components/KeyForm';
import { ProgressBar } from '../components/ProgressBar';
import { encrypt, decrypt, genKey } from '../utils/crypto';
import { fileToBuffer } from '../utils/files';
import { useProgress } from '../hooks/useProgress';
import { AlgoType } from '../types';

export function Vault() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [out, setOut] = useState('');
  const [err, setErr] = useState('');
  const [algo, setAlgo] = useState<AlgoType>('AES-256');
  const [file, setFile] = useState<File>();
  const [result, setResult] = useState<Blob>();
  const [isEncrypting, setIsEncrypting] = useState(true);
  const { progress, status, startProgress, resetProgress } = useProgress();

  const handleEncrypt = async () => {
    try {
      if (!key) {
        setErr('Please enter or generate a key first');
        return;
      }

      setIsEncrypting(true);
      const cleanup = startProgress('encrypt', file?.size || 0);

      if (file) {
        const buffer = await fileToBuffer(file);
        const encrypted = await encrypt(buffer, key, algo);
        setResult(new Blob([encrypted]));
      } else {
        const enc = new TextEncoder();
        const encrypted = await encrypt(enc.encode(text), key, algo);
        setOut(btoa(String.fromCharCode(...new Uint8Array(encrypted))));
      }

      cleanup();
      setErr('');
    } catch (error) {
      resetProgress();
      setErr('Encryption failed - ' + (error instanceof Error ? error.message : 'unknown error'));
    }
  };

  const handleDecrypt = async () => {
    try {
      if (!key) {
        setErr('Please enter a key first');
        return;
      }

      setIsEncrypting(false);
      const cleanup = startProgress('decrypt', file?.size || 0);

      if (file) {
        const buffer = await fileToBuffer(file);
        const decrypted = await decrypt(buffer, key, algo);
        setResult(new Blob([decrypted]));
      } else {
        const bytes = Uint8Array.from(atob(text), c => c.charCodeAt(0));
        const decrypted = await decrypt(bytes.buffer, key, algo);
        const dec = new TextDecoder();
        setOut(dec.decode(decrypted));
      }

      cleanup();
      setErr('');
    } catch (error) {
      resetProgress();
      setErr('Decryption failed - wrong key or corrupted data');
    }
  };

  const genNewKey = async () => {
    try {
      const newKey = await genKey(algo);
      setKey(newKey);
    } catch (error) {
      setErr('Key generation failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#c9d1d9]">
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 text-[#238636]">
              <Shield className="h-6 w-6" />
              <h1 className="text-xl font-bold text-[#c9d1d9]">Encryption Vault</h1>
            </div>
            <Link
              to="/"
              className="flex items-center space-x-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Back to Tools</span>
            </Link>
          </div>

          <FileHandler 
            onFile={setFile} 
            result={result}
            filename={file?.name}
            isEncrypting={isEncrypting}
          />

          {!file && (
            <EncryptForm
              text={text}
              algo={algo}
              onText={setText}
              onAlgo={setAlgo}
            />
          )}
          
          <KeyForm 
            keyStr={key}
            onKey={setKey}
            onGen={genNewKey}
          />

          <ProgressBar progress={progress} status={status} />

          <div className="flex space-x-4">
            <button
              onClick={handleEncrypt}
              className="flex-1 bg-[#238636] text-white p-2 rounded flex items-center justify-center space-x-2 hover:bg-[#2ea043] transition-colors"
            >
              <Lock className="h-4 w-4" />
              <span>Encrypt {file ? 'File' : 'Text'}</span>
            </button>
            <button
              onClick={handleDecrypt}
              className="flex-1 bg-[#1f6feb] text-white p-2 rounded flex items-center justify-center space-x-2 hover:bg-[#388bfd] transition-colors"
            >
              <Unlock className="h-4 w-4" />
              <span>Decrypt {file ? 'File' : 'Text'}</span>
            </button>
          </div>

          {err && (
            <div className="p-4 bg-[#3d1d1d] border border-[#f85149] rounded flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-[#f85149]" />
              <span className="text-[#f85149]">{err}</span>
            </div>
          )}

          {!file && out && (
            <div className="bg-[#161B22] p-4 rounded border border-[#30363d]">
              <pre className="whitespace-pre-wrap break-all">{out}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}