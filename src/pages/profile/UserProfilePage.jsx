import React, { useState } from 'react';
import { Camera, Edit2, MapPin, Phone, Mail, Clock, Bookmark, Home, Eye, Building2 } from 'lucide-react';
import PropertyComp from '@/components/properties/PropertyComp';
import { ALL_PROPERTIES } from '@/data/mockProperties';
import EditProfileModal from './EditProfileModal';

const UserProfilePage = () => {
    // Mock User Data
    const [user, setUser] = useState({
        name: "S Anandh",
        role: "Property Seeker",
        email: "anandh@example.com",
        phone: "+91 98765 43210",
        location: "Bangalore, India",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        profileScore: 85 // Percentage
    });

    const [activeTab, setActiveTab] = useState('activity');
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveProfile = (updatedUser) => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    // Mock Activities
    const recentViews = ALL_PROPERTIES.slice(0, 3);
    const shortlisted = ALL_PROPERTIES.slice(2, 4);

    return (
        <div className="min-h-screen bg-slate-50 py-12 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">

                            {/* Profile Image with Score Ring */}
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                {/* SVG Ring */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        className="text-slate-100"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="60"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 60}
                                        strokeDashoffset={2 * Math.PI * 60 * (1 - user.profileScore / 100)}
                                        className="text-violet-600 transition-all duration-1000 ease-out"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                {/* Image Overlay */}
                                <div className="absolute top-1 left-1 w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white shadow-inner">
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                </div>
                                {/* Score Badge */}
                                <div className="absolute bottom-0 right-0 bg-violet-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white">
                                    {user.profileScore}%
                                </div>
                                {/* Edit Image Button */}
                                <button className="absolute top-0 right-0 bg-white p-1.5 rounded-full text-slate-500 hover:text-violet-600 border border-slate-200 shadow-sm transition-colors">
                                    <Camera size={14} />
                                </button>
                            </div>

                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                                <p className="text-sm text-slate-500 font-medium">{user.role}</p>
                            </div>

                            {/* Info List */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Mail size={16} className="text-slate-400" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Phone size={16} className="text-slate-400" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <MapPin size={16} className="text-slate-400" />
                                    <span>{user.location}</span>
                                </div>
                            </div>

                            {/* Edit Profile Button */}
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors"
                            >
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Activity & Dashboard */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. My Listings Container (Separate Card) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                                        <Building2 size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">My Listings</h3>
                                </div>
                                <button className="text-sm bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-violet-100 flex items-center gap-2">
                                    + Post Property
                                </button>
                            </div>

                            {/* Listings List */}
                            <div className="grid grid-cols-1 gap-4">
                                {ALL_PROPERTIES.slice(4, 5).map(property => (
                                    <div key={property.id} className="relative group">
                                        <PropertyComp property={property} />
                                        <div className="absolute bottom-3 right-3 flex gap-2 z-10">
                                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-green-200 shadow-sm flex items-center">Active</span>
                                            <button className="bg-white p-1.5 rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-violet-600 transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {ALL_PROPERTIES.length < 5 && (
                                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                                        <p className="text-slate-500 font-medium">You haven't posted any properties yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 2. Activity / Saved / Contacted Container */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[500px]">

                            {/* Tabs Header */}
                            <div className="flex border-b border-slate-100 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('activity')}
                                    className={`flex-1 min-w-[100px] py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'activity' ? 'border-violet-600 text-violet-600 bg-violet-50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <Clock size={16} /> Activity
                                </button>
                                <button
                                    onClick={() => setActiveTab('shortlist')}
                                    className={`flex-1 min-w-[100px] py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'shortlist' ? 'border-violet-600 text-violet-600 bg-violet-50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <Bookmark size={16} /> Saved
                                </button>
                                <button
                                    onClick={() => setActiveTab('contacted')}
                                    className={`flex-1 min-w-[100px] py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'contacted' ? 'border-violet-600 text-violet-600 bg-violet-50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                >
                                    <Phone size={16} /> Contacted
                                </button>
                            </div>

                            <div className="p-6">
                                {activeTab === 'activity' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Recently Viewed</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {recentViews.map(property => (
                                                <PropertyComp key={property.id} property={property} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'shortlist' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Saved Properties</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {shortlisted.map(property => (
                                                <PropertyComp key={property.id} property={property} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'contacted' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Contacted Properties</h3>
                                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                            <div className="p-4 bg-slate-50 rounded-full mb-3">
                                                <Phone size={32} />
                                            </div>
                                            <p className="font-medium">You haven't contacted any owners yet.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditing(false)}
                    onSave={handleSaveProfile}
                />
            )}
        </div>
    );
};

export default UserProfilePage;
