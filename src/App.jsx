import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// UI & Context
import { UIProvider } from '@/context/UIContext';
import GlobalOverlay from '@/components/ui/GlobalOverlay';
import ScrollToTop from '@/components/utils/ScrollToTop';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Lazy Loaded Pages
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const PropertiesPage = React.lazy(() => import('@/pages/PropertiesPage'));
const PropertyDetailsPage = React.lazy(() => import('@/pages/PropertyDetailsPage'));
const AddPropertyPage = React.lazy(() => import('@/pages/AddPropertyPage'));
const UserProfilePage = React.lazy(() => import('@/pages/profile/UserProfilePage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const BuyerDashboard = React.lazy(() => import('@/pages/dashboard/BuyerDashboard'));

function App() {
  return (
    <UIProvider>
      <ScrollToTop />
      <GlobalOverlay />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard-buyer" element={<BuyerDashboard />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </UIProvider>
  );
}

export default App;
