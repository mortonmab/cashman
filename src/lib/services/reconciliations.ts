import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  where 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Reconciliation } from '@/types';

const COLLECTION = 'reconciliations';

export const reconciliationsService = {
  async create(reconciliation: Omit<Reconciliation, 'id' | 'status' | 'submittedAt'>): Promise<Reconciliation> {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...reconciliation,
      status: 'pending',
      submittedAt: Timestamp.fromDate(new Date()),
      date: Timestamp.fromDate(new Date(reconciliation.date))
    });

    return {
      id: docRef.id,
      ...reconciliation,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
  },

  async getAll(): Promise<Reconciliation[]> {
    const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: (doc.data().date as Timestamp).toDate().toISOString(),
      submittedAt: (doc.data().submittedAt as Timestamp).toDate().toISOString(),
      approvedAt: doc.data().approvedAt ? 
        (doc.data().approvedAt as Timestamp).toDate().toISOString() : 
        undefined
    })) as Reconciliation[];
  },

  async approve(
    id: string, 
    supervisorSignature: string
  ): Promise<void> {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      status: 'approved',
      supervisorSignature,
      approvedAt: Timestamp.fromDate(new Date())
    });
  },

  async reject(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      status: 'rejected'
    });
  }
};
