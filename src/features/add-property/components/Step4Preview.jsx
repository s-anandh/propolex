import React from 'react';
import { MapPin, User, CheckCircle, Smartphone, Mail, Edit } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';

const Step4Preview = ({ formData, onEditStep }) => {

    // Construct a mock property object for the Card preview
    // Note: Creating object URLs for images if they are File objects
    const previewImages = formData.images && formData.images.length > 0
        ? Array.from(formData.images).map(file => URL.createObjectURL(file))
        : ['https://via.placeholder.com/400x300?text=No+Image'];

    const mockProperty = {
        id: 'preview',
        title: formData.title || 'Property Title Preview',
        price: Number(formData.expectedPrice) || 0,
        valuation: Number(formData.negotiatedPrice) || 0,
        location: formData.city || 'City',
        images: previewImages,
        bhk: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        baths: formData.bathrooms ? parseInt(formData.bathrooms) : 0,
        sqft: Number(formData.builtUpArea) || 0,
        verified: false,
        listedTime: 'Just Now',
        type: formData.category || 'Type',
        badge: formData.subCategory || 'New',
        features: (formData.amenities || []).slice(0, 5) // Show first 5
    };

    const DetailRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-slate-50 last:border-0">
            <span className="text-slate-500 font-medium">{label}</span>
            <span className="text-slate-800 font-semibold text-right">{value || '-'}</span>
        </div>
    );

    return (
        <div className="animate-fade-in-up space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">Review & Submit</h2>
                <p className="text-slate-500">Check how your property looks before listing.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left: Card Preview */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-800">Listing Preview</h3>
                            <button onClick={() => onEditStep(1)} className="text-sm text-violet-600 hover:text-violet-700 font-semibold flex items-center gap-1">
                                <Edit size={14} /> Edit
                            </button>
                        </div>
                        {/* Render Vertical Card for preview */}
                        <div className="max-w-sm mx-auto lg:mx-0 pointer-events-none">
                            <PropertyCard property={mockProperty} layout="vertical" />
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center lg:text-left">* Button interactions disabled in preview</p>
                    </div>
                </div>

                {/* Right: Detailed Summary */}
                <div className="space-y-6">

                    {/* Basic & Contact Verification */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Basic & Contact Info</h3>
                            <button onClick={() => onEditStep(0)} className="text-xs text-slate-400 hover:text-violet-600"><Edit size={14} /></button>
                        </div>
                        <div className="space-y-1 text-sm">
                            <DetailRow label="Owner" value={`${formData.firstName} ${formData.lastName}`} />
                            <DetailRow label="Phone" value={formData.phone} />
                            <DetailRow label="Email" value={formData.email} />
                            <DetailRow label="Category" value={`${formData.category} (${formData.subCategory})`} />
                            <DetailRow label="Listing Type" value={formData.listingType} />
                        </div>
                    </div>

                    {/* Property Details Verification */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Property Details</h3>
                            <button onClick={() => onEditStep(1)} className="text-xs text-slate-400 hover:text-violet-600"><Edit size={14} /></button>
                        </div>
                        <div className="space-y-1 text-sm">
                            <DetailRow label="Address" value={`${formData.addressLine1}, ${formData.city}`} />
                            <DetailRow label="Built-up Area" value={`${formData.builtUpArea} Sq.ft`} />
                            <DetailRow label="Config" value={`${formData.bedrooms}, ${formData.bathrooms} Baths`} />
                            <DetailRow label="Facing" value={formData.facing} />
                            <div className="pt-2">
                                <span className="text-slate-500 font-medium block mb-1">Amenities:</span>
                                <div className="flex flex-wrap gap-1">
                                    {(formData.amenities || []).map(a => (
                                        <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Docs Verification */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Documents</h3>
                            <button onClick={() => onEditStep(2)} className="text-xs text-slate-400 hover:text-violet-600"><Edit size={14} /></button>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle size={16} className={formData.ownershipDocs?.length ? "text-green-500" : "text-slate-300"} />
                                <span>Ownership Documents {formData.ownershipDocs?.length ? `(${formData.ownershipDocs.length})` : '(Not Uploaded)'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                                <CheckCircle size={16} className={formData.images?.length ? "text-green-500" : "text-slate-300"} />
                                <span>Property Images {formData.images?.length ? `(${formData.images.length})` : '(Not Uploaded)'}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Step4Preview;
