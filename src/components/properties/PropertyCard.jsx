import React, { useState, useEffect } from 'react';
import { BadgeCheck, Clock, MapPin, Bed, Bath, Square, Heart, Phone, Mail, ChevronLeft, ChevronRight, Download, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';

const PropertyCard = ({ property }) => {
    const {
        images,
        price,
        valuation,
        location,
        title,
        bhk,
        baths,
        sqft,
        verified,
        listedTime,
        type,
        badge,
        brochure,
        features
    } = property;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play carousel
    useEffect(() => {
        let interval;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 3000); // Change every 3 seconds
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    return (
        <div
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 group flex flex-col md:flex-row h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
        >
            {/* Image Container - Restored to readable size (w-2/5) */}
            <div className="relative w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto overflow-hidden flex-shrink-0 bg-slate-200">
                {/* Images with Fade Effect */}
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${title} - View ${index + 1}`}
                        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
                    />
                ))}

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <div style={{ zIndex: 10 }}>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    {verified && (
                        <div className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                            <BadgeCheck size={14} />
                            Verified
                        </div>
                    )}
                    {badge && (
                        <div className="bg-violet-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                            {badge}
                        </div>
                    )}
                </div>

                {/* Time Badge */}
                <div className="absolute bottom-4 left-4 z-20">
                    <div className="bg-slate-900/70 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                        <Clock size={12} />
                        {listedTime}
                    </div>
                </div>

                {/* Mobile Save Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white text-slate-700 transition-colors z-20 md:hidden">
                    <Bookmark size={18} />
                </button>
            </div>

            {/* Content - Balanced Padding (p-5) */}
            <div className="p-5 flex flex-col justify-between flex-grow relative w-full">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        {/* Title and Header Info */}
                        <div className="flex-grow pr-4">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-block bg-violet-50 text-violet-600 text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                    {type}
                                </span>
                                <div className="flex items-center text-slate-500 text-sm">
                                    <MapPin size={14} className="mr-1 text-slate-400" />
                                    <span className="truncate">{location}</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-violet-600 transition-colors mb-2">{title}</h3>

                            {/* Price & Valuation */}
                            <div className="flex flex-col gap-1 mb-3">
                                <p className="text-2xl font-bold text-violet-600">₹{price.toLocaleString()}</p>

                                {valuation && (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-slate-400 line-through decoration-slate-400 decoration-2">
                                            ₹{valuation.toLocaleString()}
                                        </span>
                                        <button className="flex items-center gap-1.5 bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors text-xs px-2.5 py-1 rounded-full font-semibold border border-violet-100">
                                            <Sparkles size={12} />
                                            Check AI Valuation
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Save Button - Desktop */}
                        <button className="hidden md:flex flex-col items-center gap-1 text-slate-400 hover:text-violet-600 transition-colors group/save flex-shrink-0">
                            <Bookmark size={24} className="group-hover/save:fill-violet-600 transition-all" />
                            <span className="text-xs font-semibold">Save</span>
                        </button>
                    </div>

                    {/* Key Specs - Standard but tighter spacing (gap-4) */}
                    <div className="flex flex-wrap gap-4 my-3 items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-50 rounded text-slate-400">
                                <Bed size={18} />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm">{bhk}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">Beds</p>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-50 rounded text-slate-400">
                                <Bath size={18} />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm">{baths}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">Baths</p>
                            </div>
                        </div>
                        <div className="w-px h-8 bg-slate-100" />
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-50 rounded text-slate-400">
                                <Square size={18} />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-sm">{sqft}</p>
                                <p className="text-[10px] text-slate-500 uppercase font-semibold">Sqft</p>
                            </div>
                        </div>
                    </div>

                    {/* Features - Single Row but comfortably sized */}
                    {features && features.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                                {features.slice(0, 4).map((feature, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={12} className="text-green-500" />
                                        {feature}
                                    </span>
                                ))}
                                {features.length > 4 && (
                                    <span className="text-xs text-slate-400 self-center pl-1">+{features.length - 4} more</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Actions - Standard Buttons */}
                <div className="border-t border-slate-100 pt-3 flex flex-col xl:flex-row justify-between items-center gap-3 mt-auto">
                    {/* Agent Info */}
                    <div className="flex items-center gap-2 w-full xl:w-auto">
                        <img src="https://i.pravatar.cc/150?img=12" alt="Agent" className="w-8 h-8 rounded-full" />
                        <div className="flex-col">
                            <p className="text-sm font-semibold text-slate-700">Ralph Edwards</p>
                            <p className="text-xs text-slate-500">Property Agent</p>
                        </div>
                        {brochure && (
                            <button className="xl:ml-4 text-xs flex items-center gap-1 text-violet-600 font-semibold border border-violet-100 bg-violet-50 px-2 py-1 rounded hover:bg-violet-100 transition-colors ml-auto lg:ml-0">
                                <Download size={12} />
                                Brochure
                            </button>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full xl:w-auto">
                        <button className="flex-1 xl:flex-none px-4 py-2 border border-violet-600 text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-colors flex items-center justify-center gap-2 text-sm">
                            <Mail size={16} />
                            Enquire
                        </button>
                        <button className="flex-1 xl:flex-none px-4 py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-violet-200 text-sm">
                            <Phone size={16} />
                            Call Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;