import { getStorage, getDownloadURL, ref, uploadBytes, type FirebaseStorage } from 'firebase/storage';
import { app } from '../firebase';

const storage: FirebaseStorage | null = app ? getStorage(app) : null;

/** Uploads a file to Firebase Storage at `path` and returns its public URL. */
export const uploadImage = async (path: string, file: File): Promise<string> => {
  if (!storage) throw new Error('Firebase is not configured — set the VITE_FIREBASE_* env vars first.');
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};
