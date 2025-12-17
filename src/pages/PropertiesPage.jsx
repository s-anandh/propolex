import React, { useState } from 'react';
import PropertyCard from '@/components/properties/PropertyCard';
import SidebarFilter from '@/components/properties/SidebarFilter';
import PropertySearch from '@/components/properties/PropertySearch';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { ALL_PROPERTIES } from '@/data/mockProperties';

const PropertiesPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ALL_PROPERTIES.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ALL_PROPERTIES.length / itemsPerPage);

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
                                    Showing <span className="font-bold text-slate-900">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, ALL_PROPERTIES.length)}</span> of <span className="font-bold text-slate-900">{ALL_PROPERTIES.length}</span> Properties
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
