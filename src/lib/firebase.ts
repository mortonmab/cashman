import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6PH3maThgVAcJ6B2SSl5TuZUSDjh1aRM",
  authDomain: "cashman-e9ead.firebaseapp.com",
  projectId: "cashman-e9ead",
  storageBucket: "cashman-e9ead.appspot.com",
  messagingSenderId: "495019325930",
  appId: "1:495019325930:web:16abf16dd24383c570da93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings
export const db = getFirestore(app);
export const auth = getAuth(app);

// Log initialization
console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});
