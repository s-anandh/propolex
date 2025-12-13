import React from 'react';
import { useUI } from '@/context/UIContext';
import { Loader2, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const GlobalOverlay = () => {
    const { isLoading, notification, setNotification, modal, closeModal } = useUI();

    if (!isLoading && !notification && !modal) return null;

    return (
        <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-start pt-10">

            {/* 1. Loading Spinner (Full Screen Overlay) */}
            {isLoading && (
                <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[110] flex items-center justify-center pointer-events-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 animate-scale-in">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-sm font-semibold text-slate-600 animate-pulse">Loading...</p>
                    </div>
                </div>
            )}

            {/* 2. Toast Notification (Top Right) */}
            {notification && (
                <div className="fixed top-6 right-6 z-[120] animate-slide-left pointer-events-auto">
                    <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${notification.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
                        notification.type === 'success' ? 'bg-green-50 border-green-100 text-green-800' :
                            'bg-blue-50 border-blue-100 text-blue-800'
                        }`}>
                        {notification.type === 'error' && <AlertCircle size={24} className="text-red-500" />}
                        {notification.type === 'success' && <CheckCircle size={24} className="text-green-500" />}
                        {notification.type === 'info' && <Info size={24} className="text-blue-500" />}

                        <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider">{notification.type}</h4>
                            <p className="text-sm font-medium">{notification.message}</p>
                        </div>

                        <button
                            onClick={() => setNotification(null)}
                            className="p-1 hover:bg-black/5 rounded-full transition-colors ml-2"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* 3. Global Modal (Center) */}
            {modal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[130] flex items-center justify-center p-4 pointer-events-auto animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800">{modal.title || 'Notification'}</h3>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 text-slate-600">
                            {modal.content}
                        </div>

                        {/* Actions */}
                        {(modal.onConfirm || modal.showCancel !== false) && (
                            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3">
                                {modal.showCancel !== false && (
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                                {modal.onConfirm && (
                                    <button
                                        onClick={() => { modal.onConfirm(); closeModal(); }}
                                        className="px-4 py-2 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200 transition-colors"
                                    >
                                        Confirm
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default GlobalOverlay;
