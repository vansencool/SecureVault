import { AlgoType } from '../types';

const ALGO_BITS: Record<AlgoType, number> = {
  'AES-128': 128,
  'AES-256': 256
};

export async function genKey(algo: AlgoType): Promise<string> {
  const key = await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: ALGO_BITS[algo]
    },
    true,
    ['encrypt', 'decrypt']
  );
  
  const raw = await window.crypto.subtle.exportKey('raw', key);
  return btoa(String.fromCharCode(...new Uint8Array(raw)));
}

export async function makeKeyFromString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  
  const hash = await window.crypto.subtle.digest('SHA-512', data);
  
  const key = await window.crypto.subtle.importKey(
    'raw',
    hash.slice(0, 32),
    'AES-GCM',
    true,
    ['encrypt', 'decrypt']
  );
  
  const raw = await window.crypto.subtle.exportKey('raw', key);
  return btoa(String.fromCharCode(...new Uint8Array(raw)));
}

export async function getKey(keyStr: string, algo: AlgoType): Promise<CryptoKey> {
  try {
    const data = Uint8Array.from(atob(keyStr), c => c.charCodeAt(0));
    return await window.crypto.subtle.importKey(
      'raw',
      data,
      'AES-GCM',
      true,
      ['encrypt', 'decrypt']
    );
  } catch {
    // if not base64, hash the string to create a key
    return await makeKeyFromString(keyStr).then(base64 => 
      getKey(base64, algo)
    );
  }
}

export async function encrypt(
  data: ArrayBuffer,
  keyStr: string,
  algo: AlgoType
): Promise<ArrayBuffer> {
  const key = await getKey(keyStr, algo);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const cipher = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  const result = new Uint8Array(iv.length + cipher.byteLength);
  result.set(iv);
  result.set(new Uint8Array(cipher), iv.length);
  
  return result.buffer;
}

export async function decrypt(
  data: ArrayBuffer,
  keyStr: string,
  algo: AlgoType
): Promise<ArrayBuffer> {
  const key = await getKey(keyStr, algo);
  const bytes = new Uint8Array(data);
  const iv = bytes.slice(0, 12);
  const cipher = bytes.slice(12);
  
  return await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    cipher
  );
}