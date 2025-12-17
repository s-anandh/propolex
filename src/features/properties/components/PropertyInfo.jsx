import React from 'react';
import { Bed, Bath, Square, MapPin, CheckCircle2, ShieldCheck, Home, Calendar, Layers, Compass, Car, IndianRupee } from 'lucide-react';

const PropertyInfo = ({ property }) => {
    return (
        <div className="md:col-span-2 space-y-8">
            {/* Header Section */}
            <div>
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {property.type}
                    </span>
                    {property.verified && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                            <ShieldCheck size={14} /> Verified
                        </span>
                    )}
                    {property.listingType && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            For {property.listingType}
                        </span>
                    )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-slate-500 font-medium">
                    <MapPin size={18} className="mr-2 text-slate-400" />
                    {property.location}
                </div>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <HighlightItem icon={Bed} value={property.bhk} label="Bedrooms" />
                <div className="border-x border-slate-200">
                    <HighlightItem icon={Bath} value={property.baths} label="Bathrooms" />
                </div>
                <HighlightItem icon={Square} value={property.sqft} label="Sq. Ft." />
            </div>

            {/* Description */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 border-l-4 border-violet-600 pl-3">Description</h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p>{property.description}</p>
                </div>
            </div>

            {/* Comprehensive Property Details */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 border-l-4 border-violet-600 pl-3">Property Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <DetailRow icon={Home} label="Property Category" value={property.category} />
                    <DetailRow icon={Layers} label="Transaction Type" value={property.subCategory} />
                    <DetailRow icon={Calendar} label="Possession Status" value={property.possessionStatus} />
                    <DetailRow icon={Compass} label="Facing" value={property.facing || 'Not Specified'} />
                    <DetailRow icon={Layers} label="Floor Number" value={property.floorNo !== undefined ? `${property.floorNo} of ${property.totalFloors}` : 'N/A'} />
                    <DetailRow icon={Calendar} label="Age of Property" value={property.ageOfProperty || 'New'} />
                    <DetailRow icon={Car} label="Parking" value={property.parking || 'Not Specified'} />
                    <DetailRow icon={Home} label="Balconies" value={property.balconies || '0'} />
                    <DetailRow icon={IndianRupee} label="Maintenance" value={property.maintenanceCharges ? `₹${property.maintenanceCharges}/mo` : 'N/A'} />
                </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 border-l-4 border-violet-600 pl-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6">
                    {property.amenities?.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-slate-700 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium">{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features (if any) */}
            {property.features && property.features.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 border-l-4 border-violet-600 pl-3">Key Features</h2>
                    <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-lg text-sm border border-slate-200">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const HighlightItem = ({ icon: Icon, value, label }) => (
    <div className="flex flex-col items-center justify-center text-center p-2">
        <div className="bg-white p-3 rounded-full shadow-sm mb-2 text-violet-600">
            <Icon size={24} />
        </div>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <span className="text-xs text-slate-500 uppercase font-semibold">{label}</span>
    </div>
);

const DetailRow = ({ icon: Icon, label, value }) => (
    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-slate-500">
            {Icon && <Icon size={16} />}
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-slate-900 text-sm font-semibold">{value}</span>
    </div>
);

export default PropertyInfo;
