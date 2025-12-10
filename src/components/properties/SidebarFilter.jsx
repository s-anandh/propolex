import React, { useState } from 'react';
import { Filter, ChevronDown, Check, Search } from 'lucide-react';

const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-slate-100 py-5 last:border-0">
            <div
                className="flex justify-between items-center cursor-pointer mb-3 select-none"
                onClick={() => setOpen(!open)}
            >
                <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">{title}</h4>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </div>
            {open && <div className="space-y-2.5 animate-in slide-in-from-top-1 duration-200">{children}</div>}
        </div>
    );
};

const Checkbox = ({ label }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none relative">
        <input type="checkbox" className="peer sr-only" />
        <div className="w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center text-white bg-white peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all duration-200 group-hover:border-violet-400">
            <Check size={14} strokeWidth={3} className="opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
        <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
);

const Radio = ({ label, name, defaultChecked }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
        <input type="radio" name={name} defaultChecked={defaultChecked} className="peer sr-only" />
        <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex items-center justify-center bg-white peer-checked:border-violet-600 group-hover:border-violet-400 transition-all duration-200">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-600 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
        <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
);


const SidebarFilter = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24 flex flex-col max-h-[calc(100vh-120px)]">
            {/* Header - Fixed */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-xl z-10">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Filter size={20} className="text-violet-600" />
                    Filters
                </h3>
                <button className="text-xs text-violet-600 font-bold hover:text-violet-700 hover:underline uppercase tracking-wide">Clear All</button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-5 custom-scrollbar">

                {/* Location Search */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Location</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search locality..."
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-200 transition-all"
                        />
                    </div>
                </div>

                <FilterSection title="Review Status">
                    <Radio name="status" label="All Properties" defaultChecked />
                    <Radio name="status" label="Verified Only" />
                </FilterSection>

                <FilterSection title="Property Type">
                    <Checkbox label="Apartment" />
                    <Checkbox label="Independent House / Villa" />
                    <Checkbox label="Residential Plot" />
                    <Checkbox label="Farm House" />
                    <Checkbox label="Studio Apartment" />
                    <Checkbox label="Service Apartment" />
                </FilterSection>

                <FilterSection title="Budget">
                    {/* Range inputs can be complex, using simple inputs for now */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">MIN</span>
                            <input type="number" className="w-full pl-10 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-violet-500 outline-none" placeholder="₹" />
                        </div>
                        <span className="text-slate-400 font-medium">-</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">MAX</span>
                            <input type="number" className="w-full pl-10 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-violet-500 outline-none" placeholder="₹" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded cursor-pointer hover:bg-slate-200">Below 50L</span>
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded cursor-pointer hover:bg-slate-200">50L - 1Cr</span>
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded cursor-pointer hover:bg-slate-200">1Cr +</span>
                    </div>
                </FilterSection>

                <FilterSection title="BHK">
                    <div className="flex gap-2 flex-wrap">
                        {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(num => (
                            <label key={num} className="cursor-pointer">
                                <input type="checkbox" className="peer sr-only" />
                                <span className="block px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 peer-checked:bg-violet-600 peer-checked:text-white peer-checked:border-violet-600 hover:border-violet-400 transition-all">
                                    {num}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Sale Status">
                    <Checkbox label="New Launch" />
                    <Checkbox label="Ready to Move" />
                    <Checkbox label="Under Construction" />
                    <Checkbox label="Resale" />
                </FilterSection>

                <FilterSection title="Furnishing">
                    <Checkbox label="Fully Furnished" />
                    <Checkbox label="Semi Furnished" />
                    <Checkbox label="Unfurnished" />
                </FilterSection>

                <FilterSection title="Possession Status">
                    <Checkbox label="Ready to Move" />
                    <Checkbox label="In 1 Year" />
                    <Checkbox label="In 3 Years" />
                    <Checkbox label="Beyond 3 Years" />
                </FilterSection>

                <FilterSection title="Amenities">
                    <Checkbox label="Parking" />
                    <Checkbox label="Lift" />
                    <Checkbox label="Power Backup" />
                    <Checkbox label="Gated Security" />
                    <Checkbox label="Gym" />
                    <Checkbox label="Swimming Pool" />
                    <Checkbox label="Club House" />
                    <Checkbox label="Park / Garden" />
                    <Checkbox label="Gas Pipeline" />
                </FilterSection>

                <FilterSection title="Facing">
                    <Checkbox label="North" />
                    <Checkbox label="East" />
                    <Checkbox label="West" />
                    <Checkbox label="South" />
                    <Checkbox label="North-East" />
                </FilterSection>

                <FilterSection title="Flooring">
                    <Checkbox label="Vitrified" />
                    <Checkbox label="Marble" />
                    <Checkbox label="Wooden" />
                    <Checkbox label="Granite" />
                </FilterSection>

                <FilterSection title="Posted By">
                    <Checkbox label="Owner" />
                    <Checkbox label="Broker / Agent" />
                    <Checkbox label="Builder" />
                </FilterSection>

            </div>

            {/* Footer gradient fade for indication if needed, or simple padding */}
            <div className="h-4 bg-gradient-to-t from-white to-transparent pointer-events-none absolute bottom-0 w-full rounded-b-xl" />
        </div>
    );
};

export default SidebarFilter;
