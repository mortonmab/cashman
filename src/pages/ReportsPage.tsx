import { useState } from 'react';
import { Transaction } from '@/types';
import { TransactionSummary } from '@/components/reports/TransactionSummary';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PrinterIcon } from 'lucide-react';

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('today');
  
  // Mock transactions data - in a real app, this would come from your backend
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'inflow',
      amount: 1000,
      timestamp: new Date().toISOString(),
      referenceNumber: 'TXN-001',
      description: 'Daily Sales',
      category: 'sales',
      status: 'approved',
    },
    {
      id: '2',
      type: 'outflow',
      amount: 500,
      timestamp: new Date().toISOString(),
      referenceNumber: 'TXN-002',
      description: 'Office Supplies',
      category: 'expenses',
      status: 'approved',
    },
    {
      id: '3',
      type: 'inflow',
      amount: 750,
      timestamp: new Date().toISOString(),
      referenceNumber: 'TXN-003',
      description: 'Service Fee',
      category: 'services',
      status: 'approved',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Financial Reports</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Time Period:</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handlePrint} variant="outline">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print Report
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium">Transaction Summary Report</h2>
            <p className="text-sm text-muted-foreground">
              Financial overview for {dateRange === 'today' ? 'today' : `this ${dateRange}`}
            </p>
          </div>

          <TransactionSummary transactions={mockTransactions} />
        </div>
      </Card>
    </div>
  );
}
