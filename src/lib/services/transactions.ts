import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  where,
  DocumentData,
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Transaction } from '@/types';

const COLLECTION = 'transactions';

export const transactionsService = {
  async create(transaction: Omit<Transaction, 'id' | 'status'>): Promise<Transaction> {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...transaction,
      status: 'pending',
      timestamp: Timestamp.fromDate(new Date(transaction.timestamp))
    });

    return {
      id: docRef.id,
      ...transaction,
      status: 'pending'
    };
  },

  async getAll(): Promise<Transaction[]> {
    const q = query(collection(db, COLLECTION), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: (doc.data().timestamp as Timestamp).toDate().toISOString()
    })) as Transaction[];
  },

  async getByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    const q = query(
      collection(db, COLLECTION),
      where('timestamp', '>=', Timestamp.fromDate(startDate)),
      where('timestamp', '<=', Timestamp.fromDate(endDate)),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: (doc.data().timestamp as Timestamp).toDate().toISOString()
    })) as Transaction[];
  },

  async updateStatus(id: string, status: Transaction['status']): Promise<void> {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, { status });
  }
};
