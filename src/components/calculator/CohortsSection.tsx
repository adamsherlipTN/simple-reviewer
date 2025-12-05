import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CohortData } from '@/types/calculator';

interface CohortsSectionProps {
  cohorts: CohortData[];
  onUpdate: (id: string, updates: Partial<CohortData>) => void;
}

export function CohortsSection({ cohorts, onUpdate }: CohortsSectionProps) {
  if (cohorts.length <= 1) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Cohort Configuration</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cohorts.map((cohort) => (
          <Card key={cohort.id} className="bg-muted/30 border-border/50">
            <CardContent className="p-4 space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  value={cohort.name}
                  onChange={(e) => onUpdate(cohort.id, { name: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="Cohort name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Roles Share (%)</Label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={cohort.rolesShare}
                    onChange={(e) => onUpdate(cohort.id, { rolesShare: parseInt(e.target.value) || 0 })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <Input
                    type="date"
                    value={cohort.startDate}
                    onChange={(e) => onUpdate(cohort.id, { startDate: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
