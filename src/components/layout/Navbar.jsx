import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Menu, X, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Properties', href: '/properties' },
        { name: 'AI Tools', href: '/ai-tools' },
        { name: 'About', href: '/about' },
    ];

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Left: Brand Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="bg-primary-600 p-1.5 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Propolex
                        </span>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" className="font-semibold text-slate-600">
                            Login
                        </Button>
                        <Button className="gap-2">
                            <Plus size={18} />
                            Post Property
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-500 hover:text-slate-700 focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                            <Button variant="outline" className="w-full justify-center">
                                Login
                            </Button>
                            <Button className="w-full justify-center gap-2">
                                <Plus size={18} />
                                Post Property
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
