import React from 'react';
import { Edit, AlertCircle } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';

const Step4Preview = ({ formData, onEditStep }) => {
    // Create mock property for preview - matching PropertyCard's expected structure
    const previewImages = formData.images && formData.images.length > 0
        ? formData.images.map(file => URL.createObjectURL(file))
        : ['https://via.placeholder.com/400x300?text=No+Image'];

    const mockProperty = {
        id: 'preview',
        title: formData.title || 'Property Title',
        price: Number(formData.expectedPrice) || 0,
        valuation: Number(formData.negotiatedPrice) || 0,
        location: formData.city || 'City',
        images: previewImages,
        bhk: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        baths: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
        sqft: Number(formData.builtUpArea) || Number(formData.plotArea) || 0,
        verified: false,
        listedTime: 'Just Now',
        type: formData.category || 'Property',
        badge: formData.subCategory || 'New',
        features: (formData.amenities || []).slice(0, 5)
    };

    const DetailRow = ({ label, value, required = false }) => {
        const isEmpty = !value || value === 'N/A' || value === '0' || (Array.isArray(value) && value.length === 0);

        return (
            <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm font-medium text-slate-600">
                    {label} {required && <span className="text-red-500">*</span>}
                </span>
                <span className={`text-sm font-semibold ${isEmpty && required ? 'text-red-500 flex items-center gap-1' : 'text-slate-800'}`}>
                    {isEmpty && required && <AlertCircle size={14} />}
                    {isEmpty ? (
                        <span className="italic">{required ? 'Missing' : 'Not provided'}</span>
                    ) : (
                        Array.isArray(value) ? value.join(', ') : value
                    )}
                </span>
            </div>
        );
    };

    return (
        <div className="animate-fade-in-up space-y-8">

            {/* Property Card Preview - Full Width */}
            <div className="bg-gradient-to-br from-violet-50 to-blue-50 p-6 rounded-2xl border border-violet-100">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <span className="text-violet-600">📋</span> Listing Preview
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">This is how your property will appear on the platform</p>
                    </div>
                    <button
                        onClick={() => onEditStep(0)}
                        className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg hover:bg-violet-50 transition-colors"
                    >
                        <Edit size={14} /> Edit
                    </button>
                </div>
                <div className="bg-white rounded-xl p-4">
                    <PropertyCard property={mockProperty} />
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-slate-800">Basic Information</h4>
                        <button
                            onClick={() => onEditStep(0)}
                            className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                        >
                            <Edit size={12} /> Edit
                        </button>
                    </div>
                    <div className="space-y-1">
                        <DetailRow label="Property Title" value={formData.title} required />
                        <DetailRow label="Category" value={formData.category} required />
                        <DetailRow label="Sub Category" value={formData.subCategory} required />
                        <DetailRow label="Listing Type" value={formData.listingType} required />
                        <DetailRow label="Expected Price" value={formData.expectedPrice ? `₹${formData.expectedPrice}` : ''} required />
                        <DetailRow label="Negotiated Price" value={formData.negotiatedPrice ? `₹${formData.negotiatedPrice}` : ''} />
                    </div>
                </div>

                {/* Contact Details */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-slate-800">Contact Details</h4>
                        <button
                            onClick={() => onEditStep(0)}
                            className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                        >
                            <Edit size={12} /> Edit
                        </button>
                    </div>
                    <div className="space-y-1">
                        <DetailRow label="Name" value={`${formData.firstName} ${formData.lastName}`.trim()} required />
                        <DetailRow label="Phone" value={formData.phone} required />
                        <DetailRow label="WhatsApp" value={formData.whatsapp} />
                        <DetailRow label="Email" value={formData.email} required />
                    </div>
                </div>

                {/* Property Details */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-slate-800">Property Details</h4>
                        <button
                            onClick={() => onEditStep(1)}
                            className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                        >
                            <Edit size={12} /> Edit
                        </button>
                    </div>
                    <div className="space-y-1">
                        <DetailRow label="Plot Area" value={formData.plotArea ? `${formData.plotArea} Sq.ft` : ''} />
                        <DetailRow label="Built-up Area" value={formData.builtUpArea ? `${formData.builtUpArea} Sq.ft` : ''} />
                        <DetailRow label="Bedrooms" value={formData.bedrooms} />
                        <DetailRow label="Bathrooms" value={formData.bathrooms} />
                        <DetailRow label="Facing" value={formData.facing} />

                        {/* Custom Features */}
                        {formData.features && formData.features.length > 0 && (
                            <div className="pt-2">
                                <span className="text-xs text-slate-500 font-medium">Custom Features:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.features.map((feature, idx) => (
                                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amenities */}
                        {formData.amenities && formData.amenities.length > 0 && (
                            <div className="pt-2">
                                <span className="text-xs text-slate-500 font-medium">Amenities:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.amenities.map((amenity, idx) => (
                                        <span key={idx} className="text-xs bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-slate-800">Address</h4>
                        <button
                            onClick={() => onEditStep(1)}
                            className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                        >
                            <Edit size={12} /> Edit
                        </button>
                    </div>
                    <div className="space-y-1">
                        <DetailRow label="Address Line 1" value={formData.addressLine1} required />
                        <DetailRow label="Address Line 2" value={formData.addressLine2} />
                        <DetailRow label="City" value={formData.city} required />
                        <DetailRow label="State" value={formData.state} required />
                        <DetailRow label="Pincode" value={formData.pincode} required />
                    </div>
                </div>
            </div>

            {/* Documents & Media - Full Width */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800">Documents & Media</h4>
                    <button
                        onClick={() => onEditStep(2)}
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                    >
                        <Edit size={12} /> Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Property Images */}
                    <div className={`p-4 rounded-lg border-2 ${formData.images?.length > 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{formData.images?.length > 0 ? '✅' : '❌'}</span>
                                <div>
                                    <h5 className="font-semibold text-sm text-slate-800">Property Images *</h5>
                                    <p className="text-xs text-slate-500">Required for listing</p>
                                </div>
                            </div>
                        </div>
                        {formData.images?.length > 0 ? (
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-green-700">{formData.images.length} image(s) uploaded</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {formData.images.slice(0, 3).map((img, idx) => (
                                        <div key={idx} className="w-16 h-16 rounded overflow-hidden border border-slate-200">
                                            <img src={URL.createObjectURL(img)} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    {formData.images.length > 3 && (
                                        <div className="w-16 h-16 rounded bg-slate-100 border border-slate-200 flex items-center justify-center">
                                            <span className="text-xs text-slate-600 font-medium">+{formData.images.length - 3}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-red-600 font-medium">No images uploaded</p>
                        )}
                    </div>

                    {/* Ownership Documents */}
                    <div className={`p-4 rounded-lg border-2 ${formData.ownershipDocs?.length > 0 ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{formData.ownershipDocs?.length > 0 ? '📄' : '📋'}</span>
                                <div>
                                    <h5 className="font-semibold text-sm text-slate-800">Ownership Documents</h5>
                                    <p className="text-xs text-slate-500">Optional</p>
                                </div>
                            </div>
                        </div>
                        {formData.ownershipDocs?.length > 0 ? (
                            <div>
                                <p className="text-sm font-medium text-blue-700">{formData.ownershipDocs.length} document(s) uploaded</p>
                                <div className="mt-2 space-y-1">
                                    {formData.ownershipDocs.slice(0, 2).map((doc, idx) => (
                                        <p key={idx} className="text-xs text-slate-600 truncate">📎 {doc.name}</p>
                                    ))}
                                    {formData.ownershipDocs.length > 2 && (
                                        <p className="text-xs text-slate-500">...and {formData.ownershipDocs.length - 2} more</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">No documents uploaded</p>
                        )}
                    </div>

                    {/* Additional Documents */}
                    <div className={`p-4 rounded-lg border-2 ${formData.additionalDocs?.length > 0 ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{formData.additionalDocs?.length > 0 ? '📄' : '📋'}</span>
                                <div>
                                    <h5 className="font-semibold text-sm text-slate-800">Additional Documents</h5>
                                    <p className="text-xs text-slate-500">Optional</p>
                                </div>
                            </div>
                        </div>
                        {formData.additionalDocs?.length > 0 ? (
                            <div>
                                <p className="text-sm font-medium text-blue-700">{formData.additionalDocs.length} document(s) uploaded</p>
                                <div className="mt-2 space-y-1">
                                    {formData.additionalDocs.slice(0, 2).map((doc, idx) => (
                                        <p key={idx} className="text-xs text-slate-600 truncate">📎 {doc.name}</p>
                                    ))}
                                    {formData.additionalDocs.length > 2 && (
                                        <p className="text-xs text-slate-500">...and {formData.additionalDocs.length - 2} more</p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">No documents uploaded</p>
                        )}
                    </div>

                    {/* Property Brochure */}
                    <div className={`p-4 rounded-lg border-2 ${formData.brochure ? 'border-purple-200 bg-purple-50' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{formData.brochure ? '📘' : '📖'}</span>
                                <div>
                                    <h5 className="font-semibold text-sm text-slate-800">Property Brochure</h5>
                                    <p className="text-xs text-slate-500">Optional</p>
                                </div>
                            </div>
                        </div>
                        {formData.brochure ? (
                            <div>
                                <p className="text-sm font-medium text-purple-700">Brochure uploaded</p>
                                <p className="text-xs text-slate-600 mt-1 truncate">📎 {formData.brochure.name}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500">No brochure uploaded</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4Preview;
