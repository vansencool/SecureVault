interface ProgressProps {
  progress: number;
  status: string;
}

export function ProgressBar({ progress, status }: ProgressProps) {
  if (progress === 0 || progress === 100) return null;
  
  return (
    <div className="space-y-2">
      <div className="h-2 bg-[#161B22] rounded overflow-hidden">
        <div 
          className="h-full bg-[#238636] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-[#8b949e]">{status} ({Math.round(progress)}%)</p>
    </div>
  );
}