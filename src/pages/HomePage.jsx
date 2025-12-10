import React from 'react';
import HeroSection from '@/features/properties/components/HeroSection';
import CategorySection from '@/features/properties/components/CategorySection';
import VendorSection from '@/features/vendors/components/VendorSection';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 1. Hero Section (Search & Background) */}
            <HeroSection />

            {/* 2. Property Categories (Houses, Villas, etc.) */}
            <CategorySection />

            {/* 3. Boosted Listings Placeholder (Carousel) */}
            <div className="py-12 bg-white border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">PREMIUM</span>
                        <h3 className="text-xl font-bold text-slate-900">Boosted Properties</h3>
                    </div>
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-64 flex items-center justify-center text-slate-400 font-medium">
                        Boosted Listings Carousel Module (Coming Soon)
                    </div>
                </div>
            </div>

            {/* 4. Vendor Categories (Multivendor) */}
            <VendorSection />

            {/* 5. CTA Section */}
            <div className="bg-primary-900 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Start Your Journey with Prop O Lex</h2>
                    <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                        Whether you are buying, selling, or looking for legal advice, we have the right experts for you.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-primary-900 px-8 py-3 rounded-lg font-bold hover:bg-primary-50 transition-colors">
                            List Your Property
                        </button>
                        <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors">
                            Find an Agent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
