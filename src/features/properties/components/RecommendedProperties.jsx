import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RecommendedPropertyCard from './RecommendedPropertyCard';

const RecommendedProperties = ({ properties }) => {
    const scrollContainerRef = useRef(null);

    if (!properties || properties.length === 0) return null;

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -340 : 340; // Card width + gap
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mt-20 border-t border-slate-200 pt-12 relative group/section">
            <div className="flex justify-between items-center mb-8 px-1">
                <h2 className="text-2xl font-bold text-slate-900">Recommended For You</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="bg-white border border-slate-200 p-2 rounded-full hover:bg-slate-50 hover:border-violet-300 transition-colors text-slate-600 hover:text-violet-600 shadow-sm"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="bg-white border border-slate-200 p-2 rounded-full hover:bg-slate-50 hover:border-violet-300 transition-colors text-slate-600 hover:text-violet-600 shadow-sm"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {properties.map(property => (
                    <div key={property.id} className="snap-center h-full min-w-[320px] w-[320px]">
                        <RecommendedPropertyCard property={property} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedProperties;
