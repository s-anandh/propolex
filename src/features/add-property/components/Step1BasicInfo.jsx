import React from 'react';
import { Building2, User } from 'lucide-react';

const InputGroup = ({ label, name, value, onChange, placeholder, type = "text", required = false, error, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 outline-none transition-all placeholder:text-slate-400 text-slate-700 bg-white
                    ${error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'}`}
                {...props}
            />
            {/* Inline Error Message (Near Input) */}
            {error && (
                <p className="text-xs text-red-500 font-medium mt-1 animate-slide-in-down absolute -bottom-5 left-0">
                    {error}
                </p>
            )}
        </div>
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

const Step1BasicInfo = ({ formData, handleChange, errors = {} }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up pb-6"> {/* Added pb-6 to accommodate error messages */}

            {/* Column 1: Property Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <Building2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Property Information</h3>
                </div>

                <div className="space-y-6"> {/* Increased spacing */}
                    <InputGroup
                        label="Property Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Luxury 3BHK Villa in Whitefield"
                        required
                        error={errors.title}
                        minLength={10}
                        maxLength={50}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <SelectGroup
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            options={['Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial']}
                            required
                            error={errors.category}
                        />
                        <SelectGroup
                            label="Sub Category"
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                            options={['Resale', 'New Launch', 'Ready to Move', 'Under Construction']}
                            required
                            error={errors.subCategory}
                        />
                    </div>

                    <SelectGroup
                        label="Listing Type"
                        name="listingType"
                        value={formData.listingType}
                        onChange={handleChange}
                        options={['Sale', 'Rent', 'Lease']}
                        required
                        error={errors.listingType}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputGroup
                            label="Expected Price (₹)"
                            name="expectedPrice"
                            value={formData.expectedPrice}
                            onChange={handleChange}
                            placeholder="0"
                            type="number"
                            required
                            error={errors.expectedPrice}
                            min="0"
                        />
                        <InputGroup
                            label="Negotiated Price (₹)"
                            name="negotiatedPrice"
                            value={formData.negotiatedPrice}
                            onChange={handleChange}
                            placeholder="Optional"
                            type="number"
                            min="0"
                        />
                    </div>
                </div>
            </div>

            {/* Column 2: Contact Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <User size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Contact Details</h3>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputGroup
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                            error={errors.firstName}
                            minLength={2}
                            maxLength={50}
                        />
                        <InputGroup
                            label="Last Name ( initials allowed )"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            required
                            error={errors.lastName}
                            minLength={1}
                            maxLength={50}
                        />
                    </div>

                    <InputGroup
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        type="tel"
                        required
                        error={errors.phone}
                    />

                    <InputGroup
                        label="Whatsapp Number (Optional)"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        type="tel"
                    />

                    <InputGroup
                        label="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        type="email"
                        required
                        error={errors.email}
                    />
                </div>
            </div>

        </div>
    );
};

export default Step1BasicInfo;
