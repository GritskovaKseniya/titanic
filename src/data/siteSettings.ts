import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface SiteSettings {
  contactEmail: string;
  socialLinks: SocialLink[];
}

export const defaultSiteSettings: SiteSettings = {
  contactEmail: 'hello@example.com',
  socialLinks: [{ id: 'instagram', label: 'Instagram', url: 'https://instagram.com/' }],
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
      (snap) => setSettings(snap.exists() ? (snap.data() as SiteSettings) : defaultSiteSettings),
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
