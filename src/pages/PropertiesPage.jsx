import React, { useState } from 'react';
import PropertyCard from '@/components/properties/PropertyCard';
import SidebarFilter from '@/components/properties/SidebarFilter';
import PropertySearch from '@/components/properties/PropertySearch';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const INITIAL_PROPERTIES = [
    {
        id: 1,
        title: 'Luxury 3BHK Apartment in Indiranagar',
        price: 12500000,
        valuation: 14500000,
        location: 'Indiranagar, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 3,
        baths: 3,
        sqft: 1850,
        verified: true,
        listedTime: '2 days ago',
        type: 'Apartment',
        badge: 'Premium',
        brochure: '#',
        features: ['Swimming Pool', 'Gym', '24/7 Power Backup', 'Club House', 'Garden']
    },
    {
        id: 2,
        title: 'Spacious Villa with Private Garden',
        price: 45000000,
        valuation: 52000000,
        location: 'Whitefield, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1598928506311-1555d3c16aeb?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 4,
        baths: 4,
        sqft: 3200,
        verified: true,
        listedTime: '5 hours ago',
        type: 'Villa',
        badge: 'Featured',
        brochure: '#',
        features: ['Private Pool', 'Home Theater', 'Solar Power', 'Servant Quarters', 'Jacuzzi']
    },
    {
        id: 3,
        title: 'Modern Studio Apartment',
        price: 6500000,
        valuation: 7200000,
        location: 'Koramangala, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 1,
        baths: 1,
        sqft: 850,
        verified: false,
        listedTime: '1 week ago',
        type: 'Studio',
        badge: null,
        brochure: null, // No brochure for this one
        features: ['Fully Furnished', 'High Speed Internet', 'Co-working Space']
    },
    {
        id: 4,
        title: 'Penthouse with City View',
        price: 85000000,
        valuation: 95000000,
        location: 'MG Road, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 5,
        baths: 5,
        sqft: 5000,
        verified: true,
        listedTime: 'Just Now',
        type: 'Penthouse',
        badge: 'Luxury',
        brochure: '#',
        features: ['Sky Lounge', 'Infinity Pool', 'Private Elevator', 'Smart Home System', 'Concierge']
    },
    {
        id: 5,
        title: '2BHK in Gated Community',
        price: 8500000,
        valuation: 9200000,
        location: 'Sarjapur Road, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 2,
        baths: 2,
        sqft: 1200,
        verified: true,
        listedTime: '3 days ago',
        type: 'Apartment',
        badge: 'Value Deal',
        brochure: '#',
        features: ['Kids Play Area', 'Jogging Track', 'CCTV Security', 'Rainwater Harvesting']
    },
    {
        id: 6,
        title: 'Plot in Prime Locality',
        price: 25000000,
        valuation: 27500000,
        location: 'HSR Layout, Bangalore',
        images: [
            'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1513584687574-9c119303eaf3?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1460317442991-0ec2aa9a15ac?auto=format&fit=crop&w=800&q=80'
        ],
        bhk: 0,
        baths: 0,
        sqft: 2400,
        verified: true,
        listedTime: '1 day ago',
        type: 'Plot',
        badge: null,
        brochure: null,
        features: ['Corner Plot', 'East Facing', 'Gated Society', 'Water Connection']
    }
];

// Generate more data for pagination
const GENERATED_PROPERTIES = Array.from({ length: 18 }, (_, index) => {
    const baseProperty = INITIAL_PROPERTIES[index % INITIAL_PROPERTIES.length];
    const newPrice = baseProperty.price + (index * 100000);
    return {
        ...baseProperty,
        id: INITIAL_PROPERTIES.length + index + 1,
        title: `${baseProperty.title} (Phase ${Math.floor(index / 6) + 2})`,
        price: newPrice,
        valuation: newPrice * 1.15, // 15% higher valuation
        listedTime: `${Math.floor(Math.random() * 30)} days ago`,
    };
});

const MOCK_PROPERTIES = [...INITIAL_PROPERTIES, ...GENERATED_PROPERTIES];


const PropertiesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = MOCK_PROPERTIES.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(MOCK_PROPERTIES.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <SidebarFilter />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-grow">
                        {/* Search Top Bar */}
                        <div className="mb-6">
                            <PropertySearch />
                        </div>

                        {/* Results Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
                            <div className="flex items-center gap-2">
                                <p className="text-slate-600">
                                    Showing <span className="font-bold text-slate-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, MOCK_PROPERTIES.length)}</span> of <span className="font-bold text-slate-900">{MOCK_PROPERTIES.length}</span> Properties
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 text-sm hidden sm:inline">Show:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => {
                                            setItemsPerPage(Number(e.target.value));
                                            setCurrentPage(1); // Reset to page 1 on limit change
                                        }}
                                        className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 focus:ring-violet-500 focus:border-violet-500"
                                    >
                                        <option value={6}>6 per page</option>
                                        <option value={12}>12 per page</option>
                                        <option value={24}>24 per page</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-slate-500 text-sm hidden sm:inline">Sort by:</span>
                                    <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg p-2.5 focus:ring-violet-500 focus:border-violet-500">
                                        <option>Recommended</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest First</option>
                                    </select>
                                </div>
                                {/* Mobile Filter Toggle */}
                                <button className="lg:hidden p-2.5 border border-slate-200 rounded-lg bg-white text-slate-600">
                                    <SlidersHorizontal size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Properties List */}
                        <div className="flex flex-col gap-6">
                            {currentItems.map(property => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => handlePageChange(number)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${currentPage === number
                                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-200'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-violet-600'
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PropertiesPage;
