import React, { Suspense, lazy } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Reconstructions } from './components/Reconstructions';
import { Episodes } from './components/Episodes';
import { About } from './components/About';
import { Details } from './components/Details';
import { Footer } from './components/Footer';
import { ThemeSwitcher } from './components/ThemeSwitcher';

// Firebase Auth and every admin form live in this chunk — visitors to the
// public site (the vast majority) never fetch it.
const AdminApp = lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp })));

const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.replace(/\/$/, '').endsWith('/admin');

const Site: React.FC = () => (
  <LanguageProvider>
    <div className="flex flex-col min-h-screen bg-dark text-bone font-sans overflow-clip">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Reconstructions />
        <Episodes />
        <About />
        <Details />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  </LanguageProvider>
);

const App: React.FC = () =>
  isAdminRoute ? (
    <Suspense fallback={<div className="min-h-screen bg-dark" />}>
      <AdminApp />
    </Suspense>
  ) : (
    <Site />
  );

export default App;
