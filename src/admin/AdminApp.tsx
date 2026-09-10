import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { LogOut } from 'lucide-react';
import { auth, useAuthUser } from './useAuthUser';
import { Login } from './Login';
import { EpisodesAdmin } from './EpisodesAdmin';
import { GalleryAdmin } from './GalleryAdmin';
import { TeamAdmin } from './TeamAdmin';
import { SettingsAdmin } from './SettingsAdmin';

type Tab = 'episodes' | 'gallery' | 'team' | 'settings';

const TABS: { key: Tab; label: string }[] = [
  { key: 'episodes', label: 'Серии' },
  { key: 'gallery', label: 'Галерея' },
  { key: 'team', label: 'Команда' },
  { key: 'settings', label: 'Соцсети и контакты' },
];

export const AdminApp: React.FC = () => {
  const user = useAuthUser();
  const [tab, setTab] = useState<Tab>('episodes');

  if (user === undefined) {
    return <div className="min-h-screen bg-dark" />;
  }
  if (user === null) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-dark text-bone font-sans">
      <header className="sticky top-0 z-10 bg-dark/95 backdrop-blur-md border-b hairline">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0 overflow-x-auto">
            <span className="font-heading uppercase text-sm text-bone shrink-0">Админка</span>
            <nav className="flex items-center gap-5 shrink-0">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`font-mono text-[11px] uppercase tracking-[0.1em] whitespace-nowrap transition-colors ${
                    tab === t.key ? 'text-accent' : 'text-ash hover:text-bone'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={() => auth && signOut(auth)}
            className="flex items-center gap-1.5 text-ash hover:text-bone transition-colors text-xs shrink-0"
          >
            <LogOut className="w-4 h-4" /> Выйти
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        {tab === 'episodes' && <EpisodesAdmin />}
        {tab === 'gallery' && <GalleryAdmin />}
        {tab === 'team' && <TeamAdmin />}
        {tab === 'settings' && <SettingsAdmin />}
      </main>
    </div>
  );
};
