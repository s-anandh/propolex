import React, { useState, useEffect } from 'react';
import { BadgeCheck, Clock, MapPin, Bed, Bath, Square, Heart, Phone, Mail, ChevronLeft, ChevronRight, Download, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';

const BoostedPropertyCard = ({ property }) => {
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
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-violet-100/50 hover:border-violet-500 transition-all duration-300 border border-slate-100 group flex flex-col h-full w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden flex-shrink-0 bg-slate-200 w-full h-72">
                {/* Images with Fade & Zoom Effect */}
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`${title} - View ${index + 1}`}
                        className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-700 ease-in-out group-hover:scale-105 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
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
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20"
                        >
                            <ChevronRight size={16} />
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

                {/* Mobile/Vertical Save Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white text-slate-700 transition-colors z-20 flex">
                    <Bookmark size={18} />
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow relative w-full p-3">
                {/* Scrollable/Flexible Content Area */}
                <div className="flex-1 min-h-0 flex flex-col mb-0.5">
                    <div className="flex justify-between items-start mb-1">
                        {/* Title and Header Info */}
                        <div className="flex-grow pr-2 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="inline-block bg-violet-50 text-violet-600 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0">
                                    {type}
                                </span>
                                <div className="flex items-center text-slate-500 text-xs overflow-hidden">
                                    <MapPin size={12} className="mr-1 text-slate-400 flex-shrink-0" />
                                    <span className="truncate">{location}</span>
                                </div>
                            </div>

                            <h3 className="text-base font-bold text-slate-800 group-hover:text-violet-600 transition-colors mb-1 truncate leading-tight">{title}</h3>

                            {/* Price & Valuation */}
                            <div className="flex flex-col gap-0.5 mb-1">
                                <p className="text-lg font-bold text-violet-600">₹{price.toLocaleString()}</p>

                            </div>
                        </div>
                    </div>

                    {/* Key Specs */}
                    <div className="flex flex-wrap gap-2 items-center border-b border-t border-slate-50 py-1.5 mb-1.5">
                        <div className="flex items-center gap-1">
                            <Bed size={14} className="text-slate-400" />
                            <span className="text-slate-900 font-bold text-xs">{bhk}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Beds</span>
                        </div>
                        <div className="w-px h-3 bg-slate-200" />
                        <div className="flex items-center gap-1">
                            <Bath size={14} className="text-slate-400" />
                            <span className="text-slate-900 font-bold text-xs">{baths}</span>
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Baths</span>
                        </div>
                        <div className="w-px h-3 bg-slate-200" />
                        <div className="flex items-center gap-1">
                            <Square size={14} className="text-slate-400" />
                            <span className="text-slate-900 font-bold text-xs">{sqft}</span>
                            <span className="text-[10px] text-slate-500">ft²</span>
                        </div>
                    </div>

                    {/* Features - Limit to 4 for vertical to ensure fit */}
                    {features && features.length > 0 && (
                        <div className="mb-1 flex-grow overflow-hidden">
                            <div className="flex flex-wrap gap-1.5">
                                {features.slice(0, 4).map((feature, idx) => (
                                    <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                                        <CheckCircle2 size={10} className="text-green-500" />
                                        {feature}
                                    </span>
                                ))}
                                {features.length > 4 && (
                                    <span className="text-[10px] text-slate-400 self-center pl-1">+{features.length - 4}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer / Actions - Pinned to bottom */}
                <div className="mt-auto pt-0 flex flex-col gap-2 flex-shrink-0">
                    {/* Agent Info - Unified for Horizontal & Vertical */}
                    <div className="flex items-center gap-2 justify-between w-full">
                        <div className="flex items-center gap-2">
                            <img src="https://i.pravatar.cc/150?img=12" alt="Agent" className="w-6 h-6 rounded-full" />
                            <div className="flex-col">
                                <p className="text-xs font-semibold text-slate-700">Ralph Edwards</p>
                                <p className="text-[10px] text-slate-500">Property Agent</p>
                            </div>
                        </div>
                        {brochure && (
                            <button className="text-[10px] flex items-center gap-1 text-violet-600 font-semibold border border-violet-100 bg-violet-50 px-1.5 py-0.5 rounded hover:bg-violet-100 transition-colors">
                                <Download size={10} />
                                Brochure
                            </button>
                        )}
                    </div>

                    <div className="flex gap-2 w-full">
                        <button className="flex-1 px-3 py-2.5 border border-violet-600 text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-colors flex items-center justify-center gap-1.5 text-xs">
                            <Mail size={14} />
                            Enquire
                        </button>
                        <button className="flex-1 px-3 py-2.5 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-violet-200 text-xs">
                            <Phone size={14} />
                            Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoostedPropertyCard;
