import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import Step1BasicInfo from '@/features/add-property/components/Step1BasicInfo';
import Step2PropertyDetails from '@/features/add-property/components/Step2PropertyDetails';
import Step3Media from '@/features/add-property/components/Step3Media';
import Step4Preview from '@/features/add-property/components/Step4Preview';

const AddPropertyPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState('forward');
    const [formData, setFormData] = useState({
        // Step 1
        title: '',
        category: '',
        subCategory: '',
        listingType: 'Sale',
        expectedPrice: '',
        negotiatedPrice: '',
        firstName: '',
        lastName: '',
        phone: '',
        whatsapp: '',
        email: '',
        // Step 2
        plotArea: '',
        builtUpArea: '',
        bedrooms: '',
        bathrooms: '',
        facing: '',
        amenities: [],
        features: [],
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        // Step 3
        images: [],
        ownershipDocs: [],
        additionalDocs: [],
        brochure: null
    });

    const steps = [
        { id: 0, title: 'Basic Info' },
        { id: 1, title: 'Details & Address' },
        { id: 2, title: 'Media Upload' },
        { id: 3, title: 'Preview & Submit' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, name) => {
        const files = Array.from(e.target.files);
        if (name === 'brochure') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: [...prev[name], ...files] }));
        }
    };

    const removeFile = (name, index) => {
        if (name === 'brochure') {
            setFormData(prev => ({ ...prev, [name]: null }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: prev[name].filter((_, i) => i !== index)
            }));
        }
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setDirection('forward');
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection('backward'); // Animation slides IN from Left (content moves right visually)
            setCurrentStep(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Jump to step
    const goToStep = (stepIndex) => {
        if (stepIndex === currentStep) return;
        setDirection(stepIndex > currentStep ? 'forward' : 'backward');
        setCurrentStep(stepIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-900">List Your Property</h1>
                    <p className="text-slate-500 mt-2">Follow the 4 simple steps to list your property and get best leads.</p>
                </div>

                {/* Stepper Progress */}
                <div className="mb-12">
                    <div className="flex items-center justify-between w-full">
                        {steps.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isActive = index === currentStep;

                            return (
                                <React.Fragment key={step.id}>
                                    {/* Step Circle */}
                                    <div
                                        onClick={() => goToStep(index)}
                                        className="flex flex-col items-center relative z-10 cursor-pointer group"
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 
                                            ${isActive ? 'bg-violet-600 text-white border-violet-200 scale-110 shadow-lg shadow-violet-200' :
                                                isCompleted ? 'bg-violet-600 text-white border-violet-600' :
                                                    'bg-white text-slate-400 border-slate-200 group-hover:border-violet-200'}`}>
                                            {isCompleted ? <Check size={20} /> : index + 1}
                                        </div>
                                        <span className={`text-xs font-semibold mt-2 absolute -bottom-6 w-32 text-center transition-colors
                                            ${isActive ? 'text-violet-700' : isCompleted ? 'text-violet-600' : 'text-slate-400'}`}>
                                            {step.title}
                                        </span>
                                    </div>

                                    {/* Connecting Line (Don't show after last step) */}
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 h-1 mx-4 rounded-full bg-slate-200 relative overflow-hidden">
                                            <div
                                                className={`absolute inset-0 bg-violet-600 transition-all duration-500 ease-out origin-left`}
                                                style={{
                                                    transform: isCompleted ? 'scaleX(1)' : 'scaleX(0)'
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area with Animation */}
                <div className="mb-8 min-h-[400px] overflow-hidden">
                    <div key={currentStep} className={direction === 'forward' ? 'animate-slide-right' : 'animate-slide-left'}>
                        {currentStep === 0 && <Step1BasicInfo formData={formData} handleChange={handleChange} />}
                        {currentStep === 1 && <Step2PropertyDetails formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} />}
                        {currentStep === 2 && <Step3Media formData={formData} handleFileChange={handleFileChange} removeFile={removeFile} />}
                        {currentStep === 3 && <Step4Preview formData={formData} onEditStep={goToStep} />}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`px-6 py-2.5 rounded-lg font-semibold transition-colors ${currentStep === 0
                            ? 'text-slate-300 cursor-not-allowed hidden'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        Back
                    </button>

                    {currentStep === steps.length - 1 ? (
                        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5">
                            Submit Listing
                        </button>
                    ) : (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-0.5"
                        >
                            Next Step <ChevronRight size={18} />
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AddPropertyPage;
