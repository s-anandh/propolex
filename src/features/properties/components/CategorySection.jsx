import React from 'react';
import { Home, Building2, Building, Scale, Map, ArrowRight } from 'lucide-react';

const CategorySection = () => {
    const categories = [
        {
            id: 1,
            name: 'Individual Houses',
            desc: 'Buy, Sell, Lease, Rent',
            icon: <Home className="h-8 w-8 text-primary-600" />,
            color: 'bg-blue-50'
        },
        {
            id: 2,
            name: 'Villas',
            desc: 'Pre-launch & Resale',
            icon: <Building2 className="h-8 w-8 text-primary-600" />,
            color: 'bg-indigo-50'
        },
        {
            id: 3,
            name: 'Apartments',
            desc: 'Ready-to-move & New',
            icon: <Building className="h-8 w-8 text-primary-600" />,
            color: 'bg-sky-50'
        },
        {
            id: 4,
            name: 'Plots',
            desc: 'Up to 20,000 sq ft',
            icon: <Map className="h-8 w-8 text-primary-600" />,
            color: 'bg-emerald-50'
        },
        {
            id: 5,
            name: 'Lands',
            desc: '20,000 sq ft - 200 Acres',
            icon: <Scale className="h-8 w-8 text-primary-600" />, // Scale representing vast land/legal
            color: 'bg-teal-50'
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Explore Properties by Category
                    </h2>
                    <p className="text-lg text-slate-600">
                        Find the perfect property type that suits your investment goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                        >
                            <div className={`inline-flex items-center justify-center p-4 rounded-xl ${cat.color} mb-6 transition-colors group-hover:bg-primary-50`}>
                                {cat.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">
                                {cat.name}
                            </h3>

                            <p className="text-sm text-slate-500 mb-4">
                                {cat.desc}
                            </p>

                            <div className="flex items-center text-primary-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                                Explore <ArrowRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
