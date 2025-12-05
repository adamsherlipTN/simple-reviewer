import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Assumptions } from '@/types/calculator';

interface AdvancedSettingsProps {
  assumptions: Assumptions;
  onUpdate: <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;
}

export function AdvancedSettings({ assumptions, onUpdate }: AdvancedSettingsProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="rates" className="border-border/50">
        <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
          Team Rates & Currency
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Implementation ($/hr)</Label>
              <Input
                type="number"
                value={assumptions.implementationRate}
                onChange={(e) => onUpdate('implementationRate', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Enablement ($/hr)</Label>
              <Input
                type="number"
                value={assumptions.enablementRate}
                onChange={(e) => onUpdate('enablementRate', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Research ($/hr)</Label>
              <Input
                type="number"
                value={assumptions.researchRate}
                onChange={(e) => onUpdate('researchRate', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">External ($/hr)</Label>
              <Input
                type="number"
                value={assumptions.externalRate}
                onChange={(e) => onUpdate('externalRate', parseInt(e.target.value) || 0)}
                className="h-8 text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Currency</Label>
              <Select value={assumptions.currency} onValueChange={(v) => onUpdate('currency', v)}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">FX Rate</Label>
              <Input
                type="number"
                step="0.01"
                value={assumptions.fxRate}
                onChange={(e) => onUpdate('fxRate', parseFloat(e.target.value) || 1)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="productivity" className="border-border/50">
        <AccordionTrigger className="text-sm font-medium hover:no-underline py-3">
          Productivity & Scheduling
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Hours per Role</Label>
              <Input
                type="number"
                step="0.5"
                value={assumptions.hoursPerRole}
                onChange={(e) => onUpdate('hoursPerRole', parseFloat(e.target.value) || 1)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Productivity Factor</Label>
              <Input
                type="number"
                step="0.05"
                min={0.1}
                max={1}
                value={assumptions.productivityFactor}
                onChange={(e) => onUpdate('productivityFactor', parseFloat(e.target.value) || 0.85)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Working Days/Week</Label>
              <Input
                type="number"
                min={1}
                max={7}
                value={assumptions.workingDaysPerWeek}
                onChange={(e) => onUpdate('workingDaysPerWeek', parseInt(e.target.value) || 5)}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
