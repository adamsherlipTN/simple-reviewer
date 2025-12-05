import { useState, useMemo } from 'react';
import type { 
  CalculatorMode, 
  CalculatorInputs, 
  CalculatorResults, 
  Assumptions,
  AddOn,
  CohortData
} from '@/types/calculator';

const DEFAULT_ADD_ONS: AddOn[] = [
  { id: 'architecture', label: 'Job Architecture', hours: 24, enabled: false },
  { id: 'change', label: 'Change & Communications', hours: 16, enabled: false },
  { id: 'training', label: 'Training & Enablement', hours: 12, enabled: true },
  { id: 'integrations', label: 'Integrations (SSO, APIs)', hours: 24, enabled: false },
  { id: 'governance', label: 'Governance Sprints', hours: 20, enabled: false },
];

const DEFAULT_ASSUMPTIONS: Assumptions = {
  implementationRate: 175,
  enablementRate: 150,
  researchRate: 125,
  externalRate: 200,
  hoursPerRole: 2.5,
  productivityFactor: 0.85,
  workingDaysPerWeek: 5,
  currency: 'USD',
  fxRate: 1,
};

const COMPLEXITY_MULTIPLIERS = {
  1: 0.7,  // Very Low
  2: 0.85, // Low
  3: 1,    // Medium
  4: 1.25, // High
  5: 1.5,  // Very High
};

const COMPLEXITY_LABELS = {
  1: 'Very Low',
  2: 'Low',
  3: 'Normal',
  4: 'High',
  5: 'Very High',
};

export function useCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('quick');
  
  const [inputs, setInputs] = useState<CalculatorInputs>({
    clientName: '',
    rolesToMap: 100,
    jobFamilies: 10,
    complexity: 3,
    cohortCount: 1,
    targetDate: '',
    executionMode: 'parallel',
    addOns: DEFAULT_ADD_ONS,
    cohorts: [{ id: '1', name: 'Cohort 1', rolesShare: 100, startDate: '' }],
  });

  const [assumptions, setAssumptions] = useState<Assumptions>(DEFAULT_ASSUMPTIONS);

  const updateInput = <K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs(prev => {
      const newInputs = { ...prev, [key]: value };
      
      // Auto-manage cohorts when count changes
      if (key === 'cohortCount') {
        const count = value as number;
        const sharePerCohort = Math.floor(100 / count);
        const newCohorts: CohortData[] = [];
        
        for (let i = 0; i < count; i++) {
          const existing = prev.cohorts[i];
          newCohorts.push({
            id: String(i + 1),
            name: existing?.name || `Cohort ${i + 1}`,
            rolesShare: i === count - 1 ? 100 - (sharePerCohort * (count - 1)) : sharePerCohort,
            startDate: existing?.startDate || '',
          });
        }
        newInputs.cohorts = newCohorts;
      }
      
      return newInputs;
    });
  };

  const toggleAddOn = (id: string) => {
    setInputs(prev => ({
      ...prev,
      addOns: prev.addOns.map(addon =>
        addon.id === id ? { ...addon, enabled: !addon.enabled } : addon
      ),
    }));
  };

  const updateAddOnHours = (id: string, hours: number) => {
    setInputs(prev => ({
      ...prev,
      addOns: prev.addOns.map(addon =>
        addon.id === id ? { ...addon, hours } : addon
      ),
    }));
  };

  const updateCohort = (id: string, updates: Partial<CohortData>) => {
    setInputs(prev => ({
      ...prev,
      cohorts: prev.cohorts.map(cohort =>
        cohort.id === id ? { ...cohort, ...updates } : cohort
      ),
    }));
  };

  const updateAssumption = <K extends keyof Assumptions>(
    key: K,
    value: Assumptions[K]
  ) => {
    setAssumptions(prev => ({ ...prev, [key]: value }));
  };

  const results = useMemo<CalculatorResults>(() => {
    const complexityMult = COMPLEXITY_MULTIPLIERS[inputs.complexity];
    const baseHours = inputs.rolesToMap * assumptions.hoursPerRole * complexityMult;
    const adjustedHours = baseHours / assumptions.productivityFactor;
    
    // Add-on hours
    const addOnHours = inputs.addOns
      .filter(a => a.enabled)
      .reduce((sum, a) => sum + a.hours, 0);
    
    // Team breakdown (approximate split)
    const implementationHours = adjustedHours * 0.5;
    const enablementHours = adjustedHours * 0.2 + addOnHours * 0.6;
    const researchHours = adjustedHours * 0.2;
    const externalHours = adjustedHours * 0.1 + addOnHours * 0.4;
    
    const breakdown = {
      implementation: Math.round(implementationHours * assumptions.implementationRate),
      enablement: Math.round(enablementHours * assumptions.enablementRate),
      research: Math.round(researchHours * assumptions.researchRate),
      external: Math.round(externalHours * assumptions.externalRate),
    };
    
    const totalCost = Object.values(breakdown).reduce((a, b) => a + b, 0) * assumptions.fxRate;
    
    // Timeline calculation
    const totalHours = adjustedHours + addOnHours;
    const hoursPerWeek = assumptions.workingDaysPerWeek * 8;
    const parallelFactor = inputs.executionMode === 'parallel' ? 0.6 : 1;
    const cohortFactor = inputs.cohortCount > 1 
      ? (inputs.executionMode === 'parallel' ? 1.2 : inputs.cohortCount * 0.7)
      : 1;
    
    const totalWeeks = Math.ceil((totalHours / hoursPerWeek) * parallelFactor * cohortFactor);
    
    // FTE equivalent
    const fteEquivalent = totalHours / (40 * totalWeeks) || 0;
    
    // Confidence based on complexity and inputs completeness
    let confidenceLevel: 'low' | 'medium' | 'high' = 'medium';
    if (inputs.complexity <= 2 && inputs.rolesToMap <= 200) {
      confidenceLevel = 'high';
    } else if (inputs.complexity >= 4 || inputs.rolesToMap > 500) {
      confidenceLevel = 'low';
    }
    
    return {
      totalCost: Math.round(totalCost),
      totalWeeks,
      fteEquivalent: Math.round(fteEquivalent * 10) / 10,
      confidenceLevel,
      breakdown,
    };
  }, [inputs, assumptions]);

  return {
    mode,
    setMode,
    inputs,
    updateInput,
    toggleAddOn,
    updateAddOnHours,
    updateCohort,
    assumptions,
    updateAssumption,
    results,
    complexityLabel: COMPLEXITY_LABELS[inputs.complexity],
  };
}
