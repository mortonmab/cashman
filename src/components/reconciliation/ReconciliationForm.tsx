import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from '@/lib/utils';

interface ReconciliationFormProps {
  systemBalance: number;
  onSubmit: (physicalCount: number, notes: string) => void;
}

export function ReconciliationForm({ systemBalance, onSubmit }: ReconciliationFormProps) {
  const [physicalCount, setPhysicalCount] = useState<string>('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(Number(physicalCount), notes);
    setPhysicalCount('');
    setNotes('');
  };

  const variance = Number(physicalCount) - systemBalance;

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>System Balance</Label>
          <div className="text-2xl font-bold">{formatCurrency(systemBalance)}</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalCount">Physical Cash Count</Label>
          <Input
            id="physicalCount"
            type="number"
            step="0.01"
            required
            value={physicalCount}
            onChange={(e) => setPhysicalCount(e.target.value)}
            placeholder="Enter physical cash count"
          />
        </div>

        {physicalCount && (
          <div className="space-y-2">
            <Label>Variance</Label>
            <div className={`text-xl font-semibold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(variance)}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any notes or explanations for variances"
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Reconciliation
        </Button>
      </form>
    </Card>
  );
}
