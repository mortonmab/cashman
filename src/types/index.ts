export interface Transaction {
  id: string;
  type: 'inflow' | 'outflow';
  amount: number;
  timestamp: string;
  referenceNumber: string;
  description: string;
  source?: string;
  recipient?: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Reconciliation {
  id: string;
  date: string;
  systemBalance: number;
  physicalCount: number;
  variance: number;
  notes: string;
  clerkSignature: string;
  supervisorSignature?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'clerk' | 'supervisor';
  signature: string;
}
