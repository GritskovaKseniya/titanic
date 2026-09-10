import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Values come from repo/CI env vars (VITE_FIREBASE_*) — see .env.example and
// README's "Настройка Firebase" section. Firebase's web config is not a
// secret: it names the project, it doesn't grant access. Reads/writes are
// gated by firestore.rules / storage.rules instead.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Only the app + Firestore are initialized eagerly — the public site reads
// live content but never signs in or uploads. Auth and Storage are pulled in
// by src/admin/* (getAuth/getStorage against this same `app`), which is
// loaded as its own chunk only when someone visits /admin.
export const app: FirebaseApp | null = firebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
