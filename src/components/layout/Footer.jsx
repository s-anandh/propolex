import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Smartphone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16 border-b border-slate-900 pb-12">
                    {/* Brand Column (2 cols wide) */}
                    <div className="lg:col-span-2 space-y-6 pr-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-violet-900/20">
                                <Building2 className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-white tracking-tight block">Prop O Lex</span>
                                <span className="text-[10px] text-violet-400 font-bold tracking-widest uppercase">Legal • Tech • Trust</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                            India's first AI-powered Multivendor Real Estate Platform prioritizing legal prescience.
                            We combine cutting-edge technology with verified property data to ensure your investment is safe, legally sound, and future-proof.
                        </p>

                        <div className="flex gap-4 pt-2">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all duration-300 group">
                                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter & App Download (3 cols wide) */}
                    <div className="lg:col-span-3 flex flex-col justify-between">
                        <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800">
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-white text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
                                    <p className="text-slate-400 text-sm">Get the latest market insights, legal tips, and hot property deals.</p>
                                </div>
                                <div className="w-full md:w-auto flex-1 min-w-[300px]">
                                    <form className="relative">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-slate-950 border border-slate-800 text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all placeholder-slate-600"
                                        />
                                        <button className="absolute right-1.5 top-1.5 bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-lg transition-colors shadow-lg shadow-violet-900/20">
                                            <Send size={16} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-8 mt-10">
                            <div className="flex-1">
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Smartphone size={18} className="text-violet-500" />
                                    Get the App
                                    <span className="bg-violet-600/20 text-violet-300 text-[10px] px-2 py-0.5 rounded-full border border-violet-600/30">Coming Soon</span>
                                </h4>
                                <div className="flex gap-3">
                                    {/* App Store Button - Grayscale/Disabled look for 'Coming Soon' but colored icon */}
                                    <button className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center gap-3 cursor-not-allowed opacity-80 group">
                                        <svg viewBox="0 0 384 512" className="w-8 h-8 fill-current text-white">
                                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-[10px] text-slate-500 font-bold uppercase">Download on the</div>
                                            <div className="text-sm font-bold text-slate-300">App Store</div>
                                        </div>
                                    </button>

                                    {/* Play Store Button */}
                                    <button className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center gap-3 cursor-not-allowed opacity-80 group">
                                        <svg viewBox="0 0 512 512" className="w-8 h-8">
                                            <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z" />
                                            <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" />
                                            <path fill="#FBBC04" d="M425.2 225.6l-58.9-34.1-37.5 37.5 37.5 37.5 58.9-34.1c9.8-5.6 9.8-15.1 0-20.8z" />
                                            <path fill="#EA4335" d="M47 512l256.6-256 60.1 60.1L83.8 491.5c-4.4 4.5 2.1 22.4 9.1 16.5l-45.9 4z" />
                                        </svg>
                                        <div className="text-left">
                                            <div className="text-[10px] text-slate-500 font-bold uppercase">Get it on</div>
                                            <div className="text-sm font-bold text-slate-300">Google Play</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div>
                        <h3 className="text-white font-bold mb-6">Company</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Careers', 'Our Team', 'Contact', 'Blog'].map((item, i) => (
                                <li key={i}><Link to="#" className="text-sm hover:text-violet-400 transition-colors flex items-center gap-1 group">
                                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-violet-500">-</span>
                                    {item}
                                </Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Services</h3>
                        <ul className="space-y-3">
                            {['Buy Property', 'Sell Property', 'Rent Property', 'Legal Verification', 'Property Valuation'].map((item, i) => (
                                <li key={i}><Link to="#" className="text-sm hover:text-violet-400 transition-colors flex items-center gap-1 group">
                                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-violet-500">-</span>
                                    {item}
                                </Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Legal Services</h3>
                        <ul className="space-y-3">
                            {['Title Search', 'Property Registration', 'Legal Opinion', 'Loan Assistance', 'Vastu Consultation'].map((item, i) => (
                                <li key={i}><Link to="#" className="text-sm hover:text-violet-400 transition-colors flex items-center gap-1 group">
                                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-violet-500">-</span>
                                    {item}
                                </Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Info</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm">
                                <MapPin className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-400">123, Real Estate Hub, Tech City, Bangalore - 560100</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Phone className="h-5 w-5 text-violet-600 flex-shrink-0" />
                                <span className="text-slate-400 font-mono">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm">
                                <Mail className="h-5 w-5 text-violet-600 flex-shrink-0" />
                                <span className="text-slate-400">support@propolex.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} Prop O Lex Pvt Ltd. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
