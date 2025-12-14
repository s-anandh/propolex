import React, { useState } from 'react';
import { Home, MapPin, Plus, X } from 'lucide-react';

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", required = false, suffix, error, ...props }) => (
    <div className={`space-y-1.5 ${error ? 'mb-5 ' : ''}`}>
        <label className="text-sm font-semibold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative rounded-lg">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all placeholder:text-slate-400 text-slate-700 bg-white ${suffix ? 'pr-20' : ''}
                    ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'}`}
                {...props}
            />
            {suffix && (
                <div className="absolute inset-y-0.5 right-0.5 px-3 flex items-center bg-slate-50 border-l border-slate-200 rounded-r-lg text-slate-500 text-sm font-medium pointer-events-none">
                    {suffix}
                </div>
            )}
        </div>
        {/* Inline Error Message - Outside relative container */}
        {error && (
            <p className="text-xs text-red-500 font-medium mt-1 animate-slide-in-down">
                {error}
            </p>
        )}
    </div>
);

const SelectGroup = ({ label, name, value, onChange, options, required = false, error }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all appearance-none bg-white text-slate-700 cursor-pointer
                    ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'}`}
            >
                <option value="">Select Option</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className={`w-4 h-4 ${error ? 'text-red-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>

            {/* Inline Error Message */}
            {error && (
                <p className="text-xs text-red-500 font-medium mt-1 animate-slide-in-down absolute -bottom-5 left-0">
                    {error}
                </p>
            )}
        </div>
    </div>
);

const AMENITIES_LIST = [
    'Swimming Pool', 'Gym', 'Club House', 'Parking', 'Lift',
    'Security', 'Park', 'Gas Pipeline', 'Power Backup', 'Water Supply'
];

const Step2PropertyDetails = ({ formData, handleChange, handleArrayChange, errors = {} }) => {
    const [customFeature, setCustomFeature] = useState('');

    const toggleAmenity = (amenity) => {
        const currentAmenities = formData.amenities || [];
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];

        handleArrayChange('amenities', newAmenities);
    };

    const addCustomFeature = () => {
        if (!customFeature.trim()) return;
        const currentFeatures = formData.features || [];
        handleArrayChange('features', [...currentFeatures, customFeature.trim()]);
        setCustomFeature('');
    };

    const removeFeature = (index) => {
        const currentFeatures = formData.features || [];
        const newFeatures = currentFeatures.filter((_, i) => i !== index);
        handleArrayChange('features', newFeatures);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up pb-6">

            {/* Column 1: Property Specifications */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <Home size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Property Details</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputGroup
                            label="Plot Area"
                            name="plotArea"
                            value={formData.plotArea}
                            onChange={handleChange}
                            placeholder="1200"
                            suffix="Sq.ft"
                            type="number"
                            error={errors.plotArea}
                            min="0"
                        />
                        <InputGroup
                            label="Built-up Area"
                            name="builtUpArea"
                            value={formData.builtUpArea}
                            onChange={handleChange}
                            placeholder="2400"
                            suffix="Sq.ft"
                            type="number"
                            error={errors.builtUpArea}
                            min="0"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <SelectGroup
                            label="Bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            options={['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK']}
                            required
                            error={errors.bedrooms}
                        />
                        <SelectGroup
                            label="Bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            options={['1', '2', '3', '4', '5+']}
                            required
                            error={errors.bathrooms}
                        />
                    </div>

                    <SelectGroup
                        label="Facing"
                        name="facing"
                        value={formData.facing}
                        onChange={handleChange}
                        options={['North', 'East', 'West', 'South', 'North-East', 'South-East', 'North-West', 'South-West']}
                    />

                    {/* Amenities Selection */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Amenities</label>
                        <div className="flex flex-wrap gap-2">
                            {AMENITIES_LIST.map(amenity => {
                                const isSelected = (formData.amenities || []).includes(amenity);
                                return (
                                    <button
                                        key={amenity}
                                        type="button"
                                        onClick={() => toggleAmenity(amenity)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${isSelected
                                            ? 'bg-violet-100 border-violet-200 text-violet-700'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-violet-300'
                                            }`}
                                    >
                                        {amenity}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Custom Features */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Additional Features</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={customFeature}
                                onChange={(e) => setCustomFeature(e.target.value)}
                                placeholder="Add custom feature (e.g. Solar Panels)"
                                className="flex-grow px-4 py-2 rounded-lg border border-slate-200 focus:border-violet-500 outline-none text-sm"
                                onKeyPress={(e) => e.key === 'Enter' && addCustomFeature()}
                            />
                            <button
                                onClick={addCustomFeature}
                                className="p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                            >
                                <Plus size={20} />
                            </button>
                        </div>

                        {formData.features && formData.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.features.map((feature, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                                        {feature}
                                        <button onClick={() => removeFeature(index)} className="hover:text-red-500">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Column 2: Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <MapPin size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Address Details</h3>
                </div>

                <div className="space-y-6">
                    <InputGroup
                        label="Address Line 1"
                        name="addressLine1"
                        value={formData.addressLine1}
                        onChange={handleChange}
                        placeholder="House No, Street Name"
                        required
                        error={errors.addressLine1}
                        minLength={5}
                        maxLength={200}
                    />
                    <InputGroup
                        label="Address Line 2"
                        name="addressLine2"
                        value={formData.addressLine2}
                        onChange={handleChange}
                        placeholder="Landmark, Area"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputGroup
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Bangalore"
                            required
                            error={errors.city}
                        />
                        <InputGroup
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Karnataka"
                            required
                            error={errors.state}
                        />
                    </div>
                    <InputGroup
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="560001"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        error={errors.pincode}
                    />
                </div>
            </div>

        </div>
    );
};

export default Step2PropertyDetails;
