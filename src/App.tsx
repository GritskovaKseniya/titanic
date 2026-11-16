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

// GitHub Pages serves only files that exist on disk (no server-side rewrite),
// so both of these need a matching dist/<route>/index.html — see
// scripts/copy-static-routes.mjs, which copies the built index.html there.
const routePath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
const isAdminRoute = routePath.endsWith('/admin');
const isReconstructionsRoute = routePath.endsWith('/reconstructions');

const Site: React.FC = () => (
  <LanguageProvider>
    <div className="flex flex-col min-h-screen bg-dark text-bone font-sans overflow-clip">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Episodes />
        <About />
        <Details />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  </LanguageProvider>
);

const ReconstructionsPage: React.FC = () => (
  <LanguageProvider>
    <div className="flex flex-col min-h-screen bg-dark text-bone font-sans overflow-clip">
      <Header />
      {/* pt-20/24 clears the fixed header — on the homepage Hero does this
          itself, but here Reconstructions is the first thing on the page. */}
      <main className="flex-grow pt-20 sm:pt-24">
        <Reconstructions />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  </LanguageProvider>
);

const App: React.FC = () => {
  if (isAdminRoute) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-dark" />}>
        <AdminApp />
      </Suspense>
    );
  }
  if (isReconstructionsRoute) return <ReconstructionsPage />;
  return <Site />;
};

export default App;
