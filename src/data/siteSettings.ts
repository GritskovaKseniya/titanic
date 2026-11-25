import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface SiteSettings {
  /** Series trailer for the hero's "Watch Trailer" button (Vimeo link with its privacy hash). Empty → the button scrolls to the episodes instead. */
  trailerVimeoId: string;
  contactEmail: string;
  socialLinks: SocialLink[];
}

export const defaultSiteSettings: SiteSettings = {
  trailerVimeoId: 'https://vimeo.com/1249566787/b77a078510',
  contactEmail: 'marmelaicorp@gmail.com',
  socialLinks: [
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/titanictvseries' },
    { id: 'x', label: 'X', url: 'https://x.com/TitanicTvseries' },
    { id: 'threads', label: 'Threads', url: 'https://www.threads.com/@titanictvseries' },
  ],
};

const SETTINGS_DOC = ['site', 'settings'] as const;

/** Live site-wide settings (contact + social links) from Firestore. */
export const useSiteSettings = (): SiteSettings => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    if (!db) return;
    const ref = doc(db, ...SETTINGS_DOC);
    return onSnapshot(
      ref,
      // Merge over the defaults so a field added after the doc was saved
      // (e.g. trailerVimeoId) still has a value instead of going undefined.
      (snap) => setSettings(snap.exists() ? { ...defaultSiteSettings, ...(snap.data() as Partial<SiteSettings>) } : defaultSiteSettings),
      () => setSettings(defaultSiteSettings),
    );
  }, []);

  return settings;
};

export const saveSiteSettings = async (settings: SiteSettings): Promise<void> => {
  if (!db) throw new Error('Firebase is not configured — set the VITE_FIREBASE_* env vars first.');
  await setDoc(doc(db, ...SETTINGS_DOC), settings);
};

export const seedSiteSettings = (): Promise<void> => saveSiteSettings(defaultSiteSettings);
