import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Transaction } from '@/types';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { TransactionList } from '@/components/transactions/TransactionList';
import { Card } from '@/components/ui/card';
import { transactionsService } from '@/lib/services/transactions';

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await transactionsService.getAll();
      setTransactions(data);
    } catch (error) {
      console.error('Load transactions error:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (transactionData: Omit<Transaction, 'id' | 'status'>) => {
    try {
      console.log('Submitting transaction data:', transactionData);
      const newTransaction = await transactionsService.create(transactionData);
      console.log('Transaction created:', newTransaction);
      setTransactions(prev => [newTransaction, ...prev]);
      toast.success('Transaction recorded successfully');
    } catch (error) {
      console.error('Create transaction error:', error);
      toast.error(`Failed to record transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const runningBalance = transactions.reduce(
    (sum, transaction) => 
      sum + (transaction.type === 'inflow' ? transaction.amount : -transaction.amount),
    0
  );

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Daily Transactions</h1>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Running Balance</p>
          <p className={`text-2xl font-bold ${runningBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(runningBalance).toFixed(2)}
          </p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TransactionForm onSubmit={handleSubmit} />
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
