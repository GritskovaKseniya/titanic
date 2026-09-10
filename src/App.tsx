import React from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Episodes } from './components/Episodes';
import { Gallery } from './components/Gallery';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

const App: React.FC = () => (
  <LanguageProvider>
    <div className="flex flex-col min-h-screen bg-dark text-bone font-sans overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Episodes />
        <Gallery />
        <Team />
      </main>
      <Footer />
    </div>
  </LanguageProvider>
);

export default App;
