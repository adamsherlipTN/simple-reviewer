import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Check } from 'lucide-react';
import type { AddOn } from '@/types/calculator';

interface AddOnsSectionProps {
  addOns: AddOn[];
  onToggle: (id: string) => void;
  onUpdateHours: (id: string, hours: number) => void;
  showHours?: boolean;
}

export function AddOnsSection({ addOns, onToggle, onUpdateHours, showHours = false }: AddOnsSectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Add-ons & Deliverables</h3>
      <div className="flex flex-wrap gap-2">
        {addOns.map((addon) => (
          <button
            key={addon.id}
            onClick={() => onToggle(addon.id)}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
              addon.enabled
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/50 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <div className={cn(
              "flex items-center justify-center w-4 h-4 rounded-sm transition-colors",
              addon.enabled ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
            )}>
              {addon.enabled && <Check className="h-3 w-3" />}
            </div>
            {addon.label}
            {showHours && addon.enabled && (
              <Input
                type="number"
                value={addon.hours}
                onChange={(e) => {
                  e.stopPropagation();
                  onUpdateHours(addon.id, parseInt(e.target.value) || 0);
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-16 h-6 text-xs ml-1"
                min={0}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
