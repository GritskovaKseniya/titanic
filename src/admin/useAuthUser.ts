import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, type Auth, type User } from 'firebase/auth';
import { app } from '../firebase';

export const auth: Auth | null = app ? getAuth(app) : null;

/** `undefined` while Firebase resolves the session, `null` when signed out. */
export const useAuthUser = (): User | null | undefined => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      return;
    }
    return onAuthStateChanged(auth, setUser);
  }, []);

  return user;
};
