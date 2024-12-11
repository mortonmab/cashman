import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction } from '@/types';

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'status'>) => void;
}

export function TransactionForm({ onSubmit }: TransactionFormProps) {
  const [type, setType] = useState<'inflow' | 'outflow'>('inflow');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const transaction = {
      type,
      amount: Number(formData.get('amount')),
      timestamp: new Date().toISOString(),
      referenceNumber: formData.get('referenceNumber') as string,
      description: formData.get('description') as string,
      source: type === 'inflow' ? formData.get('source') as string : undefined,
      recipient: type === 'outflow' ? formData.get('recipient') as string : undefined,
      category: formData.get('category') as string,
    };

    onSubmit(transaction);
    e.currentTarget.reset();
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Transaction Type</Label>
          <Select value={type} onValueChange={(value: 'inflow' | 'outflow') => setType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inflow">Cash In</SelectItem>
              <SelectItem value="outflow">Cash Out</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            required
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referenceNumber">Reference Number</Label>
          <Input
            id="referenceNumber"
            name="referenceNumber"
            required
            placeholder="Enter reference number"
          />
        </div>

        {type === 'inflow' ? (
          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              name="source"
              required
              placeholder="Enter source"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              name="recipient"
              required
              placeholder="Enter recipient"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select name="category" defaultValue="sales">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="expenses">Expenses</SelectItem>
              <SelectItem value="refunds">Refunds</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            required
            placeholder="Enter description"
          />
        </div>

        <Button type="submit" className="w-full">
          Record Transaction
        </Button>
      </form>
    </Card>
  );
}
