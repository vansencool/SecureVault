import { useState, useCallback } from 'react';

const STEPS = {
  small: [
    { percent: 20, delay: 100 },
    { percent: 40, delay: 100 },
    { percent: 60, delay: 100 },
    { percent: 80, delay: 100 },
    { percent: 95, delay: 100 }
  ],
  large: [
    { percent: 10, delay: 200 },
    { percent: 25, delay: 300 },
    { percent: 45, delay: 400 },
    { percent: 65, delay: 500 },
    { percent: 85, delay: 600 },
    { percent: 95, delay: 700 }
  ]
};

export function useProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  const resetProgress = useCallback(() => {
    timeoutIds.forEach(id => window.clearTimeout(id));
    setTimeoutIds([]);
    setProgress(0);
    setStatus('');
  }, [timeoutIds]);

  const startProgress = useCallback((type: string, fileSize: number = 0) => {
    resetProgress();
    const newTimeoutIds: number[] = [];
    const steps = fileSize > 1024 * 1024 ? STEPS.large : STEPS.small;
    
    let totalDelay = 0;
    steps.forEach(({ percent, delay }) => {
      const timeoutId = window.setTimeout(() => {
        setProgress(percent);
        setStatus(`${type === 'encrypt' ? 'Encrypting' : 'Decrypting'}... ${percent}%`);
      }, totalDelay);
      totalDelay += delay;
      newTimeoutIds.push(timeoutId);
    });

    setTimeoutIds(newTimeoutIds);

    return () => {
      resetProgress();
      setProgress(100);
      setStatus('Complete!');
      const finalTimeout = window.setTimeout(() => {
        setProgress(0);
        setStatus('');
      }, 1000);
      setTimeoutIds([finalTimeout]);
    };
  }, [resetProgress]);

  return { progress, status, startProgress, resetProgress };
}