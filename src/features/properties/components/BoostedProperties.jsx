import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import BoostedPropertyCard from './BoostedPropertyCard';

// Mock Data for Boosted Properties
const BOOSTED_PROPERTIES = [
    {
        id: 101,
        images: [
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
        ],
        price: 850000,
        valuation: 820000,
        title: "Sunset Boulevard Villa",
        location: "Beverly Hills, CA",
        bhk: 4,
        baths: 3,
        sqft: 3200,
        type: "Villa",
        verified: true,
        badge: "Premium",
        listedTime: "2 hours ago",
        features: ["Pool", "Garden", "Smart Home"]
    },
    {
        id: 102,
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=800&q=80"
        ],
        price: 450000,
        title: "Modern Downtown Loft",
        location: "Seattle, WA",
        bhk: 2,
        baths: 2,
        sqft: 1150,
        type: "Apartment",
        verified: true,
        listedTime: "5 hours ago",
        features: ["Gym", "Parking"]
    },
    {
        id: 103,
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
        ],
        price: 1200000,
        valuation: 1150000,
        title: "Luxury Waterfront Estate",
        location: "Miami, FL",
        bhk: 5,
        baths: 4,
        sqft: 4500,
        type: "Villa",
        verified: true,
        badge: "Featured",
        listedTime: "1 day ago",
        features: ["Waterfront", "Dock", "Pool"]
    },
    {
        id: 104,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
        ],
        price: 675000,
        title: "Cozy Family Home",
        location: "Austin, TX",
        bhk: 3,
        baths: 2,
        sqft: 1800,
        type: "House",
        verified: true,
        listedTime: "2 days ago",
        features: ["Backyard", "Quiet Area"]
    },
    {
        id: 105,
        images: [
            "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?auto=format&fit=crop&w=800&q=80"
        ],
        price: 950000,
        title: "Penthouse Suite",
        location: "New York, NY",
        bhk: 3,
        baths: 3,
        sqft: 2100,
        type: "Apartment",
        verified: true,
        badge: "Luxury",
        listedTime: "3 days ago",
        features: ["View", "Concierge"]
    }
];

const BoostedProperties = () => {
    const scrollContainerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-scroll logic
    useEffect(() => {
        let animationFrameId;
        const scrollContainer = scrollContainerRef.current;
        const scrollSpeed = 1; // Pixels per frame

        const scroll = () => {
            if (scrollContainer && !isHovered) {
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
                    // Reset to start for infinite loop feeling (or simple bounce back)
                    // For true infinite, we'd duplicate items. For now, let's just loop back seamlessly if possible or bounce.
                    // Simple approach: Smooth scroll back to 0 or just increment
                    // Let's implement simple circular scroll by checking boundary
                    scrollContainer.scrollLeft = 0; // Quick jump back
                } else {
                    scrollContainer.scrollLeft += scrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
    };

    return (
        <div
            className="py-12 bg-white border-y border-slate-100 relative group/section"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col gap-1 items-start">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 shadow-sm">
                            <Zap size={14} fill="currentColor" />
                            <span className="font-bold text-xs uppercase tracking-wider leading-none mt-0.5">Premium Selection</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">Boosted Properties</h3>
                    </div>

                    {/* Manual Controls */}
                    <div className="flex gap-2">
                        <button
                            onClick={scrollLeft}
                            className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 hover:border-violet-300 transition-colors text-slate-600 hover:text-violet-600"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white transition-colors shadow-lg shadow-violet-200"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {BOOSTED_PROPERTIES.map((property) => (
                        <div
                            key={property.id}
                            className="min-w-[300px] md:min-w-[340px] snap-start h-[560px]"
                        >
                            <BoostedPropertyCard property={property} />
                        </div>
                    ))}
                    {/* Duplicate first few for "infinite" feel if needed, but simple scroll is fine for now */}
                </div>
            </div>
        </div>
    );
};

export default BoostedProperties;
