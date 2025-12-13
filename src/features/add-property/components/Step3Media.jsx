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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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

const FileList = ({ files, onRemove }) => {
    if (!files || files.length === 0) return null;

    return (
        <div className="space-y-2 mt-4">
            {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-slate-100 rounded text-slate-500">
                            {file.type.startsWith('image/') ? <ImageIcon size={16} /> : <FileText size={16} />}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                            <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(index)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

const Step3Media = ({ formData, handleFileChange, removeFile, errors = {} }) => {
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

                <FileList files={formData.images} onRemove={(index) => removeFile('images', index)} />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <FileUploadZone
                            label="Ownership Documents"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            multiple
                            icon={FileText}
                            helpText="RERA, Katha, Sale Deed, etc."
                            onChange={(e) => handleFileChange(e, 'ownershipDocs')}
                        />
                        <FileList files={formData.ownershipDocs} onRemove={(index) => removeFile('ownershipDocs', index)} />
                    </div>

                    <div>
                        <FileUploadZone
                            label="Additional Documents (Optional)"
                            accept=".pdf,.doc,.docx"
                            multiple
                            icon={FileText}
                            helpText="Any other supporting docs."
                            onChange={(e) => handleFileChange(e, 'additionalDocs')}
                        />
                        <FileList files={formData.additionalDocs} onRemove={(index) => removeFile('additionalDocs', index)} />
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
