import { cn } from '@/lib/utils';
import type { CalculatorMode } from '@/types/calculator';
import { Zap, Settings2 } from 'lucide-react';

interface ModeToggleProps {
  mode: CalculatorMode;
  onChange: (mode: CalculatorMode) => void;
}

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-muted p-1 gap-1">
      <button
        onClick={() => onChange('quick')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
          mode === 'quick'
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Zap className="h-4 w-4" />
        Quick Estimate
      </button>
      <button
        onClick={() => onChange('detailed')}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
          mode === 'detailed'
            ? "bg-card text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Settings2 className="h-4 w-4" />
        Detailed Plan
      </button>
    </div>
  );
}
