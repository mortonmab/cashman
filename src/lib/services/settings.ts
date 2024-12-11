import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface OrganizationSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  defaultPageSize: number;
}

const SETTINGS_DOC_ID = 'organization';

export const settingsService = {
  async getSettings(): Promise<OrganizationSettings | null> {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as OrganizationSettings;
    }
    
    return null;
  },

  async updateSettings(settings: OrganizationSettings): Promise<void> {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(docRef, settings);
  }
};
