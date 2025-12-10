import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <Building2 className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">Prop O Lex</span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            India's first Multivendor Real Estate Platform prioritizing legal prescience.
                            TRUST | TRANSPARENCY | TECHNOLOGY
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/buy" className="hover:text-primary-400 transition-colors">Buy Property</Link></li>
                            <li><Link to="/sell" className="hover:text-primary-400 transition-colors">Sell Property</Link></li>
                            <li><Link to="/vendors" className="hover:text-primary-400 transition-colors">Find Vendors</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary-400 transition-colors">Pricing Plans</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Our Services</h3>
                        <ul className="space-y-3">
                            <li><Link to="/legal" className="hover:text-primary-400 transition-colors">Legal Verification</Link></li>
                            <li><Link to="/valuations" className="hover:text-primary-400 transition-colors">Property Valuation</Link></li>
                            <li><Link to="/loans" className="hover:text-primary-400 transition-colors">Home Loans</Link></li>
                            <li><Link to="/interior" className="hover:text-primary-400 transition-colors">Interior Design</Link></li>
                            <li><Link to="/vastu" className="hover:text-primary-400 transition-colors">Vastu Consultation</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                                <span>123, Real Estate Hub, Tech City, Bangalore - 560100</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary-500" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary-500" />
                                <span>support@propolex.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm">© 2025 Prop O Lex Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
