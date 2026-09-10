import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  type Firestore,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Subscribes to a Firestore collection and returns its documents, live.
 * Falls back to (and stays on) `defaults` when Firebase isn't configured yet,
 * or the collection is empty — the public site always has something to show.
 */
export function useLiveCollection<T>(collectionName: string, defaults: T[], orderByField?: string): T[] {
  const [items, setItems] = useState<T[]>(defaults);

  useEffect(() => {
    if (!db) return;
    const colRef = orderByField
      ? query(collection(db, collectionName), orderBy(orderByField))
      : collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snap) => {
        if (snap.empty) {
          setItems(defaults);
          return;
        }
        setItems(snap.docs.map((d) => d.data() as T));
      },
      () => setItems(defaults),
    );
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, orderByField]);

  return items;
}

const requireDb = (): Firestore => {
  if (!db) throw new Error('Firebase is not configured — set the VITE_FIREBASE_* env vars first.');
  return db;
};

/** Idempotent: writes each doc by its own id, so calling it twice just overwrites. */
export async function seedCollection<T extends object>(
  collectionName: string,
  docs: { id: string; data: T }[],
): Promise<void> {
  const firestore = requireDb();
  await Promise.all(
    docs.map(({ id, data }) => setDoc(doc(firestore, collectionName, id), data as Record<string, unknown>)),
  );
}

export async function saveDoc<T extends object>(collectionName: string, id: string, data: T): Promise<void> {
  await setDoc(doc(requireDb(), collectionName, id), data as Record<string, unknown>);
}

export async function removeDoc(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(requireDb(), collectionName, id));
}
