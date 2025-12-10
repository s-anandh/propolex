import React from 'react';
import { User, Briefcase, Scale, Calculator, Wrench, Palette } from 'lucide-react';

const VendorSection = () => {
    const vendors = [
        { id: 1, name: 'Owners', icon: <User className="h-6 w-6" />, count: 'Free Listing' },
        { id: 2, name: 'Agents', icon: <Briefcase className="h-6 w-6" />, count: 'Verified Pros' },
        { id: 3, name: 'Legal Experts', icon: <Scale className="h-6 w-6" />, count: 'Due Diligence' },
        { id: 4, name: 'Valuators', icon: <Calculator className="h-6 w-6" />, count: 'Fair Price' },
        { id: 5, name: 'Loan Providers', icon: <Wrench className="h-6 w-6" />, count: 'Low Interest' }, // Wrench as placeholder for service/tool
        { id: 6, name: 'Designers', icon: <Palette className="h-6 w-6" />, count: 'Interiors' },
    ];

    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-primary-600 font-semibold tracking-wider text-sm uppercase mb-2 block">
                            The Ecosystem
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Connect with Real Estate Experts
                        </h2>
                        <p className="text-lg text-slate-600 mt-4">
                            A complete multivendor platform bringing together everyone you need for your property journey.
                        </p>
                    </div>
                    <button className="text-primary-700 font-semibold hover:text-primary-800 transition-colors">
                        View All Categories &rarr;
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {vendors.map((vendor) => (
                        <div
                            key={vendor.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer hover:border-primary-100 group"
                        >
                            <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                {vendor.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1">{vendor.name}</h3>
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                {vendor.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VendorSection;
