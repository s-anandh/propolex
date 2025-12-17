import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = () => {
        if (!formData.email) {
            alert("Please enter a valid email address.");
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Sending OTP to', formData.email);
            setOtpSent(true);
            setIsLoading(false);
            alert('OTP Sent! (Use 1234)');
        }, 800);
    };

    const handleResendOtp = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Resending OTP to', formData.email);
            setIsLoading(false);
            alert('OTP Resent! (Use 1234)');
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
        } else {
            alert('Invalid OTP (Try 1234)');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            console.log('Login Data:', { email: formData.email, password: formData.password });
            return;
        }

        // Registration Logic
        if (!isEmailVerified) {
            alert("Please verify your email first!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log('Registration Data:', formData);
        alert('Registration Successful!');
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        // Reset states
        setOtpSent(false);
        setIsEmailVerified(false);
        setOtp('');
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: ''
        });
    }

    return (
        <div className="min-h-screen bg-white flex">
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
                        Find the perfect place to call home.
                    </h2>
                    <p className="text-violet-100 text-lg leading-relaxed">
                        Join thousands of users who have found their dream properties with our platform. Seamless, secure, and simple.
                    </p>

                    <div className="mt-12 flex gap-4">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <img
                                    key={i}
                                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                    alt="User"
                                    className="w-10 h-10 rounded-full border-2 border-violet-600"
                                />
                            ))}
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="font-bold">10k+</span>
                            <span className="text-xs text-violet-200">Happy Customers</span>
                        </div>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-500/30 rounded-full blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative">
                <Link to="/" className="absolute top-6 left-6 lg:left-12 flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors text-sm font-medium">
                    <ArrowRight size={16} className="rotate-180" /> Back to Home
                </Link>

                <div className="w-full max-w-md space-y-8 animate-fade-in-up">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h1>
                        <p className="text-slate-500">
                            {isLogin
                                ? 'Please enter your details to sign in.'
                                : isEmailVerified
                                    ? 'Complete your profile details.'
                                    : 'Lets start with your email.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Email Field - Always visible but functionality changes based on state */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    disabled={!isLogin && (otpSent || isEmailVerified)}
                                    className={`w-full pl-10 pr-24 py-3 rounded-xl border focus:ring-2 outline-none transition-all text-slate-800 
                                        ${isEmailVerified
                                            ? 'bg-green-50 border-green-200 text-green-700'
                                            : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'}`}
                                />

                                {/* Verify / Change Logic in Register Mode */}
                                {!isLogin && (
                                    <React.Fragment>
                                        {!isEmailVerified && !otpSent && formData.email && (
                                            <button
                                                type="button"
                                                onClick={handleSendOtp}
                                                disabled={isLoading}
                                                className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-violet-100 text-violet-700 text-xs font-bold rounded-lg hover:bg-violet-200 transition-colors disabled:opacity-50"
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
                        </div>

                        {/* OTP Input Section */}
                        {otpSent && !isEmailVerified && !isLogin && (
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
                                        placeholder="Enter 4-digit OTP"
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

                        {/* Registration Details - Only shown AFTER verification */}
                        {(!isLogin && isEmailVerified) && (
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
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-slate-800"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Password Fields - Show for Login OR (Register AND Verified) */}
                        {(isLogin || isEmailVerified) && (
                            <div className="space-y-4 animate-fade-in-up">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-slate-700">Password</label>
                                        {isLogin && (
                                            <button type="button" className="text-xs font-medium text-violet-600 hover:text-violet-700">
                                                Forgot Password?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-slate-800"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all text-slate-800"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submit Button - Only show when ready (Login OR Register Verified) */}
                        {(isLogin || isEmailVerified) && (
                            <button
                                type="submit"
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5 animate-fade-in-up"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        )}
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            Facebook
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-600">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={toggleMode}
                                className="text-violet-600 font-bold hover:text-violet-700 hover:underline transition-all"
                            >
                                {isLogin ? 'Sign up for free' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Icon for Name input
const UserIcon = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export default LoginPage;
