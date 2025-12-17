import React from 'react';
import { LayoutDashboard, Heart, Search, User, LogOut, Bell, Settings, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BuyerDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get user from navigation state or fallback
    const user = location.state?.user || { name: 'S Anandh', email: 'user@example.com' };

    const handleLogout = () => {
        // Clear any auth tokens here if needed
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-violet-600 font-bold text-xl">
                        <HomeIcon className="w-8 h-8" />
                        <span>RealEstate<span className="text-slate-900">AI</span></span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <NavItem icon={<Search size={20} />} label="Saved Searches" />
                    <NavItem icon={<Heart size={20} />} label="Favorites" badge="12" />
                    <NavItem icon={<Bell size={20} />} label="Notifications" badge="3" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=7c3aed&color=fff`}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                        <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header (Mobile-Friendly) */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                        <p className="text-slate-500">Here's what's happening via your properties today.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-violet-600 hover:border-violet-100 hover:shadow-md transition-all relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Stats / Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={<Search className="text-blue-600" size={24} />}
                        bg="bg-blue-50"
                        title="Saved Searches"
                        value="5"
                        desc="2 new matches found"
                    />
                    <StatCard
                        icon={<Heart className="text-rose-600" size={24} />}
                        bg="bg-rose-50"
                        title="Favorited Homes"
                        value="12"
                        desc="Price dropped on 1 property"
                    />
                    <StatCard
                        icon={<MapPin className="text-emerald-600" size={24} />}
                        bg="bg-emerald-50"
                        title="Scheduled Visits"
                        value="3"
                        desc="Next visit tomorrow at 10 AM"
                    />
                </div>

                {/* Recent Activity Section */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-lg font-bold text-slate-900">Recommended for You</h2>
                        <button className="text-violet-600 text-sm font-semibold hover:underline">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* Placeholder Property Cards */}
                        <PropertyCard
                            image="https://images.unsplash.com/photo-1600596542815-2495db98dada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            price="$2,500,000"
                            title="Modern Villa in Beverly Hills"
                            location="123 Palm Street, Beverly Hills, CA"
                            beds="5" baths="6" sqft="4,500"
                        />
                        <PropertyCard
                            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            price="$850,000"
                            title="Luxury Apartment with City View"
                            location="456 Skyline Ave, New York, NY"
                            beds="2" baths="2" sqft="1,200"
                        />
                        <PropertyCard
                            image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            price="$1,200,000"
                            title="Cozy Family Home"
                            location="789 Maple Drive, Austin, TX"
                            beds="4" baths="3" sqft="2,800"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

// --- Sub Components ---

const HomeIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
)

const NavItem = ({ icon, label, active, badge }) => (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${active ? 'bg-violet-50 text-violet-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
        <span className={active ? 'text-violet-600' : 'text-slate-400'}>{icon}</span>
        <span className="font-medium text-sm flex-1">{label}</span>
        {badge && <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </div>
);

const StatCard = ({ icon, bg, title, value, desc }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${bg}`}>{icon}</div>
        </div>
        <div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
            <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
            <p className="text-xs text-slate-400">{desc}</p>
        </div>
    </div>
);

const PropertyCard = ({ image, price, title, location, beds, baths, sqft }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
            <div className="absolute top-3 right-3 z-10">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors">
                    <Heart size={16} />
                </button>
            </div>
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white font-bold text-xl">{price}</p>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-bold text-slate-900 mb-1 truncate">{title}</h3>
            <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                <MapPin size={14} />
                <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1"><span className="text-slate-900 font-bold">{beds}</span> Beds</div>
                <div className="w-px h-3 bg-slate-200"></div>
                <div className="flex items-center gap-1"><span className="text-slate-900 font-bold">{baths}</span> Baths</div>
                <div className="w-px h-3 bg-slate-200"></div>
                <div className="flex items-center gap-1"><span className="text-slate-900 font-bold">{sqft}</span> sqft</div>
            </div>
        </div>
    </div>
)

export default BuyerDashboard;
