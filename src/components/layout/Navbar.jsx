import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';

    // Handle Scroll for Transparency Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Properties', href: '/properties' },
        { name: 'AI Tools', href: '/ai-tools' },
        { name: 'About', href: '/about' },
    ];


    const isTransparent = isHome && !isScrolled;

    const navClasses = isTransparent
        ? 'fixed top-0 w-full z-50 bg-black/10 backdrop-blur-sm border-b border-white/10 transition-all duration-500 ease-in-out'
        : 'sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-500 ease-in-out shadow-sm';

    const textClasses = isTransparent
        ? 'text-white/90 hover:text-white hover:bg-white/10'
        : 'text-slate-600 hover:text-primary-600';

    const brandTextClasses = isTransparent
        ? 'text-white'
        : 'bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent';

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Left: Brand Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="bg-primary-600 p-1.5 rounded-lg">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <span className={`text-xl font-bold ${brandTextClasses}`}>
                            Propolex
                        </span>
                    </div>

                    {/* Center: Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${textClasses}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            className={`font-semibold text-slate-700 hover:bg-white/50 ${textClasses}`}
                        >
                            Login
                        </Button>
                        <Link to="/add-property">
                            <Button className={`gap-2 shadow-lg shadow-primary-600/20 `}
                            >
                                <Plus size={18} />
                                Post Property
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="focus:outline-none p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-fade-in-down rounded-b-2xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="block px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
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
