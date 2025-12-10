import React, { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-slate-100 py-4 last:border-0">
            <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={() => setOpen(!open)}
            >
                <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">{title}</h4>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </div>
            {open && <div className="mt-2 space-y-2">{children}</div>}
        </div>
    );
};

const Checkbox = ({ label }) => (
    <label className="flex items-center gap-2 cursor-pointer group">
        <div className="w-4 h-4 border border-slate-300 rounded flex items-center justify-center text-white peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-colors">
            {/* Pseudo-checkbox handled by native input mostly, but styled div here for custom look if needed, simple approach below */}
            <Check size={12} className="opacity-0 group-hover:opacity-20 translate-y-px" />
        </div>
        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        <span className="text-slate-600 text-sm group-hover:text-slate-800">{label}</span>
    </label>
);


const SidebarFilter = () => {
    // Mock filter state handling - visual only
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit sticky top-24">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Filter size={20} />
                    Filters
                </h3>
                <button className="text-xs text-blue-600 font-semibold hover:text-blue-700">Clear All</button>
            </div>

            <FilterSection title="Location" isOpen={true}>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search Location..."
                        className="w-full pl-3 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </FilterSection>

            <FilterSection title="Type">
                <Checkbox label="Apartment" />
                <Checkbox label="Villa" />
                <Checkbox label="Plot" />
                <Checkbox label="Office Space" />
            </FilterSection>

            <FilterSection title="Price Range">
                <div className="flex gap-2 items-center">
                    <input type="number" placeholder="Min" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-500" />
                    <span className="text-slate-400">-</span>
                    <input type="number" placeholder="Max" className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm outline-none focus:border-blue-500" />
                </div>
            </FilterSection>

            <FilterSection title="BHK">
                <div className="flex gap-2 flex-wrap">
                    {['1', '2', '3', '4', '5+'].map(num => (
                        <button key={num} className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors">
                            {num} BHK
                        </button>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Area (Sqft)">
                <input type="range" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>500 sqft</span>
                    <span>5000+ sqft</span>
                </div>
            </FilterSection>

            <FilterSection title="Badges">
                <Checkbox label="Verified Property" />
                <Checkbox label="New Launch" />
                <Checkbox label="Ready to Move" />
                <Checkbox label="Under Construction" />
            </FilterSection>
        </div>
    );
};

export default SidebarFilter;
