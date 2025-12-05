import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, Users, TrendingUp, Download, Copy, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CalculatorResults, Assumptions } from '@/types/calculator';
import { toast } from '@/hooks/use-toast';

interface ResultsPanelProps {
  results: CalculatorResults;
  assumptions: Assumptions;
  clientName: string;
}

function formatCurrency(value: number, currency: string): string {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' };
  const symbol = symbols[currency] || '$';
  return `${symbol}${value.toLocaleString()}`;
}

const confidenceColors = {
  low: 'bg-warning/15 text-warning border-warning/30',
  medium: 'bg-accent text-accent-foreground border-accent-foreground/20',
  high: 'bg-success/15 text-success border-success/30',
};

const confidenceLabels = {
  low: 'Low Confidence',
  medium: 'Medium Confidence',
  high: 'High Confidence',
};

export function ResultsPanel({ results, assumptions, clientName }: ResultsPanelProps) {
  const handleCopy = () => {
    const summary = `
SWP Estimate for ${clientName || 'Client'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Cost: ${formatCurrency(results.totalCost, assumptions.currency)}
Timeline: ${results.totalWeeks} weeks
Team Size: ${results.fteEquivalent} FTE
Confidence: ${confidenceLabels[results.confidenceLevel]}

Cost Breakdown:
• Implementation: ${formatCurrency(results.breakdown.implementation, assumptions.currency)}
• Enablement: ${formatCurrency(results.breakdown.enablement, assumptions.currency)}
• Research: ${formatCurrency(results.breakdown.research, assumptions.currency)}
• External: ${formatCurrency(results.breakdown.external, assumptions.currency)}
    `.trim();

    navigator.clipboard.writeText(summary);
    toast({ title: 'Copied to clipboard', description: 'Estimate summary copied successfully' });
  };

  const handleExport = () => {
    toast({ title: 'Export started', description: 'Generating PPT one-pager...' });
    // Export logic would go here
  };

  return (
    <Card className="bg-card shadow-lg border-border/50 sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display">Results</CardTitle>
          <Badge 
            variant="outline" 
            className={cn("text-xs font-medium", confidenceColors[results.confidenceLevel])}
          >
            {confidenceLabels[results.confidenceLevel]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main metrics */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs opacity-80">Total Cost</p>
              <p className="text-2xl font-bold font-display">
                {formatCurrency(results.totalCost, assumptions.currency)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Timeline</p>
                <p className="text-lg font-semibold">{results.totalWeeks} weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Team Size</p>
                <p className="text-lg font-semibold">{results.fteEquivalent} FTE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5" />
            Cost Breakdown
          </div>
          <div className="space-y-1.5 text-sm">
            {Object.entries(results.breakdown).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
                <span className="capitalize text-muted-foreground">{key}</span>
                <span className="font-medium">{formatCurrency(value, assumptions.currency)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2">
          <Button onClick={handleExport} className="w-full bg-gradient-primary hover:opacity-90">
            <FileText className="h-4 w-4 mr-2" />
            Export PPT
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              CSV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
