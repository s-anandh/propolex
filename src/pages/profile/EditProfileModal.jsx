
import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Upload, Camera, AlertCircle } from 'lucide-react';
// Since Step2PropertyDetails exports Step2, I'll make a custom simple input here or reuse generic components if available.
// To keep it clean and independent, I'll build simple inputs here.

const EditProfileModal = ({ user, onClose, onSave }) => {
    // Split initial location if possible, otherwise empty
    const splitLocation = user?.location ? user.location.split(', ') : [];

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone?.replace(/^\+\d+\s?/, '') || '', // Strip existing code for display
        countryCode: user?.phone?.match(/^\+\d+/)?.[0] || '+91', // Extract code or default
        role: user?.role || '',
        image: user?.image || '',
        // Structured Address
        address: '',
        city: splitLocation[0] || '',
        state: splitLocation[1] || '',
        pincode: ''
    });

    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const validate = () => {
        const newErrors = {};

        // Mobile Validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        // Strip non-digits for validation check
        const cleanPhone = formData.phone.replace(/\D/g, '');

        if (!formData.phone) newErrors.phone = "Phone number is required";
        else if (!phoneRegex.test(cleanPhone)) newErrors.phone = "Invalid valid 10-digit mobile number";

        // Required Fields
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.pincode) newErrors.pincode = "Pincode is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Combine address back to legacy 'location' string for parent compatibility
            // But also pass full object if needed later
            const fullLocation = `${formData.city}, ${formData.state}`; // Simple display string
            const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
            const fullPhone = `${formData.countryCode} ${formData.phone}`;

            onSave({
                ...user,
                name: formData.name,
                phone: fullPhone,
                location: fullLocation, // Keeping the short "Bangalore, India" format for the card display
                image: formData.image,
                fullAddress: fullAddress // Storing full details
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all animate-slide-up overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Image Upload */}
                    <div className="flex flex-col items-center">
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => fileInputRef.current.click()}
                        >
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-100 group-hover:border-violet-100 transition-colors">
                                <img src={formData.image || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                <Camera className="text-white" size={28} />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 font-medium">Click to upload new photo</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Personal Details</h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-violet-500 outline-none transition-all bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
                                <div className="flex gap-2">
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode || '+91'}
                                        onChange={handleChange}
                                        className="w-24 px-2 py-2 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none text-slate-700 font-medium transition-all bg-slate-50 focus:bg-white appearance-none text-center"
                                    >
                                        <option value="+91">+91 (IN)</option>
                                        <option value="+1">+1 (US)</option>
                                        <option value="+44">+44 (UK)</option>
                                        <option value="+971">+971 (UAE)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength="10" // Assuming 10-digit local number for validation
                                        placeholder="98765 43210"
                                        className={`flex-1 px-4 py-2 rounded-xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                                    />
                                </div>
                                {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role (Read Only)</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    readOnly
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed font-medium"
                                />
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Location Details</h3>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Landmark / Locality</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Near City Center, MG Road"
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.address ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                                />
                                {errors.address && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-xl border ${errors.city ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                                    />
                                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-xl border ${errors.state ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                                    />
                                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength="6"
                                    placeholder="000000"
                                    className={`w-full px-4 py-2 rounded-xl border ${errors.pincode ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                                />
                                {errors.pincode && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.pincode}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 pt-4 border-t border-slate-100 modal-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl shadow-lg shadow-violet-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
