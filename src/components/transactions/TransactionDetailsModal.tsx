import { Transaction } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PrinterIcon } from 'lucide-react';

interface TransactionDetailsModalProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsModal({ 
  transaction, 
  open, 
  onOpenChange 
}: TransactionDetailsModalProps) {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Transaction Details</span>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <PrinterIcon className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 print:p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Reference Number</p>
              <p className="font-medium">{transaction.referenceNumber}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium capitalize">{transaction.type}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-muted-foreground">Amount</p>
              <p className={`font-medium ${
                transaction.type === 'inflow' ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(transaction.amount)}
              </p>
            </div>
            
            <div className="space-y-1">
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium capitalize">{transaction.category}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{transaction.status}</p>
            </div>
            
            {transaction.source && (
              <div className="space-y-1 col-span-2">
                <p className="text-muted-foreground">Source</p>
                <p className="font-medium">{transaction.source}</p>
              </div>
            )}
            
            {transaction.recipient && (
              <div className="space-y-1 col-span-2">
                <p className="text-muted-foreground">Recipient</p>
                <p className="font-medium">{transaction.recipient}</p>
              </div>
            )}
            
            <div className="space-y-1 col-span-2">
              <p className="text-muted-foreground">Description</p>
              <p className="font-medium">{transaction.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
