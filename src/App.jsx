import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PropertiesPage from '@/pages/PropertiesPage';

import AddPropertyPage from '@/pages/AddPropertyPage';

import { UIProvider } from '@/context/UIContext';
import GlobalOverlay from '@/components/ui/GlobalOverlay';

function App() {
  return (
    <UIProvider>
      <GlobalOverlay />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/add-property" element={<AddPropertyPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UIProvider>
  );
}

export default App;
