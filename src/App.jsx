import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import PropertiesPage from '@/pages/PropertiesPage';

import AddPropertyPage from '@/pages/AddPropertyPage';
import LoginPage from '@/pages/LoginPage';
import BuyerDashboard from '@/pages/dashboard/BuyerDashboard';

import { UIProvider } from '@/context/UIContext';
import GlobalOverlay from '@/components/ui/GlobalOverlay';
import ScrollToTop from '@/components/utils/ScrollToTop';

function App() {
  return (
    <UIProvider>
      <ScrollToTop />
      <GlobalOverlay />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Navbar should probably be conditional, but keeping as is for now unless requested otherwise */}
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/add-property" element={<AddPropertyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard-buyer" element={<BuyerDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </UIProvider>
  );
}

export default App;
