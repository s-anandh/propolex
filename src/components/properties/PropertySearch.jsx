import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const PropertySearch = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
            {/* Main Search Input */}
            <div className="flex-grow flex items-center bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100 transition-all w-full">
                <Search size={20} className="text-slate-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search for Locality, Landmark, Project, or Builder"
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
                />
            </div>

            {/* Quick Filters / Location - Optional if redundant with sidebar, but requested in top bar too possibly */}
            <div className="hidden md:flex items-center gap-3">
                <div className="relative group">
                    <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-violet-400 transition-colors">
                        <MapPin size={18} className="text-violet-500" />
                        <span>Location</span>
                        <ChevronDown size={16} className="text-slate-400" />
                    </button>
                </div>

                <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-0.5">
                    Search
                </button>
            </div>
        </div>
    );
};

export default PropertySearch;
