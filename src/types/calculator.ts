export type CalculatorMode = 'quick' | 'detailed';

export type ComplexityLevel = 1 | 2 | 3 | 4 | 5;

export interface AddOn {
  id: string;
  label: string;
  hours: number;
  enabled: boolean;
}

export interface CohortData {
  id: string;
  name: string;
  rolesShare: number;
  startDate: string;
}

export interface CalculatorInputs {
  clientName: string;
  rolesToMap: number;
  jobFamilies: number;
  complexity: ComplexityLevel;
  cohortCount: number;
  targetDate: string;
  executionMode: 'parallel' | 'sequential';
  addOns: AddOn[];
  cohorts: CohortData[];
}

export interface CalculatorResults {
  totalCost: number;
  totalWeeks: number;
  fteEquivalent: number;
  confidenceLevel: 'low' | 'medium' | 'high';
  breakdown: {
    implementation: number;
    enablement: number;
    research: number;
    external: number;
  };
}

export interface Assumptions {
  implementationRate: number;
  enablementRate: number;
  researchRate: number;
  externalRate: number;
  hoursPerRole: number;
  productivityFactor: number;
  workingDaysPerWeek: number;
  currency: string;
  fxRate: number;
}
