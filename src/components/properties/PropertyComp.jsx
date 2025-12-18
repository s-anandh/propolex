import React from 'react';
import { MapPin, ArrowRight, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyComp = ({ property }) => {
    return (
        <Link to={`/property/${property.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-violet-100 shadow-sm hover:shadow-md transition-all duration-300 flex h-28 md:h-32">

                {/* Column 1: Image (Fixed Width/Aspect - Slightly landscape) */}
                <div className="h-full w-32 md:w-40 relative overflow-hidden">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute top-2 left-2">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                            {property.badge || property.category}
                        </span>
                    </div>
                </div>

                {/* Column 2: Minimal Info */}
                <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm md:text-base font-bold text-slate-900 line-clamp-1 group-hover:text-violet-700 transition-colors">
                                {property.title}
                            </h3>
                            <span className="text-violet-700 font-bold text-sm md:text-base whitespace-nowrap ml-2">
                                ₹{(property.price / 100000).toFixed(1)} L
                            </span>
                        </div>

                        <div className="flex items-center text-slate-500 text-xs mt-1 mb-2">
                            <MapPin size={12} className="mr-1" />
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 md:gap-4 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                            <Bed size={14} className="text-violet-500" />
                            <span>{property.bhk} BHK</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath size={14} className="text-violet-500" />
                            <span>{property.baths} Bath</span>
                        </div>
                        <div className="flex items-center gap-1 hidden sm:flex">
                            <Square size={14} className="text-violet-500" />
                            <span>{property.sqft} sqft</span>
                        </div>
                    </div>
                </div>

                {/* Arrow Action (Visual Cue) */}
                <div className="w-8 flex items-center justify-center border-l border-slate-50 bg-slate-50/50 group-hover:bg-violet-50 transition-colors">
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-violet-500 transition-colors" />
                </div>
            </div>
        </Link>
    );
};

export default PropertyComp;
