import { Link } from 'react-router-dom';
import { Shield, Key, Lock, Github } from 'lucide-react';

export function Tools() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#c9d1d9] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-[#238636]">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold text-[#c9d1d9]">SecureVault</h1>
          </div>
          <a
            href="https://github.com/vansencool/SecureVault"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>Source</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/vault"
            className="bg-[#161B22] p-8 rounded-lg border border-[#30363d] hover:border-[#58a6ff] transition-all hover:shadow-lg group"
          >
            <div className="flex items-center space-x-3 text-[#238636] mb-4">
              <Lock className="h-8 w-8 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold text-[#c9d1d9]">Encryption Vault</h2>
            </div>
            <p className="text-[#8b949e] mb-4">
              Encrypt and decrypt files or text using military-grade AES encryption
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#8b949e]">
              <li>Support for any file type (videos, executables, etc)</li>
              <li>Local file processing - nothing uploaded to servers</li>
              <li>Real-time progress tracking</li>
              <li>File size and format detection</li>
            </ul>
          </Link>

          <Link
            to="/key"
            className="bg-[#161B22] p-8 rounded-lg border border-[#30363d] hover:border-[#58a6ff] transition-all hover:shadow-lg group"
          >
            <div className="flex items-center space-x-3 text-[#238636] mb-4">
              <Key className="h-8 w-8 group-hover:rotate-12 transition-transform" />
              <h2 className="text-xl font-bold text-[#c9d1d9]">Key Generator</h2>
            </div>
            <p className="text-[#8b949e] mb-4">
              Generate secure encryption keys or convert passwords into unbreakable keys
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-[#8b949e]">
              <li>Generate random AES-256 keys</li>
              <li>Convert memorable phrases into secure keys</li>
              <li>Base64 key format for easy sharing</li>
              <li>Military-grade security standards</li>
            </ul>
          </Link>
        </div>

        <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363d]">
          <h2 className="font-bold mb-4 text-lg">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-[#58a6ff]">Key Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#8b949e]">
                <li>Use unique keys for different files</li>
                <li>Never share keys over insecure channels</li>
                <li>Store keys in a password manager</li>
                <li>Longer passwords create stronger keys</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#58a6ff]">File Security</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#8b949e]">
                <li>Regularly backup encrypted files</li>
                <li>Verify file integrity after encryption</li>
                <li>Use AES-256 for sensitive data</li>
                <li>Keep original files in secure storage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}