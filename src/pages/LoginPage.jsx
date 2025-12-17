import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Home, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';
import { useUI } from '../context/UIContext';

const LoginPage = () => {
    // Navigation
    const navigate = useNavigate();

    // Modes: 'login', 'register', 'forgot-password'
    const [view, setView] = useState('login');

    // UI Context
    const { showNotification } = useUI();

    // Common States
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Errors State
    const [errors, setErrors] = useState({});

    // Register / OTP States
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    // Forgot Password State
    const [resetLinkSent, setResetLinkSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    // Email Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    // --- Validation Helper ---
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!value) error = 'Email is required';
                else if (!emailRegex.test(value)) error = 'Invalid email format';
                break;
            case 'password':
                if (!value) error = 'Password is required';
                else if (value.length < 6) error = 'Password must be at least 6 characters';
                break;
            case 'confirmPassword':
                if (!value) error = 'Confirm Password is required';
                else if (value !== formData.password) error = 'Passwords do not match';
                break;
            case 'firstName':
                if (!value) error = 'First Name is required';
                break;
            case 'lastName':
                if (!value) error = 'Last Name is required';
                break;
            default:
                break;
        }
        return error;
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (view === 'login') {
            const emailError = validateField('email', formData.email);
            const passwordError = validateField('password', formData.password);
            if (emailError) newErrors.email = emailError;
            if (passwordError) newErrors.password = passwordError;
        } else if (view === 'register') {
            if (isEmailVerified) {
                const firstNameError = validateField('firstName', formData.firstName);
                const lastNameError = validateField('lastName', formData.lastName);
                const passwordError = validateField('password', formData.password);
                const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword);

                if (firstNameError) newErrors.firstName = firstNameError;
                if (lastNameError) newErrors.lastName = lastNameError;
                if (passwordError) newErrors.password = passwordError;
                if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
            }
        } else if (view === 'forgot-password') {
            const emailError = validateField('email', formData.email);
            if (emailError) newErrors.email = emailError;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };


    // --- Actions ---

    const handleSendOtp = () => {
        // Specific validation for Email formatted check
        const emailError = validateField('email', formData.email);
        if (emailError) {
            setErrors({ ...errors, email: emailError });
            showNotification('error', emailError);
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Sending OTP to', formData.email);
            setOtpSent(true);
            setIsLoading(false);
            showNotification('success', 'OTP Sent! (Use 1234)');
        }, 800);
    };

    const handleResendOtp = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Resending OTP to', formData.email);
            setIsLoading(false);
            showNotification('success', 'OTP Resent! (Use 1234)');
        }, 800);
    }

    const handleChangeEmail = () => {
        setOtpSent(false);
        setOtp('');
        setIsEmailVerified(false);
    }

    const handleVerifyOtp = () => {
        if (otp === '1234') {
            setIsEmailVerified(true);
            setOtpSent(false);
            showNotification('success', 'Email Verified Successfully!');
        } else {
            showNotification('error', 'Invalid OTP (Try 1234)');
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            showNotification('error', "Please fix the errors below.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setResetLinkSent(true);
            setIsLoading(false);
            showNotification('success', 'Reset link sent to your email.');
        }, 800);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Run validations
        if (!validateForm()) {
            showNotification('error', "Please fix the validation errors.");
            return;
        }

        if (view === 'login') {
            console.log('Login Data:', { email: formData.email, password: formData.password });
            showNotification('success', 'Login Successful! Redirecting...');

            // Navigate to Dashboard with User Data
            setTimeout(() => {
                navigate('/dashboard-buyer', {
                    state: {
                        user: {
                            name: 'S Anandh', // Mock Name for Login (since we don't have it in form)
                            email: formData.email
                        }
                    }
                });
            }, 800);
            return;
        }

        if (view === 'register') {
            if (!isEmailVerified) {
                showNotification('error', "Please verify your email first!");
                return;
            }

            console.log('Registration Data:', formData);
            showNotification('success', 'Registration Successful! Redirecting to Login...');
            // Switch to Login Mode
            setTimeout(() => {
                setView('login');
                // Optional: Pre-fill email/name for easier login, or direct login could happen here too
            }, 1500);
        }
    };

    // --- Navigation Helpers ---

    const goBack = () => {
        if (view === 'register' || view === 'forgot-password') {
            setView('login');
            setErrors({}); // Clear errors
            // Reset crucial states when leaving register/forgot
            setResetLinkSent(false);
        }
    };

    // --- UI Helper for Input Error ---
    const ErrorMsg = ({ msg }) => msg ? (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1 animate-fade-in-up">
            <AlertCircle size={12} /> {msg}
        </p>
    ) : null;

    const getInputClass = (isError) => `w-full px-4 py-3 rounded-xl border outline-none transition-all text-slate-800 ${isError ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100'}`;
    const getIconClass = (isError) => `absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isError ? 'text-red-400' : 'text-slate-400'}`;


    // --- Renderers ---

    return (
        <div className="min-h-screen bg-white flex">

            {/* Fix for Double Eye Icon in Edge/IE */}
            <style>{`
                input::-ms-reveal,
                input::-ms-clear {
                    display: none;
                }
            `}</style>

            {/* Left Side - Image/Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-violet-600 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-800 opacity-90 z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80"
                    alt="Real Estate"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-20 text-white p-12 max-w-lg">
                    <div className="mb-8 p-3 bg-white/10 w-fit rounded-xl backdrop-blur-sm border border-white/20">
                        <Home size={32} />
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        {view === 'forgot-password' ? 'Recover your account.' : 'Find the perfect place to call home.'}
                    </h2>
                    <p className="text-violet-100 text-lg leading-relaxed">
                        {view === 'forgot-password'
                            ? "Don't worry, it happens. We'll help you get back in no time."
                            : "Join thousands of users who have found their dream properties with our platform. Seamless, secure, and simple."}
                    </p>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-500/30 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">

                {/* Dynamic Back Button */}
                {view === 'login' ? (
                    <Link to="/" className="absolute top-6 left-6 lg:left-12 flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                ) : (
                    <button onClick={goBack} className="absolute top-6 left-6 lg:left-12 flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                )}

                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            {view === 'login' && 'Welcome Back!'}
                            {view === 'register' && 'Create Account'}
                            {view === 'forgot-password' && 'Forgot Password?'}
                        </h1>
                        <p className="text-slate-500">
                            {view === 'login' && 'Please enter your details to sign in.'}
                            {view === 'register' && (isEmailVerified ? 'Complete your profile details.' : 'Lets start with your email.')}
                            {view === 'forgot-password' && 'Enter your email to receive reset instructions.'}
                        </p>
                    </div>

                    {/* --- FORGOT PASSWORD VIEW --- */}
                    {view === 'forgot-password' && (
                        <div className="space-y-6">
                            {!resetLinkSent ? (
                                <form onSubmit={handleForgotPassword} className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                        <div className="relative">
                                            <div className={getIconClass(errors.email)}>
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="name@example.com"
                                                className={`${getInputClass(errors.email)} pl-10`}
                                            />
                                        </div>
                                        <ErrorMsg msg={errors.email} />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5 disabled:opacity-70"
                                    >
                                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center space-y-4 p-6 bg-green-50 rounded-2xl border border-green-100 animate-fade-in-up">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Mail size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">Check your mail</h3>
                                    <p className="text-slate-600 text-sm">
                                        We have sent a password reset link to <span className="font-semibold text-slate-800">{formData.email}</span>
                                    </p>
                                    <button
                                        onClick={() => setView('login')}
                                        className="text-violet-600 font-bold hover:text-violet-800 hover:underline text-sm"
                                    >
                                        Skip, I'll login now
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- LOGIN & REGISTER VIEWS --- */}
                    {(view === 'login' || view === 'register') && (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email Field - Always visible */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                <div className="relative">
                                    <div className={getIconClass(errors.email)}>
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        disabled={view === 'register' && (otpSent || isEmailVerified)}
                                        className={`${getInputClass(errors.email)} pl-10 pr-24 ${isEmailVerified ? '!bg-green-50 !border-green-200 !text-green-700' : ''}`}
                                    />

                                    {/* Register Mode: Verify Actions */}
                                    {view === 'register' && (
                                        <React.Fragment>
                                            {!isEmailVerified && !otpSent && (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={isLoading}
                                                    className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-violet-100 text-violet-700 text-xs font-bold rounded-lg hover:bg-violet-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isLoading ? '...' : 'Verify'}
                                                </button>
                                            )}
                                            {(otpSent || isEmailVerified) && (
                                                <button
                                                    type="button"
                                                    onClick={handleChangeEmail}
                                                    className="absolute right-2 top-2 px-2 py-1 text-xs text-slate-400 hover:text-violet-600 hover:underline"
                                                >
                                                    Change
                                                </button>
                                            )}
                                        </React.Fragment>
                                    )}

                                    {isEmailVerified && (
                                        <div className="absolute right-14 inset-y-0 flex items-center text-green-600 font-medium text-xs gap-1">
                                            <CheckCircle2 size={16} /> Verified
                                        </div>
                                    )}
                                </div>
                                <ErrorMsg msg={errors.email} />
                            </div>

                            {/* Register: OTP Input */}
                            {view === 'register' && otpSent && !isEmailVerified && (
                                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 animate-slide-in-down">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-slate-700">Enter Verification Code</label>
                                        <button onClick={handleResendOtp} type="button" className="text-xs text-slate-400 hover:text-violet-600 underline">
                                            Resend Code
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="1234"
                                            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-slate-800 tracking-widest text-center font-mono"
                                            maxLength={4}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyOtp}
                                            className="px-5 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors text-sm"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        We sent a code to <span className="font-semibold text-slate-700">{formData.email}</span>
                                    </p>
                                </div>
                            )}

                            {/* Register: Personal Details (After Verification) */}
                            {view === 'register' && isEmailVerified && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="John"
                                                className={getInputClass(errors.firstName)}
                                            />
                                            <ErrorMsg msg={errors.firstName} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                className={getInputClass(errors.lastName)}
                                            />
                                            <ErrorMsg msg={errors.lastName} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Password Fields - Show if Login OR (Register & Verified) */}
                            {(view === 'login' || (view === 'register' && isEmailVerified)) && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center">
                                            <label className="text-sm font-semibold text-slate-700">Password</label>
                                            {view === 'login' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setView('forgot-password')}
                                                    className="text-xs font-medium text-violet-600 hover:text-violet-700"
                                                >
                                                    Forgot Password?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <div className={getIconClass(errors.password)}>
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className={`${getInputClass(errors.password)} pl-10 pr-10`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <ErrorMsg msg={errors.password} />
                                    </div>

                                    {/* Register: Confirm Password */}
                                    {view === 'register' && (
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                                            <div className="relative">
                                                <div className={getIconClass(errors.confirmPassword)}>
                                                    <Lock size={18} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className={`${getInputClass(errors.confirmPassword)} pl-10 pr-10`}
                                                />
                                            </div>
                                            <ErrorMsg msg={errors.confirmPassword} />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            {(view === 'login' || isEmailVerified) && (
                                <button
                                    type="submit"
                                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5 animate-fade-in-up"
                                >
                                    {view === 'login' ? 'Sign In' : 'Create Account'}
                                </button>
                            )}
                        </form>
                    )}

                    {/* Social Login & Toggle Divider */}
                    {(view === 'login' || view === 'register') && (
                        <>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {/* Social Buttons (Placeholder) */}
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                                    {/* Google SVG */}
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                                    {/* Facebook SVG */}
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-slate-600">
                                    {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                                    <button
                                        onClick={() => setView(view === 'login' ? 'register' : 'login')}
                                        className="text-violet-600 font-bold hover:text-violet-700 hover:underline transition-all"
                                    >
                                        {view === 'login' ? 'Sign up for free' : 'Sign in'}
                                    </button>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
