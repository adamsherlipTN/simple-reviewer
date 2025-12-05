import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ModeToggle } from './ModeToggle';
import { InputSection } from './InputSection';
import { AddOnsSection } from './AddOnsSection';
import { CohortsSection } from './CohortsSection';
import { AdvancedSettings } from './AdvancedSettings';
import { ResultsPanel } from './ResultsPanel';
import { useCalculator } from '@/hooks/useCalculator';
import { Layers, Package, Settings } from 'lucide-react';

export function Calculator() {
  const {
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
    complexityLabel,
  } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-display text-gradient">
                SWP Implementation Planner
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Estimate costs and timelines for job architecture projects
              </p>
            </div>
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Inputs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core Inputs */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Project Scope</CardTitle>
                    <CardDescription className="text-xs">Define the core parameters</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <InputSection
                  inputs={inputs}
                  updateInput={updateInput}
                  complexityLabel={complexityLabel}
                />
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card className="shadow-sm border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Deliverables</CardTitle>
                    <CardDescription className="text-xs">Select additional services</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AddOnsSection
                  addOns={inputs.addOns}
                  onToggle={toggleAddOn}
                  onUpdateHours={updateAddOnHours}
                  showHours={mode === 'detailed'}
                />
              </CardContent>
            </Card>

            {/* Cohorts - only show if > 1 */}
            {inputs.cohortCount > 1 && (
              <Card className="shadow-sm border-border/50 animate-in">
                <CardContent className="pt-6">
                  <CohortsSection cohorts={inputs.cohorts} onUpdate={updateCohort} />
                </CardContent>
              </Card>
            )}

            {/* Advanced Settings - only in detailed mode */}
            {mode === 'detailed' && (
              <Card className="shadow-sm border-border/50 animate-in">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Advanced Settings</CardTitle>
                      <CardDescription className="text-xs">Fine-tune assumptions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdvancedSettings
                    assumptions={assumptions}
                    onUpdate={updateAssumption}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Results */}
          <div className="lg:col-span-1">
            <ResultsPanel
              results={results}
              assumptions={assumptions}
              clientName={inputs.clientName}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
