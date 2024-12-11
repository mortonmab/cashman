import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Reconciliation } from '@/types';
import { ReconciliationForm } from '@/components/reconciliation/ReconciliationForm';
import { ReconciliationHistory } from '@/components/reconciliation/ReconciliationHistory';
import { reconciliationsService } from '@/lib/services/reconciliations';
import { transactionsService } from '@/lib/services/transactions';

export function ReconciliationPage() {
  const [reconciliations, setReconciliations] = useState<Reconciliation[]>([]);
  const [systemBalance, setSystemBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [reconData, transData] = await Promise.all([
        reconciliationsService.getAll(),
        transactionsService.getAll()
      ]);
      
      setReconciliations(reconData);
      
      // Calculate system balance from approved transactions
      const balance = transData
        .filter(t => t.status === 'approved')
        .reduce((sum, t) => sum + (t.type === 'inflow' ? t.amount : -t.amount), 0);
      
      setSystemBalance(balance);
    } catch (error) {
      toast.error('Failed to load data');
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (physicalCount: number, notes: string) => {
    try {
      const newReconciliation = await reconciliationsService.create({
        date: new Date().toISOString(),
        systemBalance,
        physicalCount,
        variance: physicalCount - systemBalance,
        notes,
        clerkSignature: 'John Doe', // This should come from auth context
      });

      setReconciliations(prev => [newReconciliation, ...prev]);
      toast.success('Reconciliation submitted successfully');
    } catch (error) {
      toast.error('Failed to submit reconciliation');
      console.error('Error creating reconciliation:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Daily Reconciliation</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ReconciliationForm
          systemBalance={systemBalance}
          onSubmit={handleSubmit}
        />
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Reconciliation History</h2>
          <ReconciliationHistory reconciliations={reconciliations} />
        </div>
      </div>
    </div>
  );
}
