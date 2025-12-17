import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ALL_PROPERTIES } from '@/data/mockProperties';
import PropertyGallery from '@/features/properties/components/PropertyGallery';
import PropertyInfo from '@/features/properties/components/PropertyInfo';
import PropertyCard from '@/components/properties/PropertyCard';
import RecommendedProperties from '@/features/properties/components/RecommendedProperties';
import { Phone, Mail, MessageCircle, Heart, Share2, ArrowLeft, ShieldCheck } from 'lucide-react';

const PropertyDetailsPage = () => {
    const { id } = useParams();
    const propertyId = parseInt(id);

    // Find Property
    const property = ALL_PROPERTIES.find(p => p.id === propertyId);

    // Recommended Properties (Filter out current, show all others)
    const recommended = ALL_PROPERTIES.filter(p => p.id !== propertyId);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
                <Link to="/properties" className="text-violet-600 hover:underline">Back to Listings</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Breadcrumb / Back Navigation */}
                <div className="mb-6">
                    <Link to="/properties" className="inline-flex items-center text-slate-500 hover:text-violet-600 transition-colors font-medium">
                        <ArrowLeft size={18} className="mr-2" />
                        Back to Properties
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Main Content (Left Column) */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
                        <PropertyGallery images={property.images} />
                        <PropertyInfo property={property} />
                    </div>

                    {/* Sidebar (Right Column) - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24 space-y-6 animate-slide-in-right">

                            {/* Price Card */}
                            <div>
                                <p className="text-slate-500 text-sm font-medium mb-1">Total Price</p>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-3xl font-bold text-slate-900">₹{property.price.toLocaleString()}</h2>
                                    {property.valuation && (
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                                            {((property.valuation - property.price) / property.price * 100).toFixed(0)}% below market
                                        </span>
                                    )}
                                </div>
                                <p className="text-slate-400 text-sm mt-1">EMI starts at ₹{(property.price * 0.007).toFixed(0)}/mo</p>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Agent Card */}
                            <div className="flex items-center gap-4">
                                <img src="https://i.pravatar.cc/150?img=12" alt="Agent" className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
                                <div>
                                    <h3 className="font-bold text-slate-900">Ralph Edwards</h3>
                                    <p className="text-slate-500 text-sm">Property Expert</p>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                                        <span className="text-xs text-slate-400 ml-1">(42 Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons (Full Width) */}
                            <div className="grid grid-cols-1 gap-3">
                                <button className="flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-200">
                                    <Phone size={18} />
                                    Contact Agent
                                </button>
                                <button className="flex items-center justify-center gap-2 w-full bg-white border border-slate-200 hover:border-violet-200 hover:bg-violet-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all">
                                    <MessageCircle size={18} />
                                    Whatsapp
                                </button>
                            </div>

                            {/* Utility Buttons */}
                            <div className="flex gap-2 pt-2">
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-red-500 font-medium text-sm transition-colors rounded-lg hover:bg-red-50">
                                    <Heart size={18} /> Save
                                </button>
                                <div className="w-px bg-slate-200 h-6 self-center mx-1"></div>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-violet-600 font-medium text-sm transition-colors rounded-lg hover:bg-violet-50">
                                    <Share2 size={18} /> Share
                                </button>
                            </div>

                            {/* Safe Tips */}
                            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 border border-slate-100">
                                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                    <ShieldCheck size={14} /> Safety Tips
                                </h4>
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Never transfer money before viewing.</li>
                                    <li>Check all documents carefully.</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Recommended Section (Below Content) */}
                <RecommendedProperties properties={recommended} />

            </div>
        </div>
    );
};

export default PropertyDetailsPage;
