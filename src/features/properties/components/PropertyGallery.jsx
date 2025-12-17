import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const PropertyGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images.length) return null;

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 group">
                <img
                    src={images[selectedImage]}
                    alt="Property View"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-zoom-in"
                />

                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                    <Maximize2 size={20} />
                </button>
            </div>

            {/* Thumbnails Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                ? 'border-violet-600 ring-2 ring-violet-100'
                                : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PropertyGallery;
