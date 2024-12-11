import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6PH3maThgVAcJ6B2SSl5TuZUSDjh1aRM",
  authDomain: "cashman-e9ead.firebaseapp.com",
  databaseURL: "https://cashman-e9ead-default-rtdb.firebaseio.com",
  projectId: "cashman-e9ead",
  storageBucket: "cashman-e9ead.firebasestorage.app",
  messagingSenderId: "495019325930",
  appId: "1:495019325930:web:16abf16dd24383c570da93",
  measurementId: "G-EQLXD9T67Z"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
