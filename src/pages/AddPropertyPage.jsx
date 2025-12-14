import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { useUI } from '@/context/UIContext';
import Step1BasicInfo from '@/features/add-property/components/Step1BasicInfo';
import Step2PropertyDetails from '@/features/add-property/components/Step2PropertyDetails';
import Step3Media from '@/features/add-property/components/Step3Media';
import Step4Preview from '@/features/add-property/components/Step4Preview';

const AddPropertyPage = () => {
    const { showNotification, showLoading, showModal } = useUI();
    const [currentStep, setCurrentStep] = useState(0);
    const [maxStepReached, setMaxStepReached] = useState(0); // Track furthest step reached
    const [direction, setDirection] = useState('forward');
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        // Step 1
        title: '',
        category: '',
        subCategory: '',
        listingType: '',
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
        // Clear Validation Error on Change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const updateFileMetadata = (name, index, key, value) => {
        setFormData(prev => {
            // Create shallow copy of array to trigger re-render
            const updatedFiles = [...prev[name]];
            // We mutate the File object directly because spreading it ({...file}) breaks internal File behaviors/properties in some environments.
            // Since we created a new array reference 'updatedFiles', React will detect the change in formData.
            // To ensure nested components update, they should not strictly memoize on file reference alone if file properties change,
            // OR we should accept that we are mutating the file in place.
            updatedFiles[index][key] = value;
            return { ...prev, [name]: updatedFiles };
        });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 0) {
            // Step 1: Basic Info Validation
            if (!formData.title?.trim()) newErrors.title = "Property Title is required";
            else if (formData.title.length < 10) newErrors.title = "Title must be at least 10 characters";
            else if (formData.title.length > 100) newErrors.title = "Title must not exceed 100 characters";

            if (!formData.category) newErrors.category = "Category is required";
            if (!formData.subCategory) newErrors.subCategory = "Sub Category is required";
            if (!formData.listingType) newErrors.listingType = "Listing Type is required";

            if (!formData.expectedPrice) newErrors.expectedPrice = "Expected Price is required";
            else if (Number(formData.expectedPrice) <= 0) newErrors.expectedPrice = "Price must be greater than 0";

            if (formData.negotiatedPrice) {
                if (Number(formData.negotiatedPrice) <= 0) newErrors.negotiatedPrice = "Negotiated Price must be valid";
                else if (Number(formData.negotiatedPrice) > Number(formData.expectedPrice)) newErrors.negotiatedPrice = "Negotiated Price cannot exceed Expected Price";
            }

            if (!formData.firstName?.trim()) newErrors.firstName = "First Name is required";
            else if (formData.firstName.length < 2) newErrors.firstName = "First Name is too short";

            if (!formData.lastName?.trim()) newErrors.lastName = "Last Name is required";

            // Phone Regex: Starts with optional +91, then 6-9 followed by 9 digits
            const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
            if (!formData.phone) newErrors.phone = "Phone Number is required";
            else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = "Invalid Indian Phone Number (10 digits)";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email) newErrors.email = "Email Address is required";
            else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid Email Address";
        }

        if (step === 1) {
            // Step 2: Property Details Validation
            if (!formData.plotArea && !formData.builtUpArea) {
                newErrors.plotArea = "Complete at least one area field";
                newErrors.builtUpArea = "Complete at least one area field";
            } else {
                if (formData.plotArea && Number(formData.plotArea) <= 0) newErrors.plotArea = "Area must be positive";
                if (formData.builtUpArea && Number(formData.builtUpArea) <= 0) newErrors.builtUpArea = "Area must be positive";
            }

            if (!formData.bedrooms) newErrors.bedrooms = "Bedrooms is required";
            if (!formData.bathrooms) newErrors.bathrooms = "Bathrooms is required";

            // Address Validation
            if (!formData.addressLine1?.trim()) newErrors.addressLine1 = "Address Line 1 is required";
            else if (formData.addressLine1.length < 5) newErrors.addressLine1 = "Address is too short";

            if (!formData.city?.trim()) newErrors.city = "City is required";
            if (!formData.state?.trim()) newErrors.state = "State is required";

            const pincodeRegex = /^\d{6}$/;
            if (!formData.pincode) newErrors.pincode = "Pincode is required";
            else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = "Pincode must be exactly 6 digits";
        }

        if (step === 2) {
            // Step 3: Media Validation (Existing + Doc Type Checks)
            if (!formData.images || formData.images.length === 0) {
                newErrors.images = "At least one property image is required";
            }
            if (!formData.ownershipDocs || formData.ownershipDocs.length === 0) {
                newErrors.ownershipDocs = "At least one ownership document is required";
            } else {
                const invalidDocs = formData.ownershipDocs.filter(file => !file.docType);
                if (invalidDocs.length > 0) {
                    newErrors.ownershipDocs = `Please select Document Type for: ${invalidDocs.map(f => f.name).join(', ')}`;
                }
            }
            if (formData.additionalDocs && formData.additionalDocs.length > 0) {
                const invalidAdditional = formData.additionalDocs.filter(file => !file.customLabel || !file.customLabel.trim());
                if (invalidAdditional.length > 0) {
                    newErrors.additionalDocs = `Please enter labels for: ${invalidAdditional.map(f => f.name).join(', ')}`;
                }
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const nextStep = () => {
        if (!validateStep(currentStep)) {
            showNotification('error', 'Please fill in all required fields highlighted in red.');
            return;
        }
        if (currentStep < steps.length - 1) {
            const nextStepIndex = currentStep + 1;
            setDirection('forward');
            setCurrentStep(nextStepIndex);
            // Update max step reached
            if (nextStepIndex > maxStepReached) {
                setMaxStepReached(nextStepIndex);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection('backward');
            setCurrentStep(prev => prev - 1);
            setErrors({}); // Clear errors when going back
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Jump to step
    const goToStep = (stepIndex) => {
        // Allow navigation to any previously visited step (up to maxStepReached)
        // But not beyond what user has unlocked
        if (stepIndex > maxStepReached) return;
        if (stepIndex === currentStep) return;

        setDirection(stepIndex > currentStep ? 'forward' : 'backward');
        setCurrentStep(stepIndex);
        setErrors({}); // Clear errors when jumping to a step
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = () => {
        showModal({
            title: 'Confirm Submission',
            content: 'Are you sure you want to list this property?',
            onConfirm: () => {
                showLoading(true);
                // Simulate API call
                setTimeout(() => {
                    showLoading(false);
                    showNotification('success', 'Property Listed Successfully!', 5000);
                }, 2000);
            }
        });
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
                    <div className="flex items-center justify-center w-full">
                        {steps.map((step, index) => {
                            // Show all steps up to the furthest reached (not just current)
                            if (index > maxStepReached) return null;

                            const isCompleted = index < currentStep;
                            const isActive = index === currentStep;

                            return (
                                <React.Fragment key={step.id}>
                                    {/* Connecting Line (Show before step if not first) */}
                                    {index > 0 && (
                                        <div className="w-16 sm:w-32 h-1 mx-2 rounded-full bg-violet-600 animate-slide-right origin-left"></div>
                                    )}
                                    {/* Step Circle */}
                                    <div
                                        onClick={() => goToStep(index)}
                                        className={`flex flex-col items-center relative z-10 cursor-pointer group animate-fade-in-up`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4 
                                             ${isActive ? 'bg-violet-600 text-white border-violet-200 scale-110 shadow-lg shadow-violet-200' :
                                                'bg-violet-600 text-white border-violet-600'}`}>
                                            {isCompleted ? <Check size={20} /> : index + 1}
                                        </div>
                                        <span className={`text-xs font-semibold mt-2 absolute -bottom-6 w-32 text-center transition-colors text-violet-700`}>
                                            {step.title}
                                        </span>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area with Animation */}
                <div className="mb-8 min-h-[400px] overflow-hidden">
                    <div key={currentStep} className={direction === 'forward' ? 'animate-slide-right' : 'animate-slide-left'}>
                        {currentStep === 0 && <Step1BasicInfo formData={formData} handleChange={handleChange} errors={errors} />}
                        {currentStep === 1 && <Step2PropertyDetails formData={formData} handleChange={handleChange} handleArrayChange={handleArrayChange} errors={errors} />}
                        {currentStep === 2 && <Step3Media formData={formData} handleFileChange={handleFileChange} removeFile={removeFile} updateFileMetadata={updateFileMetadata} errors={errors} />}
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
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5"
                        >
                            Submit Verification
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
