import React from 'react';
import { Upload, Image as ImageIcon, FileText, Trash2 } from 'lucide-react';

const FileUploadZone = ({ label, accept, multiple, onChange, icon: Icon, helpText, required = false, error }) => (
    <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className={`relative border-2 border-dashed rounded-xl p-8 hover:bg-slate-50 transition-colors text-center cursor-pointer group ${error ? 'border-red-300 bg-red-50/50' : 'border-slate-300'
            }`}>
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept={accept}
                multiple={multiple}
                onChange={onChange}
            />
            <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-full group-hover:scale-110 transition-transform ${error ? 'bg-red-50 text-red-600' : 'bg-violet-50 text-violet-600'
                    }`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-500 mt-1">{helpText}</p>
                </div>
            </div>
        </div>
        {/* Inline Error Message */}
        {error && (
            <p className="text-xs text-red-500 font-medium mt-1 animate-slide-in-down flex items-center gap-1">
                <span>⚠️</span> {error}
            </p>
        )}
    </div>
);

const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toUpperCase();
};

// Memoized URL creation, but component itself re-renders on prop changes (like input values)
const DocumentPreviewCard = ({ file, index, onRemove, category, updateFileMetadata, hasError }) => {
    const isPDF = file.type === 'application/pdf';
    const isDoc = file.type.includes('word') || file.type.includes('document') || file.name.endsWith('.doc') || file.name.endsWith('.docx');
    const fileExt = getFileExtension(file.name);

    // Stable URL creation
    const fileUrl = React.useMemo(() => URL.createObjectURL(file), [file]);

    // Cleanup URL on unmount (or file change ref)
    React.useEffect(() => {
        return () => URL.revokeObjectURL(fileUrl);
    }, [fileUrl]);

    // Visual Error State
    const borderClass = hasError ? "border-red-400 bg-red-50/10" : "border-slate-200 hover:border-violet-300";

    return (
        <div className={`relative group bg-white border-2 ${borderClass} rounded-xl overflow-hidden hover:shadow-lg transition-all`}>
            <div className="flex flex-col gap-3 p-3">
                {/* Document Preview */}
                <div className="w-full">
                    <div className="bg-slate-800 text-white px-3 py-2 flex items-center justify-between rounded-t-lg">
                        <span className="text-xs font-medium flex items-center gap-2">
                            <FileText size={12} /> {isPDF ? 'PDF Preview' : 'Document'}
                        </span>
                        <div className="flex items-center gap-2">
                            {category === 'ownershipDocs' && file.docType && (
                                <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">
                                    {file.docType}
                                </span>
                            )}
                            <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded text-slate-300">Read-only</span>
                        </div>
                    </div>
                    <div className="h-64 bg-slate-100 rounded-b-lg overflow-hidden relative border-x border-b border-slate-200 shadow-sm">
                        {isPDF ? (
                            <iframe
                                src={`${fileUrl}#toolbar=0&view=FitH`}
                                className="w-full h-full"
                                title={file.name}
                            />
                        ) : isDoc ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <FileText size={48} className="text-blue-600" />
                                </div>
                                <div className="text-center">
                                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg">
                                        {fileExt}
                                    </span>
                                    <p className="text-[10px] text-slate-600 mt-2">Word Doc</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-3 p-4">
                                <div className="p-3 bg-slate-100 rounded-xl">
                                    <FileText size={48} className="text-slate-600" />
                                </div>
                                <div className="text-center">
                                    <span className="px-3 py-1 bg-slate-500 text-white text-xs font-bold rounded-lg">
                                        {fileExt || 'FILE'}
                                    </span>
                                    <p className="text-[10px] text-slate-600 mt-2">File</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Document Info & Controls */}
                <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-slate-800 break-words leading-tight mb-1" title={file.name}>
                                {file.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded">{fileExt}</span>
                                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <button
                            onClick={onRemove}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            title="Remove Document"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    {/* Metadata Inputs */}
                    <div className="pt-2 border-t border-slate-100">
                        {category === 'ownershipDocs' && (
                            <select
                                value={file.docType || ''}
                                onChange={(e) => updateFileMetadata(category, index, 'docType', e.target.value)}
                                className={`w-full text-xs p-2.5 border-2 rounded-lg outline-none focus:border-violet-500 focus:bg-white transition-colors font-medium ${hasError && !file.docType ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 bg-slate-50 text-slate-700'
                                    }`}
                            >
                                <option value="" disabled>Select Document Type *</option>
                                <option value="RERA Registration">RERA Registration</option>
                                <option value="Sale Deed">Sale Deed</option>
                                <option value="Khata Certificate">Khata Certificate</option>
                                <option value="Tax Receipt">Tax Receipt</option>
                                <option value="Survey Sketch">Survey Sketch</option>
                                <option value="Possession Certificate">Possession Certificate</option>
                                <option value="Other">Other</option>
                            </select>
                        )}

                        {category === 'additionalDocs' && (
                            <input
                                type="text"
                                placeholder="Label (e.g. Electricity Bill)"
                                value={file.customLabel || ''}
                                onChange={(e) => updateFileMetadata(category, index, 'customLabel', e.target.value)}
                                className={`w-full text-xs p-2.5 border-2 rounded-lg outline-none focus:border-violet-500 focus:bg-white transition-colors ${hasError && (!file.customLabel || !file.customLabel.trim()) ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-300' : 'border-slate-200 bg-slate-50'
                                    }`}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FileList = ({ files, onRemove, category, updateFileMetadata, errors }) => {
    if (!files || files.length === 0) return null;

    // Separate images from documents
    const images = [];
    const documents = [];

    Array.from(files).forEach((file, index) => {
        if (file.type.startsWith('image/')) {
            images.push({ file, index });
        } else {
            documents.push({ file, index });
        }
    });

    const checkError = (file) => {
        if (category === 'ownershipDocs' && errors?.ownershipDocs && !file.docType) return true;
        if (category === 'additionalDocs' && errors?.additionalDocs && (!file.customLabel || !file.customLabel.trim())) return true;
        return false;
    };

    return (
        <div className="space-y-6 mt-4">
            {/* Images Grid - Compact 3-4 columns */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {images.map(({ file, index }) => {
                        const fileUrl = URL.createObjectURL(file); // Images are less sensitive to reload, but could also be optimized
                        return (
                            <div key={index} className="relative group bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-violet-300 hover:shadow-lg transition-all">
                                <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
                                    <img
                                        src={fileUrl}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => onRemove(index)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-lg z-10"
                                        title="Remove file"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <div className="p-2 bg-white border-t border-slate-100">
                                    <p className="text-xs font-medium text-slate-700 truncate" title={file.name}>
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Documents - Full width cards with better preview */}
            {documents.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {documents.map(({ file, index }) => (
                        <DocumentPreviewCard
                            key={`${file.name}-${file.size}-${file.lastModified}`}
                            file={file}
                            index={index}
                            onRemove={() => onRemove(index)}
                            category={category}
                            updateFileMetadata={updateFileMetadata}
                            hasError={checkError(file)}
                        />
                    ))}
                </div>
            )}
        </div >
    );
};

const Step3Media = ({ formData, handleFileChange, removeFile, updateFileMetadata, errors = {} }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">

            {/* Property Images */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <ImageIcon size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Property Images</h3>
                        <p className="text-xs text-slate-500">Upload high quality images for better visibility.</p>
                    </div>
                </div>

                <FileUploadZone
                    label="Upload Photos"
                    accept="image/*"
                    multiple
                    icon={Upload}
                    helpText="SVG, PNG, JPG or GIF (max. 5MB per file)"
                    onChange={(e) => handleFileChange(e, 'images')}
                    required
                    error={errors.images}
                />

                <FileList files={formData.images} onRemove={(index) => removeFile('images', index)} errors={errors} />
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Property Documents</h3>
                        <p className="text-xs text-slate-500">Legal documents to verify ownership.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div>
                        <FileUploadZone
                            label="Ownership Documents"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            multiple
                            icon={FileText}
                            helpText="RERA, Katha, Sale Deed, etc."
                            onChange={(e) => handleFileChange(e, 'ownershipDocs')}
                            required
                            error={errors.ownershipDocs}
                        />
                        <FileList
                            files={formData.ownershipDocs}
                            onRemove={(index) => removeFile('ownershipDocs', index)}
                            category="ownershipDocs"
                            updateFileMetadata={updateFileMetadata}
                            errors={errors}
                        />
                    </div>

                    <div>
                        <FileUploadZone
                            label="Additional Documents (Optional)"
                            accept=".pdf,.doc,.docx"
                            multiple
                            icon={FileText}
                            helpText="Any other supporting docs."
                            onChange={(e) => handleFileChange(e, 'additionalDocs')}
                            error={errors.additionalDocs}
                        />
                        <FileList
                            files={formData.additionalDocs}
                            onRemove={(index) => removeFile('additionalDocs', index)}
                            category="additionalDocs"
                            updateFileMetadata={updateFileMetadata}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* Brochure */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div className="p-2 bg-violet-50 rounded-lg text-violet-600">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Brochure</h3>
                </div>

                <FileUploadZone
                    label="Upload Property Brochure (Optional)"
                    accept=".pdf"
                    multiple={false}
                    icon={FileText}
                    helpText="PDF format only."
                    onChange={(e) => handleFileChange(e, 'brochure')}
                />
                <FileList files={formData.brochure ? [formData.brochure] : []} onRemove={() => removeFile('brochure', 0)} />
            </div>

        </div>
    );
};

export default Step3Media;
