import { Reconciliation } from '@/types';
import { formatCurrency } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ReconciliationHistoryProps {
  reconciliations: Reconciliation[];
}

export function ReconciliationHistory({ reconciliations }: ReconciliationHistoryProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>System Balance</TableHead>
            <TableHead>Physical Count</TableHead>
            <TableHead>Variance</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reconciliations.map((reconciliation) => (
            <TableRow key={reconciliation.id}>
              <TableCell>{new Date(reconciliation.date).toLocaleDateString()}</TableCell>
              <TableCell>{formatCurrency(reconciliation.systemBalance)}</TableCell>
              <TableCell>{formatCurrency(reconciliation.physicalCount)}</TableCell>
              <TableCell className={reconciliation.variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(reconciliation.variance)}
              </TableCell>
              <TableCell>
                <Badge variant={
                  reconciliation.status === 'approved' ? 'default' :
                  reconciliation.status === 'rejected' ? 'destructive' : 'secondary'
                }>
                  {reconciliation.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
