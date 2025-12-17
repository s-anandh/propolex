import React from 'react';
import { Edit, AlertCircle, FileCheck, FileX, FileText, File, BookOpen, Paperclip, CheckCircle2, XCircle, LayoutGrid } from 'lucide-react';
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
                            <LayoutGrid className="text-violet-600" size={20} /> Listing Preview
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
                        <DetailRow label="Maintenance Charges" value={formData.maintenanceCharges ? `₹${formData.maintenanceCharges}/month` : ''} />
                        {(formData.listingType === 'Rent' || formData.listingType === 'Lease') && (
                            <DetailRow label="Security Deposit" value={formData.securityDeposit ? `₹${formData.securityDeposit}` : ''} />
                        )}
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
                        <DetailRow label="Total Floors" value={formData.totalFloors} />
                        <DetailRow label="Property on Floor" value={formData.floorNo} />
                        <DetailRow label="Age of Property" value={formData.ageOfProperty} />
                        <DetailRow label="Balconies" value={formData.balconies} />
                        <DetailRow label="Parking" value={[
                            formData.parkingCovered ? `${formData.parkingCovered} Covered` : null,
                            formData.parkingOpen ? `${formData.parkingOpen} Open` : null
                        ].filter(Boolean).join(', ')} />

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
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800">Documents & Media</h4>
                    <button
                        onClick={() => onEditStep(2)}
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                    >
                        <Edit size={12} /> Edit
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Property Images */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            {formData.images?.length > 0 ? <CheckCircle2 className="text-green-600" size={18} /> : <XCircle className="text-red-500" size={18} />}
                            <h5 className="font-semibold text-sm text-slate-800">Property Images</h5>
                        </div>

                        {formData.images?.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="aspect-square relative rounded-lg overflow-hidden border border-slate-200 group">
                                        <img src={URL.createObjectURL(img)} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-red-500 italic px-3 py-2 bg-red-50 rounded-lg border border-red-100 inline-block">
                                No images uploaded (Required)
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Ownership Documents */}
                        <div className={`p-4 rounded-xl border ${formData.ownershipDocs?.length > 0 ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                {formData.ownershipDocs?.length > 0 ? <FileCheck className="text-blue-600" size={18} /> : <File className="text-slate-400" size={18} />}
                                <h5 className="font-semibold text-sm text-slate-800">Ownership Documents</h5>
                            </div>

                            {formData.ownershipDocs?.length > 0 ? (
                                <div className="space-y-2">
                                    {formData.ownershipDocs.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                                <FileText size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-700 truncate">{doc.name}</p>
                                                <p className="text-[10px] text-slate-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">No documents provided</p>
                            )}
                        </div>

                        {/* Additional Documents */}
                        <div className={`p-4 rounded-xl border ${formData.additionalDocs?.length > 0 ? 'border-blue-100 bg-blue-50/30' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                {formData.additionalDocs?.length > 0 ? <FileCheck className="text-blue-600" size={18} /> : <File className="text-slate-400" size={18} />}
                                <h5 className="font-semibold text-sm text-slate-800">Additional Documents</h5>
                            </div>

                            {formData.additionalDocs?.length > 0 ? (
                                <div className="space-y-2">
                                    {formData.additionalDocs.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                                            <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                                <FileText size={16} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-slate-700 truncate">{doc.name}</p>
                                                <p className="text-[10px] text-slate-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">No documents provided</p>
                            )}
                        </div>
                    </div>

                    {/* Brochure */}
                    <div>
                        <div className={`p-4 rounded-xl border ${formData.brochure ? 'border-purple-100 bg-purple-50/30' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                {formData.brochure ? <BookOpen className="text-purple-600" size={18} /> : <BookOpen className="text-slate-400" size={18} />}
                                <h5 className="font-semibold text-sm text-slate-800">Property Brochure</h5>
                            </div>

                            {formData.brochure ? (
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 shadow-sm max-w-md">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded">
                                        <BookOpen size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-700 truncate">{formData.brochure.name}</p>
                                        <p className="text-xs text-slate-500">{(formData.brochure.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <span className="ml-auto text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">PDF</span>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500 italic">No brochure uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step4Preview;
