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
    try {
      console.log('Creating transaction with data:', transaction);

      // Validate required fields
      if (!transaction.amount || !transaction.description || !transaction.type || !transaction.category) {
        throw new Error('Missing required fields');
      }

      // Create Firestore document data
      const firestoreData = {
        amount: Number(transaction.amount),
        description: transaction.description,
        type: transaction.type,
        category: transaction.category,
        referenceNumber: transaction.referenceNumber,
        timestamp: Timestamp.fromDate(new Date(transaction.timestamp)),
        status: 'pending',
        ...(transaction.type === 'inflow' ? { source: transaction.source } : { recipient: transaction.recipient })
      };

      console.log('Firestore data to be saved:', firestoreData);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, COLLECTION), firestoreData);
      console.log('Document written with ID:', docRef.id);

      // Return the complete transaction object
      const newTransaction: Transaction = {
        id: docRef.id,
        ...transaction,
        status: 'pending'
      };

      console.log('Returning new transaction:', newTransaction);
      return newTransaction;

    } catch (error) {
      console.error('Error in transactionsService.create:', error);
      throw error;
    }
  },

  async getAll(): Promise<Transaction[]> {
    try {
      console.log('Fetching all transactions');
      const q = query(
        collection(db, COLLECTION), 
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Found documents:', querySnapshot.size);
      
      const transactions = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate().toISOString(),
          amount: Number(data.amount),
          type: data.type,
          status: data.status || 'pending',
          description: data.description,
          category: data.category,
          referenceNumber: data.referenceNumber,
          source: data.source,
          recipient: data.recipient
        } as Transaction;
      });

      console.log('Processed transactions:', transactions);
      return transactions;

    } catch (error) {
      console.error('Error in transactionsService.getAll:', error);
      throw error;
    }
  },

  async getByDateRange(startDate: Date, endDate: Date): Promise<Transaction[]> {
    try {
      console.log('Fetching transactions for date range:', { startDate, endDate });
      
      const q = query(
        collection(db, COLLECTION),
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate)),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      console.log('Found documents in date range:', querySnapshot.size);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate().toISOString()
        } as Transaction;
      });

    } catch (error) {
      console.error('Error in transactionsService.getByDateRange:', error);
      throw error;
    }
  },

  async updateStatus(id: string, status: Transaction['status']): Promise<void> {
    try {
      console.log('Updating transaction status:', { id, status });
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, { status });
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error in transactionsService.updateStatus:', error);
      throw error;
    }
  }
};
