import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { CalculatorInputs, ComplexityLevel } from '@/types/calculator';

interface InputSectionProps {
  inputs: CalculatorInputs;
  updateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  complexityLabel: string;
}

function TooltipLabel({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export function InputSection({ inputs, updateInput, complexityLabel }: InputSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <TooltipLabel label="Client Name" tooltip="Enter the client or project name" />
          <Input
            placeholder="e.g., Acme Corp"
            value={inputs.clientName}
            onChange={(e) => updateInput('clientName', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <TooltipLabel label="Roles to Map" tooltip="Total number of unique roles to be mapped" />
          <Input
            type="number"
            min={1}
            value={inputs.rolesToMap}
            onChange={(e) => updateInput('rolesToMap', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <TooltipLabel label="Job Families" tooltip="Number of job families in scope" />
          <Input
            type="number"
            min={1}
            value={inputs.jobFamilies}
            onChange={(e) => updateInput('jobFamilies', Math.max(1, parseInt(e.target.value) || 1))}
          />
        </div>
        
        <div className="space-y-2">
          <TooltipLabel label="Number of Cohorts" tooltip="Split implementation into cohorts for phased rollout" />
          <Select
            value={String(inputs.cohortCount)}
            onValueChange={(v) => updateInput('cohortCount', parseInt(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map(n => (
                <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'Cohort' : 'Cohorts'}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <TooltipLabel label="Complexity Level" tooltip="Affects review time per role and risk factors" />
          <span className="text-sm font-medium text-primary">{complexityLabel}</span>
        </div>
        <Slider
          value={[inputs.complexity]}
          onValueChange={([v]) => updateInput('complexity', v as ComplexityLevel)}
          min={1}
          max={5}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Very Low</span>
          <span>Very High</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <TooltipLabel label="Execution Mode" tooltip="Parallel executes cohorts simultaneously; Sequential runs them one after another" />
          <Select
            value={inputs.executionMode}
            onValueChange={(v: 'parallel' | 'sequential') => updateInput('executionMode', v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parallel">Parallel</SelectItem>
              <SelectItem value="sequential">Sequential</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <TooltipLabel label="Target End Date" tooltip="Optional deadline for the project" />
          <Input
            type="date"
            value={inputs.targetDate}
            onChange={(e) => updateInput('targetDate', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
