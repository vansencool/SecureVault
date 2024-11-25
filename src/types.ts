export type AlgoType = 'AES-128' | 'AES-256';

export interface EncryptProps {
  text: string;
  algo: AlgoType;
  onText: (text: string) => void;
  onAlgo: (algo: AlgoType) => void;
}

export interface KeyProps {
  keyStr: string;
  onKey: (key: string) => void;
  onGen: () => void;
}