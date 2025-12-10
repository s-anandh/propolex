import React from 'react';
import { Search, MapPin, Home, DollarSign, BedDouble, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import heroBg from '@/assets/hero-bg.png';

const HeroSection = () => {
    return (
        <div className="relative h-[600px] w-full flex items-end pb-12 sm:pb-20">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={heroBg}
                    alt="Modern Luxury Villa"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl space-y-6">

                    {/* Main Heading */}
                    <div className="space-y-2 mb-8 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            Discover Your New Home
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 font-light">
                            We have the most listings and constant updates. So you never miss out.
                        </p>
                    </div>

                    {/* Search Box & Filters Container */}
                    <div className="bg-white p-4 rounded-xl shadow-2xl space-y-4">

                        {/* Top Row: Search Input */}
                        <div className="relative flex items-center">
                            <MapPin className="absolute left-4 text-slate-400 h-6 w-6" />
                            <input
                                type="text"
                                placeholder="Search by City, Neighborhood, or Address..."
                                className="w-full pl-12 pr-4 py-4 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg placeholder:text-slate-400"
                            />
                            <Button size="lg" className="absolute right-2 hidden sm:flex">
                                Search
                            </Button>
                        </div>

                        {/* Bottom Row: Filters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                            {/* Type Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Home className="h-5 w-5 text-slate-400" />
                                </div>
                                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border-r-[12px] border-r-transparent border-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Buy</option>
                                    <option>Rent</option>
                                    <option>Sold</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Building2Icon className="h-5 w-5 text-slate-400" />
                                </div>
                                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border-r-[12px] border-r-transparent border-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Any Type</option>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Office</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-slate-400" />
                                </div>
                                <select className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 border-r-[12px] border-r-transparent border-slate-200 text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Price Range</option>
                                    <option>$100k - $500k</option>
                                    <option>$500k - $1M</option>
                                    <option>$1M+</option>
                                </select>
                            </div>

                            {/* Search Button (Mobile Only) */}
                            <Button size="lg" className="sm:hidden w-full flex items-center justify-center gap-2">
                                <Search size={20} />
                                Search
                            </Button>

                            {/* Search Button (Desktop: Advanced/More) or just a spacer/another filter */}
                            <div className="hidden sm:block">
                                <Button variant="outline" className="w-full h-full text-slate-600 border-slate-200">
                                    More Filters
                                </Button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Icon component helper since Lucide 'Building2' collision with Home usually happens if defining manually
import { Building2 as Building2Icon } from 'lucide-react';

export default HeroSection;
