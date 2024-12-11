import { Transaction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TransactionSummaryProps {
  transactions: Transaction[];
}

export function TransactionSummary({ transactions }: TransactionSummaryProps) {
  const totalInflow = transactions
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutflow = transactions
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.amount, 0);

  const categorySummary = transactions.reduce((acc, transaction) => {
    const amount = transaction.type === 'inflow' ? transaction.amount : -transaction.amount;
    acc[transaction.category] = (acc[transaction.category] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categorySummary).map(([name, amount]) => ({
    name,
    amount,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Inflow</h3>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalInflow)}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Outflow</h3>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOutflow)}</p>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Category Summary</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: 'black' }}
              />
              <Bar
                dataKey="amount"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
